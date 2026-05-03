'use client';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

interface CryptoHandshakeProps {
  isSimpleMode: boolean;
  isLockedOut: boolean;
}

export default function CryptoHandshake({
  isSimpleMode,
  isLockedOut,
}: CryptoHandshakeProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isRunningHandshake, setIsRunningHandshake] = useState(false);

  const runHandshake = () => {
    if (isRunningHandshake || isLockedOut) return;
    setIsRunningHandshake(true);
    setTerminalLines([]);

    const baseLines = [
      'BU_IDENTIFIER_VERIFIED...',
      'CU_PKI_HANDSHAKE_ESTABLISHED...',
      'VVPAT_SIGNATURE_VALID...',
      'STATUS: SECURE_POLLING_MODE_ENGAGED',
    ];

    const simpleLines = [
      'VOTING_MACHINE_CHECKED...',
      'MAIN_UNIT_SECURE_KEY_CHECKED...',
      'PRINTER_SIGNATURE_VALID...',
      'STATUS: SAFE_VOTING_READY',
    ];

    const linesToRun = isSimpleMode ? simpleLines : baseLines;

    linesToRun.forEach((line, index) => {
      setTimeout(
        () => {
          setTerminalLines((prev) => [...prev, `> ${line}`]);
          if (index === linesToRun.length - 1) {
            setIsRunningHandshake(false);
          }
        },
        (index + 1) * 600
      );
    });
  };

  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-t-4 border-rose-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span aria-hidden="true">🤝</span>{' '}
          {isSimpleMode ? 'Secure Connection Check' : 'The Crypto-Handshake'}
        </h2>
        <button
          onClick={runHandshake}
          disabled={isRunningHandshake}
          className="bg-civic-blue text-white font-bold py-1 px-3 rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          Run Protocol
        </button>
      </div>
      <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
        {isSimpleMode
          ? "Before you can vote, all three parts of the machine do a secure digital check to make sure they haven't been tampered with."
          : 'Before any vote is registered, units perform a digital cryptographic handshake using 2048-bit PKI. If an external component is plugged in, the EVM locks.'}
      </p>
      <div className="bg-slate-900 text-green-400 p-4 rounded-md font-mono text-sm h-40 overflow-y-auto border border-slate-700">
        {terminalLines.length === 0 && !isRunningHandshake && (
          <span className="text-slate-500">Waiting to initialize...</span>
        )}
        {terminalLines.map((line, idx) => (
          <div
            key={idx}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {line}
          </div>
        ))}
        {isRunningHandshake && <div className="animate-pulse mt-1">_</div>}
      </div>
    </section>
  );
}

CryptoHandshake.propTypes = {
  isSimpleMode: PropTypes.bool.isRequired,
  isLockedOut: PropTypes.bool.isRequired,
};
