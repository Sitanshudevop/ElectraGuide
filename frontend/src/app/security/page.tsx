'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function SecurityLab() {
  const { isSimpleMode } = useLanguage();
  
  // Timer State
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // Terminal State
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isRunningHandshake, setIsRunningHandshake] = useState(false);

  // Model State
  const [isLockedOut, setIsLockedOut] = useState(false);

  // --- Handshake Terminal Simulation ---
  const runHandshake = () => {
    if (isRunningHandshake || isLockedOut) return;
    setIsRunningHandshake(true);
    setTerminalLines([]);

    const baseLines = [
      "BU_IDENTIFIER_VERIFIED...",
      "CU_PKI_HANDSHAKE_ESTABLISHED...",
      "VVPAT_SIGNATURE_VALID...",
      "STATUS: SECURE_POLLING_MODE_ENGAGED"
    ];

    const simpleLines = [
      "VOTING_MACHINE_CHECKED...",
      "MAIN_UNIT_SECURE_KEY_CHECKED...",
      "PRINTER_SIGNATURE_VALID...",
      "STATUS: SAFE_VOTING_READY"
    ];

    const linesToRun = isSimpleMode ? simpleLines : baseLines;

    linesToRun.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, `> ${line}`]);
        if (index === linesToRun.length - 1) {
          setIsRunningHandshake(false);
        }
      }, (index + 1) * 600);
    });
  };

  // --- 7-Second Rule Timer ---
  const startTimer = () => {
    if (countdown !== null || isLockedOut) return;
    setCountdown(7);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) return; // Stays at 0 until reset
    
    const timerId = setInterval(() => {
      setCountdown(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown]);

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/" className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1">
        ← Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">🔒</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Election <span className="text-rose-600">Security Lab</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        {isSimpleMode 
          ? "Explore the strong safety features built into the voting machines and printers."
          : "Explore the robust technical safeguards embedded within the M3-EVM and VVPAT 2026 protocols."
        }
      </p>

      {/* Factory Lockout Global Overlay (Only active if tampered) */}
      {isLockedOut && (
        <div className="bg-red-600 text-white p-6 rounded-xl mb-8 shadow-2xl animate-pulse border-4 border-red-900">
          <h2 className="text-3xl font-bold mb-2">🚨 {isSimpleMode ? "Emergency Lockout" : "FACTORY MODE LOCK"} 🚨</h2>
          <p className="text-lg font-medium">
            {isSimpleMode 
              ? "An unknown device was plugged in! The system has completely shut down to protect the votes."
              : "Unverified hardware detected in the chain. System has immediately reverted to Factory Mode to prevent tampering."
            }
          </p>
          <button 
            onClick={() => setIsLockedOut(false)}
            className="mt-4 bg-white text-red-600 font-bold py-2 px-6 rounded-md hover:bg-slate-100"
          >
            Reset Simulation
          </button>
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${isLockedOut ? 'opacity-50 pointer-events-none transition-opacity' : ''}`}>
        
        {/* Interactive Model section */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-t-4 border-rose-500 md:col-span-2">
           <div className="flex justify-between items-center mb-6 border-b pb-4 border-slate-200 dark:border-slate-700">
             <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
               <span aria-hidden="true">🔗</span> {isSimpleMode ? "Voting Machine Chain" : "Interactive M3-EVM Model"}
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
                {isSimpleMode ? "Voting Button" : "Ballot Unit (BU)"}
              </div>
              <div className="hidden md:block text-slate-400 font-bold text-2xl">↔</div>
              <div className="bg-slate-100 dark:bg-slate-900 border-2 border-civic-saffron p-4 rounded-lg text-center w-40 font-bold shadow-inner relative">
                {isSimpleMode ? "Main Unit" : "Control Unit (CU)"}
                <div className="absolute -top-3 -right-3 bg-green-500 w-6 h-6 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden md:block text-slate-400 font-bold text-2xl">↔</div>
              <div className="bg-slate-100 dark:bg-slate-900 border-2 border-purple-500 p-4 rounded-lg text-center w-40 font-bold shadow-inner">
                {isSimpleMode ? "Printer" : "VVPAT"}
              </div>
           </div>
        </section>

        {/* Handshake Terminal */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-t-4 border-rose-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span aria-hidden="true">🤝</span> {isSimpleMode ? "Secure Connection Check" : "The Crypto-Handshake"}
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
              : "Before any vote is registered, units perform a digital cryptographic handshake using 2048-bit PKI. If an external component is plugged in, the EVM locks."
            }
          </p>
          <div className="bg-slate-900 text-green-400 p-4 rounded-md font-mono text-sm h-40 overflow-y-auto border border-slate-700">
            {terminalLines.length === 0 && !isRunningHandshake && (
              <span className="text-slate-500">Waiting to initialize...</span>
            )}
            {terminalLines.map((line, idx) => (
              <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">{line}</div>
            ))}
            {isRunningHandshake && <div className="animate-pulse mt-1">_</div>}
          </div>
        </section>

        {/* 7 Second Rule */}
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
              {countdown === 0 ? "Restart" : "Simulate Print"}
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm">
            {isSimpleMode
               ? "The printer shows your paper slip behind a glass window for exactly 7 seconds before it drops safely into a sealed box."
               : "Upon pressing the blue button, the VVPAT prints a slip displaying the candidate's details. This slip is illuminated for exactly 7 seconds."
            }
          </p>
          
          <div className={`h-32 flex items-center justify-center rounded-xl border-4 transition-all relative overflow-hidden ${
             countdown === null ? 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700' :
             countdown > 0 ? 'bg-slate-900 border-green-500' :
             'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700'
          }`}>
             {countdown !== null && countdown > 0 && (
                <div className="absolute inset-0 bg-green-500/20 animate-pulse"></div>
             )}
             
             {countdown === null ? (
                <p className="text-slate-500 font-bold">Waiting for input...</p>
             ) : countdown > 0 ? (
                <div className="text-center z-10">
                   <p className="text-3xl font-mono font-bold text-green-400">00:0{countdown}</p>
                   <p className="text-xs text-green-300 uppercase mt-1 tracking-widest">Slip Visible</p>
                </div>
             ) : (
                <div className="text-center">
                   <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">Slip Dropped</p>
                   <p className="text-sm text-slate-500 mt-1 flex items-center gap-1 justify-center"><span aria-hidden="true">✅</span> Verified</p>
                </div>
             )}
          </div>
        </section>

      </div>
    </main>
  );
}
