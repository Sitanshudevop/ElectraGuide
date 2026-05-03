/**
 * Service for managing user preferences in Firestore.
 * Stores and retrieves per-user settings at users/{uid}/preferences.
 */
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export interface UserPreferences {
  preferredLanguage: string;
  trackedElections: string[]; // Array of election IDs
  region: string; // User's region from Google account
  lastLogin: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  preferredLanguage: 'en',
  trackedElections: [],
  region: '',
  lastLogin: new Date().toISOString(),
};

/**
 * Fetches user preferences from Firestore.
 *
 * @param {string} uid - The user's Firebase UID.
 * @returns {Promise<UserPreferences | null>} The preferences or null if not found.
 */
export async function getUserPreferences(
  uid: string
): Promise<UserPreferences | null> {
  if (!db) return null;
  try {
    const docRef = doc(db, 'users', uid, 'preferences', 'settings');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as UserPreferences;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return null;
  }
}

/**
 * Creates or overwrites user preferences in Firestore.
 *
 * @param {string} uid - The user's Firebase UID.
 * @param {UserPreferences} prefs - The preferences to save.
 * @returns {Promise<void>}
 */
export async function saveUserPreferences(
  uid: string,
  prefs: UserPreferences
): Promise<void> {
  if (!db) return;
  try {
    const docRef = doc(db, 'users', uid, 'preferences', 'settings');
    await setDoc(docRef, prefs, { merge: true });
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
}

/**
 * Updates specific fields in user preferences.
 *
 * @param {string} uid - The user's Firebase UID.
 * @param {Partial<UserPreferences>} updates - Fields to update.
 * @returns {Promise<void>}
 */
export async function updateUserPreferences(
  uid: string,
  updates: Partial<UserPreferences>
): Promise<void> {
  if (!db) return;
  try {
    const docRef = doc(db, 'users', uid, 'preferences', 'settings');
    await updateDoc(docRef, updates);
  } catch {
    // If doc doesn't exist yet, create it
    await saveUserPreferences(uid, { ...DEFAULT_PREFERENCES, ...updates });
  }
}

/**
 * Toggles an election ID in the user's tracked elections list.
 *
 * @param {string} uid - The user's Firebase UID.
 * @param {string} electionId - The election ID to toggle.
 * @returns {Promise<boolean>} True if now tracking, false if untracked.
 */
export async function toggleTrackedElection(
  uid: string,
  electionId: string
): Promise<boolean> {
  const prefs = await getUserPreferences(uid);
  const current = prefs?.trackedElections || [];
  const isTracking = current.includes(electionId);

  const updated = isTracking
    ? current.filter((id) => id !== electionId)
    : [...current, electionId];

  await updateUserPreferences(uid, { trackedElections: updated });
  return !isTracking;
}

export { DEFAULT_PREFERENCES };
