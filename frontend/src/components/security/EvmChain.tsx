'use client';
import PropTypes from 'prop-types';
import React from 'react';

interface EvmChainProps {
  isSimpleMode: boolean;
  setIsLockedOut: (val: boolean) => void;
}

export default function EvmChain({
  isSimpleMode,
  setIsLockedOut,
}: EvmChainProps) {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-t-4 border-rose-500 md:col-span-2">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span aria-hidden="true">🔗</span>{' '}
          {isSimpleMode ? 'Voting Machine Chain' : 'Interactive M3-EVM Model'}
        </h2>
        <button
          onClick={() => setIsLockedOut(true)}
          className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 font-bold py-2 px-4 rounded-md hover:bg-red-200 dark:hover:bg-red-900 transition-colors border border-red-300 dark:border-red-700 text-sm"
        >
          🔌 Plug in Unverified USB
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <div className="bg-slate-100 dark:bg-slate-900 border-2 border-civic-blue p-4 rounded-lg text-center w-40 font-bold shadow-inner">
          {isSimpleMode ? 'Voting Button' : 'Ballot Unit (BU)'}
        </div>
        <div className="hidden md:block text-slate-400 font-bold text-2xl">
          ↔
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 border-2 border-civic-saffron p-4 rounded-lg text-center w-40 font-bold shadow-inner relative">
          {isSimpleMode ? 'Main Unit' : 'Control Unit (CU)'}
          <div className="absolute -top-3 -right-3 bg-green-500 w-6 h-6 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="hidden md:block text-slate-400 font-bold text-2xl">
          ↔
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 border-2 border-purple-500 p-4 rounded-lg text-center w-40 font-bold shadow-inner">
          {isSimpleMode ? 'Printer' : 'VVPAT'}
        </div>
      </div>
    </section>
  );
}

EvmChain.propTypes = {
  isSimpleMode: PropTypes.bool.isRequired,
  setIsLockedOut: PropTypes.func.isRequired,
};
