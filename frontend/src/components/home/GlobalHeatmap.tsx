'use client';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import { traceAsync } from '@/services/perfService';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem',
};

const center = { lat: 20, lng: 0 };

interface ElectionEvent {
  id: string;
  name: string;
  region: string;
  date: string;
  status: string;
  lat: number;
  lng: number;
  admin: boolean;
}

// Fallback data used when Firestore is unavailable
const FALLBACK_ELECTIONS: ElectionEvent[] = [
  {
    id: 'us',
    name: 'May Primaries (IN, OH)',
    region: 'US Primaries',
    date: '2026-05-05',
    status: 'Registration deadline April 27.',
    lat: 39.7684,
    lng: -86.1581,
    admin: true,
  },
  {
    id: 'uk',
    name: 'Local Council Elections: May 7',
    region: 'UK Local',
    date: '2026-05-07',
    status: 'Active campaigning.',
    lat: 51.5074,
    lng: -0.1278,
    admin: true,
  },
  {
    id: 'india',
    name: 'Phase II Polling: April 29',
    region: 'West Bengal',
    date: '2026-04-29',
    status: '4 days remaining.',
    lat: 22.9868,
    lng: 87.855,
    admin: true,
  },
];

const REGION_COLORS: Record<string, string> = {
  'West Bengal': 'bg-civic-saffron',
  'US Primaries': 'bg-blue-500',
  'UK Local': 'bg-red-500',
};

/**
 * Renders the global election heatmap with Firestore-powered dynamic markers.
 * Falls back to static data when Firestore is unavailable.
 *
 * @returns {JSX.Element}
 */
export default function GlobalHeatmap() {
  const { isSimpleMode } = useLanguage();
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [elections, setElections] =
    useState<ElectionEvent[]>(FALLBACK_ELECTIONS);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  // Listen to Firestore "elections" collection in realtime
  const snapshotTracedRef = useRef(false);
  useEffect(() => {
    if (!db) return;
    const unsubscribe = onSnapshot(
      collection(db, 'elections'),
      (snapshot) => {
        if (snapshot.empty) return;
        const events: ElectionEvent[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          events.push({
            id: doc.id,
            name: data.name || '',
            region: data.region || '',
            date: data.date || '',
            status: data.status || '',
            lat: data.lat || 0,
            lng: data.lng || 0,
            admin: data.admin ?? true,
          });
        });
        setElections(events);

        // Trace only the first snapshot delivery
        if (!snapshotTracedRef.current) {
          snapshotTracedRef.current = true;
          // Fire a no-op traced async to record the timing
          void traceAsync('firestore_elections_load', () =>
            Promise.resolve()
          ).catch(() => {});
          // Manually record timing since the operation is sync-callback based
          void traceAsync('heatmap_render', async () => {
            // Wait one frame for React to render the markers
            await new Promise((r) => requestAnimationFrame(r));
          });
        }
      },
      (error) => {
        console.error('Elections snapshot error:', error);
      }
    );
    return () => unsubscribe();
  }, []);

  // Derive unique regions for legend
  const regions = [...new Set(elections.map((e) => e.region))];

  return (
    <div className="w-full mb-12 bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-slate-700">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 z-10 relative">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span aria-hidden="true">🗺️</span>{' '}
          {isSimpleMode
            ? 'Active Elections Map'
            : '2026 Global Election Heatmap'}
        </h2>
        <div className="flex gap-4 mt-4 md:mt-0 flex-wrap">
          {regions.map((region) => (
            <div key={region} className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full animate-pulse ${REGION_COLORS[region] || 'bg-emerald-500'}`}
              ></span>
              <span className="text-slate-300 text-sm">{region}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full h-64 md:h-[400px] bg-slate-800 rounded-2xl overflow-hidden shadow-inner border border-slate-700">
        {!isLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold animate-pulse">
            Loading Map Data...
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={2}
            options={{
              styles: [
                { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                {
                  elementType: 'labels.text.stroke',
                  stylers: [{ color: '#242f3e' }],
                },
                {
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#746855' }],
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{ color: '#17263c' }],
                },
              ],
              disableDefaultUI: true,
            }}
          >
            {elections.map((election) => (
              <Marker
                key={election.id}
                position={{ lat: election.lat, lng: election.lng }}
                onClick={() => setActiveMarker(election.id)}
              >
                {activeMarker === election.id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className="text-slate-900 p-1 w-52">
                      <p className="text-indigo-600 mb-1 border-b pb-1 font-extrabold uppercase tracking-wide text-xs">
                        {election.name}
                      </p>
                      <p className="text-slate-500 text-xs mb-1">
                        {election.region} · {election.date}
                      </p>
                      <p className="text-slate-700 text-xs font-semibold">
                        Status: {election.status}
                      </p>
                    </div>
                  </InfoWindow>
                ) : null}
              </Marker>
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
