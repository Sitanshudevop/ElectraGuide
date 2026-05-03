'use client';

import React, { useEffect, useState } from 'react';
import { getTimings, subscribeTimings, TimingEntry } from '@/services/perfService';

export default function AppHealthFooter() {
  const [timings, setTimings] = useState<TimingEntry[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Initial fetch (deferred to avoid synchronous state update in effect)
    Promise.resolve().then(() => setTimings(getTimings()));

    // Subscribe to updates
    const unsubscribe = subscribeTimings(() => {
      setTimings(getTimings());
    });

    return () => unsubscribe();
  }, []);

  if (timings.length === 0) return null;

  // Calculate average latency
  const avgLatency =
    timings.reduce((sum, t) => sum + t.durationMs, 0) / timings.length;

  let healthColor = 'bg-green-500';
  let healthText = 'Healthy';

  if (avgLatency > 1500) {
    healthColor = 'bg-red-500';
    healthText = 'Degraded';
  } else if (avgLatency > 500) {
    healthColor = 'bg-yellow-500';
    healthText = 'Slow';
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 text-white text-xs border-t border-slate-700 z-50">
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${healthColor}`}></div>
          <span className="font-medium">App Health: {healthText}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Avg: {Math.round(avgLatency)}ms</span>
          <span>Last: {timings[timings.length - 1].durationMs}ms</span>
          <span className="text-[10px]">{expanded ? '▼' : '▲'}</span>
        </div>
      </div>

      {expanded && (
        <div className="bg-slate-800 p-4 max-h-48 overflow-y-auto border-t border-slate-700">
          <h4 className="font-semibold mb-2 text-slate-300">Recent Traces</h4>
          <ul className="space-y-1">
            {timings.slice().reverse().map((t, idx) => (
              <li key={idx} className="flex justify-between font-mono text-slate-400">
                <span>{t.name}</span>
                <span className={t.durationMs > 1500 ? 'text-red-400' : t.durationMs > 500 ? 'text-yellow-400' : 'text-green-400'}>
                  {t.durationMs}ms
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
