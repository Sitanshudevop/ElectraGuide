'use client';
import FairnessScorecard from './FairnessScorecard';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useRemoteConfig } from '@/context/RemoteConfigContext';

/**
 * The top navigation bar for the ElectraGuide application.
 * Manages branding, simple mode toggling, and user authentication state.
 *
 * @returns {JSX.Element} The rendered TopNav component.
 */
export default function TopNav() {
  const { isSimpleMode, toggleMode, currentLanguage, changeLanguage } =
    useLanguage();
  const { user, loginWithGoogle, logout } = useAuth();
  const { enableTranslate } = useRemoteConfig();

  return (
    <header
      className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40"
      role="banner"
    >
      <Link
        href="/"
        className="font-bold text-xl text-civic-blue dark:text-white flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1"
      >
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
          <span className="hidden sm:inline">
            {isSimpleMode ? 'Simple Mode: ON' : 'Simple Mode: OFF'}
          </span>
          <span className="sm:hidden">
            {isSimpleMode ? 'Simple' : 'Normal'}
          </span>
        </button>

        {/* Language Selector — conditionally shown via Remote Config */}
        {enableTranslate && (
          <select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-civic-blue transition-colors shadow-sm cursor-pointer"
            aria-label="Select Language"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="bn">বাংলা (Bengali)</option>
          </select>
        )}

        {/* Fairness Scorecard */}
        <FairnessScorecard inline={true} />

        {/* Auth Section */}
        <div className="ml-2 flex items-center gap-3 border-l border-slate-300 dark:border-slate-700 pl-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.photoURL && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User profile'}
                  className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700"
                />
              )}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">
                {user.displayName}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 px-3 py-1.5 rounded-md font-medium text-sm transition-colors shadow-sm"
            >
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
