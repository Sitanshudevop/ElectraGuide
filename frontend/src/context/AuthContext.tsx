'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import PropTypes from 'prop-types';
import {
  User,
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import {
  getUserPreferences,
  saveUserPreferences,
  DEFAULT_PREFERENCES,
  type UserPreferences,
} from '@/services/userPreferencesService';
import { traceAsync } from '@/services/perfService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  preferences: UserPreferences | null;
  loginWithGoogle: () => Promise<void>;
  loginWithOneTap: () => void;
  logout: () => Promise<void>;
  refreshPreferences: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  preferences: null,
  loginWithGoogle: async () => {},
  loginWithOneTap: () => {},
  logout: async () => {},
  refreshPreferences: async () => {},
});

/**
 * Fetches the user's locale/language from the Google People API.
 *
 * @param {string} accessToken - OAuth access token.
 * @returns {Promise<{language: string; region: string}>}
 */
async function fetchGoogleProfile(
  accessToken: string
): Promise<{ language: string; region: string }> {
  try {
    const res = await fetch(
      'https://people.googleapis.com/v1/people/me?personFields=locales,addresses',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!res.ok) throw new Error('People API request failed');
    const data = await res.json();

    // Extract preferred language
    const locales = data.locales || [];
    const primaryLocale = locales.find(
      (l: { metadata?: { primary?: boolean } }) => l.metadata?.primary
    );
    const langCode = primaryLocale?.value?.split('-')[0] || 'en';

    // Map to supported languages
    const SUPPORTED = ['en', 'hi', 'ta', 'te', 'bn'];
    const language = SUPPORTED.includes(langCode) ? langCode : 'en';

    // Extract region from addresses
    const addresses = data.addresses || [];
    const primaryAddr = addresses.find(
      (a: { metadata?: { primary?: boolean } }) => a.metadata?.primary
    );
    const region = primaryAddr?.country || primaryAddr?.region || '';

    return { language, region };
  } catch {
    return { language: 'en', region: '' };
  }
}

/**
 * Provides Firebase authentication state, Google One Tap sign-in,
 * People API profile enrichment, and Firestore user preferences.
 *
 * @param {Object} props
 * @param {ReactNode} props.children
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!auth);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);

  /**
   * Loads user preferences from Firestore.
   */
  const loadPreferences = useCallback(async (uid: string) => {
    const prefs = await traceAsync('firestore_load_preferences', () =>
      getUserPreferences(uid)
    );
    if (prefs) {
      setPreferences(prefs);
    }
    return prefs;
  }, []);

  /**
   * Handles post-sign-in: fetches People API data, saves/loads preferences.
   */
  const handlePostSignIn = useCallback(
    async (firebaseUser: User, accessToken?: string) => {
      // Load existing preferences
      const prefs = await loadPreferences(firebaseUser.uid);

      // If first login or we have an access token, enrich from People API
      if (accessToken) {
        try {
          const profile = await traceAsync('people_api_fetch', () =>
            fetchGoogleProfile(accessToken)
          );

          const updatedPrefs: UserPreferences = {
            preferredLanguage:
              prefs?.preferredLanguage || profile.language || 'en',
            trackedElections: prefs?.trackedElections || [],
            region: profile.region || prefs?.region || '',
            lastLogin: new Date().toISOString(),
          };

          await saveUserPreferences(firebaseUser.uid, updatedPrefs);
          setPreferences(updatedPrefs);
        } catch {
          // Non-blocking — fall through to defaults
          if (!prefs) {
            const defaults = {
              ...DEFAULT_PREFERENCES,
              lastLogin: new Date().toISOString(),
            };
            await saveUserPreferences(firebaseUser.uid, defaults);
            setPreferences(defaults);
          }
        }
      } else if (!prefs) {
        // No access token and no existing prefs — save defaults
        const defaults = {
          ...DEFAULT_PREFERENCES,
          lastLogin: new Date().toISOString(),
        };
        await saveUserPreferences(firebaseUser.uid, defaults);
        setPreferences(defaults);
      }
    },
    [loadPreferences]
  );

  // Listen for auth state changes
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        void loadPreferences(currentUser.uid);
      } else {
        setPreferences(null);
      }
    });
    return () => unsubscribe();
  }, [loadPreferences]);

  // Initialize Google One Tap
  useEffect(() => {
    if (!auth || typeof window === 'undefined') return;

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const gis = (window as unknown as { google?: GoogleGIS }).google;

      if (!gis || !auth) return;

      // Prevent multiple initializations in React Strict Mode
      if ((window as any)._gsiInitialized) return;
      (window as any)._gsiInitialized = true;

      gis.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: { credential: string }) => {
          try {
            const credential = GoogleAuthProvider.credential(
              response.credential
            );
            const result = await signInWithCredential(auth!, credential);
            await handlePostSignIn(result.user);
          } catch (error) {
            console.error('One Tap sign-in error:', error);
          }
        },
        auto_select: true,
        cancel_on_tap_outside: false,
      });

      // Only prompt if not already signed in
      if (!auth.currentUser) {
        gis.accounts.id.prompt();
      }
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [handlePostSignIn]);

  /**
   * Manual One Tap trigger (e.g., from a button).
   */
  const loginWithOneTap = useCallback(() => {
    const gis = (window as unknown as { google?: GoogleGIS }).google;
    if (gis) {
      gis.accounts.id.prompt();
    }
  }, []);

  /**
   * Initiates the Google Sign-In popup flow with People API scope.
   */
  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) return;
    try {
      // Request People API scope for locale/address data
      googleProvider.addScope(
        'https://www.googleapis.com/auth/userinfo.profile'
      );
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken || '';
      await handlePostSignIn(result.user, accessToken);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  /**
   * Signs out the current authenticated user.
   */
  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setPreferences(null);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  /**
   * Refreshes preferences from Firestore.
   */
  const refreshPreferences = async () => {
    if (user) {
      await loadPreferences(user.uid);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        preferences,
        loginWithGoogle,
        loginWithOneTap,
        logout,
        refreshPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 *
 * @returns {AuthContextType} The current authentication context values.
 */
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
