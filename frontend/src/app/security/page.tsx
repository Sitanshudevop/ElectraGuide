'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

import EvmChain from '@/components/security/EvmChain';
import CryptoHandshake from '@/components/security/CryptoHandshake';
import VvpatTimer from '@/components/security/VvpatTimer';

/**
 * The Security Lab page.
 * Interactive playground simulating EVM and VVPAT security protocols.
 *
 * @returns {JSX.Element} The rendered Security component.
 */
export default function Security() {
  const { isSimpleMode } = useLanguage();

  // Model State
  const [isLockedOut, setIsLockedOut] = useState(false);

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1"
      >
        ← Back to Dashboard
      </Link>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">
          🔒
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Election <span className="text-rose-600">Security Lab</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        {isSimpleMode
          ? 'Explore the strong safety features built into the voting machines and printers.'
          : 'Explore the robust technical safeguards embedded within the M3-EVM and VVPAT 2026 protocols.'}
      </p>

      {/* Factory Lockout Global Overlay (Only active if tampered) */}
      {isLockedOut && (
        <div className="bg-red-600 text-white p-6 rounded-xl mb-8 shadow-2xl animate-pulse border-4 border-red-900">
          <h2 className="text-3xl font-bold mb-2">
            🚨 {isSimpleMode ? 'Emergency Lockout' : 'FACTORY MODE LOCK'} 🚨
          </h2>
          <p className="text-lg font-medium">
            {isSimpleMode
              ? 'An unknown device was plugged in! The system has completely shut down to protect the votes.'
              : 'Unverified hardware detected in the chain. System has immediately reverted to Factory Mode to prevent tampering.'}
          </p>
          <button
            onClick={() => setIsLockedOut(false)}
            className="mt-4 bg-white text-red-600 font-bold py-2 px-6 rounded-md hover:bg-slate-100"
          >
            Reset Simulation
          </button>
        </div>
      )}

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isLockedOut ? 'opacity-50 pointer-events-none transition-opacity' : ''}`}
      >
        <EvmChain isSimpleMode={isSimpleMode} setIsLockedOut={setIsLockedOut} />
        <CryptoHandshake
          isSimpleMode={isSimpleMode}
          isLockedOut={isLockedOut}
        />
        <VvpatTimer isSimpleMode={isSimpleMode} isLockedOut={isLockedOut} />
      </div>
    </main>
  );
}
