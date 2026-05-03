import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';
import {
  getRemoteConfig,
  RemoteConfig,
  fetchAndActivate,
} from 'firebase/remote-config';
import { getPerformance, FirebasePerformance } from 'firebase/performance';

const firebaseConfig = {
  // Using Next.js process.env instead of Vite's import.meta.env for compatibility
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase securely (avoiding multiple initializations in SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services conditionally to prevent Next.js build errors during SSR
let db: Firestore | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let analytics: Promise<Analytics | null> | null = null;
let remoteConfig: RemoteConfig | null = null;
let perf: FirebasePerformance | null = null;

if (typeof window !== 'undefined') {
  try {
    db = getFirestore(app, 'electraguide');
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();

    analytics = isSupported().then((supported) => {
      if (supported) {
        return getAnalytics(app);
      }
      return null;
    });

    // Initialize Remote Config with defaults
    remoteConfig = getRemoteConfig(app);
    remoteConfig.settings.minimumFetchIntervalMillis = 300000;
    remoteConfig.defaultConfig = {
      enable_translate: true,
      show_community_poll: true,
    };

    fetchAndActivate(remoteConfig).catch((err) => {
      console.error('Remote Config fetch failed:', err);
    });

    // Initialize Firebase Performance Monitoring
    perf = getPerformance(app);
  } catch (e) {
    console.error('Firebase initialization error', e);
  }
}

export { app, analytics, db, auth, googleProvider, remoteConfig, perf };
