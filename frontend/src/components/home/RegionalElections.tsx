'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from '@/context/AuthContext';
import { traceAsync } from '@/services/perfService';

interface RegionalElection {
  id: string;
  name: string;
  region: string;
  date: string;
  status: string;
}

/**
 * Displays elections relevant to the signed-in user's region,
 * pulled from their Google account location data stored in Firestore preferences.
 *
 * Falls back to a generic message if no region data is available.
 *
 * @returns {JSX.Element | null}
 */
export default function RegionalElections() {
  const { user, preferences } = useAuth();
  const [elections, setElections] = useState<RegionalElection[]>([]);
  const [loading, setLoading] = useState(false);

  const userRegion = preferences?.region || '';

  useEffect(() => {
    if (!db || !user || !userRegion) return;

    const fetchRegional = async () => {
      setLoading(true);
      try {
        const results = await traceAsync(
          'firestore_regional_elections',
          async () => {
            const q = query(
              collection(db!, 'elections'),
              where('region', '==', userRegion)
            );
            const snap = await getDocs(q);
            const items: RegionalElection[] = [];
            snap.forEach((doc) => {
              const data = doc.data();
              items.push({
                id: doc.id,
                name: data.name || '',
                region: data.region || '',
                date: data.date || '',
                status: data.status || '',
              });
            });
            return items;
          }
        );
        setElections(results);
      } catch (error) {
        console.error('Error fetching regional elections:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchRegional();
  }, [user, userRegion]);

  // Don't render if no user or region
  if (!user || !userRegion) return null;

  return (
    <section className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl" aria-hidden="true">
            📍
          </span>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Elections in Your Region
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Based on your Google account location:{' '}
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {userRegion}
              </span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-slate-500 animate-pulse py-4">
            <span className="inline-block w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Finding elections in your region...</span>
          </div>
        ) : elections.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {elections.map((election) => (
              <div
                key={election.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">
                  {election.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>📅 {election.date}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold">
                    {election.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400 py-2">
            No upcoming elections found for{' '}
            <span className="font-bold">{userRegion}</span>. Check back closer
            to election season!
          </p>
        )}
      </div>
    </section>
  );
}
