'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a visual representation of the fairness scorecard.
 *
 * @param {Object} props - The component props.
 * @param {boolean} [props.inline=false] - Whether to render the scorecard in inline mode.
 * @returns {JSX.Element} The rendered FairnessScorecard component.
 */
export default function FairnessScorecard({
  inline = false,
}: {
  inline?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={inline ? 'relative' : 'fixed top-4 right-4 z-50'}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="fairness-scorecard-details"
        aria-label="Toggle Fairness Scorecard"
        className="bg-white dark:bg-slate-800 text-civic-blue font-bold px-4 py-2 rounded-full shadow-sm border-2 border-civic-saffron hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-civic-saffron focus:ring-offset-2 transition-transform hover:scale-105 flex items-center gap-2"
      >
        <span aria-hidden="true">⚖️</span>
        <span className="hidden sm:inline">Fairness: 100</span>
      </button>

      {isOpen && (
        <div
          id="fairness-scorecard-details"
          role="region"
          aria-label="Fairness Metrics Details"
          className="absolute top-14 right-0 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-5 mt-2 transition-opacity duration-300 z-50"
        >
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b pb-2">
            Fairness Scorecard
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">
                Neutrality Score
              </span>
              <span className="font-mono font-bold text-green-600">100</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">
                Evidence Coverage
              </span>
              <span className="font-mono font-bold text-green-600">100%</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">
                Loaded Language
              </span>
              <span className="font-mono font-bold text-green-600">0</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-300">
                Source Diversity
              </span>
              <span className="font-mono font-bold text-green-600">100</span>
            </li>
          </ul>
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 text-center">
            Status:{' '}
            <span className="font-bold text-civic-blue">
              PASS (System Default)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

FairnessScorecard.propTypes = {
  inline: PropTypes.bool,
};
