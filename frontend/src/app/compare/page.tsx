'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Compare() {
  const { isSimpleMode } = useLanguage();

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/" className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1">
        ← Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">🌍</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Global <span className="text-teal-600">Comparison</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        {isSimpleMode 
          ? "See how India's voter list rules compare with the rules in the USA and the UK."
          : "Objectively compare India's Summary Revision (SIR) against the USA's National Voter Registration Act (NVRA) and the UK's Individual Electoral Registration (IER)."}
      </p>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-left bg-white dark:bg-slate-800 border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
              <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold w-1/4">Process / Country</th>
              <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold border-l w-1/4">
                <span aria-hidden="true">🇮🇳</span> India (SIR)
              </th>
              <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold border-l w-1/4">
                <span aria-hidden="true">🇺🇸</span> USA (NVRA)
              </th>
              <th className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold border-l w-1/4">
                <span aria-hidden="true">🇬🇧</span> UK (IER)
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-400">
            <tr>
              <td className="p-4 border-b border-slate-200 dark:border-slate-700 font-semibold bg-slate-50 dark:bg-slate-900/50">
                {isSimpleMode ? "How they clean the voter list" : "Roll Maintenance Mechanism"}
              </td>
              <td className="p-4 border-b border-slate-200 dark:border-slate-700 border-l">
                {isSimpleMode 
                  ? "Officials visit homes and verify voters door-to-door before elections."
                  : "Special Intensive Revision (SIR) with door-to-door Booth Level Officer (BLO) verification."}
              </td>
              <td className="p-4 border-b border-slate-200 dark:border-slate-700 border-l">
                {isSimpleMode 
                  ? "They send mail to check if you still live there. You get removed if you miss two big elections."
                  : "National Change of Address (NCOA) mailings; deletion after failing to vote in two consecutive federal elections."}
              </td>
              <td className="p-4 border-b border-slate-200 dark:border-slate-700 border-l">
                {isSimpleMode 
                  ? "They check their local databases. You have to register individually online."
                  : "Annual canvass cross-referencing DWP databases. Individual Electoral Registration requires personal action."}
              </td>
            </tr>
            <tr>
              <td className="p-4 font-semibold bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                {isSimpleMode ? "Who proves identity?" : "Burden of Proof"}
              </td>
              <td className="p-4 border-l border-b border-slate-200 dark:border-slate-700">
                {isSimpleMode 
                  ? "The election office is mostly responsible for checking your status."
                  : "Primarily on the Election Commission via BLOs, though Form 6/8 shifts burden to citizen if omitted."}
              </td>
              <td className="p-4 border-l border-b border-slate-200 dark:border-slate-700">
                {isSimpleMode 
                  ? "You register when you get a driver's license (in many states)."
                  : "Heavy reliance on citizen initiation (Motor Voter), though automatic registration exists in 24 states."}
              </td>
              <td className="p-4 border-l border-b border-slate-200 dark:border-slate-700">
                {isSimpleMode 
                  ? "You have to register yourself using your National Insurance number."
                  : "Strictly on the individual to provide National Insurance number and date of birth."}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
