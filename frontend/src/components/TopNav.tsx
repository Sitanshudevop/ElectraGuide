'use client';
import FairnessScorecard from './FairnessScorecard';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function TopNav() {
  const { isSimpleMode, toggleMode } = useLanguage();

  return (
    <header className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40" role="banner">
      <Link href="/" className="font-bold text-xl text-civic-blue dark:text-white flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1">
        <span aria-hidden="true">🗳️</span>
        <span className="hidden sm:inline">VoxAgent</span>
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Simplified Language Toggle using Global Context */}
        <button
          onClick={toggleMode}
          aria-pressed={isSimpleMode}
          aria-label="Toggle Simplified Language Mode"
          className={`px-4 py-2 rounded-full font-bold text-sm transition-colors focus:outline-none focus:ring-4 focus:ring-civic-saffron focus:ring-offset-2 border-2 ${
            isSimpleMode 
              ? 'bg-civic-saffron text-white border-civic-saffron hover:bg-orange-600' 
              : 'bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          {isSimpleMode ? 'Simple Mode: ON' : 'Simple Mode: OFF'}
        </button>
        
        {/* Fairness Scorecard */}
        <FairnessScorecard inline={true} />
      </div>
    </header>
  );
}
