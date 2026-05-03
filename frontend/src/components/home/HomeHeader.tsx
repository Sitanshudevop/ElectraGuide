'use client';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Renders the hero header section of the home dashboard.
 * Displays a welcome heading and a brief description that adapts to Simple Mode.
 *
 * @returns {JSX.Element} The rendered HomeHeader component.
 */
export default function HomeHeader() {
  const { isSimpleMode } = useLanguage();
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-extrabold text-civic-blue dark:text-white mb-6 tracking-tight">
        Welcome to <span className="text-civic-saffron">ElectaGuide</span>
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
        {isSimpleMode
          ? 'Your easy-to-use guide to understanding elections. Pick a topic below to start.'
          : 'Your unbiased, interactive companion for navigating the democratic process. Select an option below to begin your journey.'}
      </p>
    </div>
  );
}
