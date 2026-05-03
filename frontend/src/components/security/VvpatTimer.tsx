'use client';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

interface VvpatTimerProps {
  isSimpleMode: boolean;
  isLockedOut: boolean;
}

export default function VvpatTimer({
  isSimpleMode,
  isLockedOut,
}: VvpatTimerProps) {
  const [countdown, setCountdown] = useState<number | null>(null);

  const startTimer = () => {
    if (countdown !== null || isLockedOut) return;
    setCountdown(7);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) return; // Stays at 0 until reset

    const timerId = setInterval(() => {
      setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown]);

  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-t-4 border-rose-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span aria-hidden="true">⏱️</span> The 7-Second Verify Rule
        </h2>
        <button
          onClick={startTimer}
          disabled={countdown !== null && countdown > 0}
          className="bg-civic-saffron text-white font-bold py-1 px-3 rounded hover:bg-orange-600 disabled:opacity-50 text-sm"
        >
          {countdown === 0 ? 'Restart' : 'Simulate Print'}
        </button>
      </div>
      <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
        {isSimpleMode
          ? 'The printer shows your paper slip behind a glass window for exactly 7 seconds before it drops safely into a sealed box.'
          : "Upon pressing the blue button, the VVPAT prints a slip displaying the candidate's details. This slip is illuminated for exactly 7 seconds."}
      </p>

      <div
        className={`h-32 flex items-center justify-center rounded-xl border-4 transition-all relative overflow-hidden ${
          countdown === null
            ? 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700'
            : countdown > 0
              ? 'bg-slate-900 border-green-500'
              : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700'
        }`}
      >
        {countdown !== null && countdown > 0 && (
          <div className="absolute inset-0 bg-green-500/20 animate-pulse"></div>
        )}

        {countdown === null ? (
          <p className="text-slate-500 font-bold">Waiting for input...</p>
        ) : countdown > 0 ? (
          <div className="text-center z-10">
            <p className="text-3xl font-mono font-bold text-green-400">
              00:0{countdown}
            </p>
            <p className="text-xs text-green-300 uppercase mt-1 tracking-widest">
              Slip Visible
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">
              Slip Dropped
            </p>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-1 justify-center">
              <span aria-hidden="true">✅</span> Verified
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

VvpatTimer.propTypes = {
  isSimpleMode: PropTypes.bool.isRequired,
  isLockedOut: PropTypes.bool.isRequired,
};
