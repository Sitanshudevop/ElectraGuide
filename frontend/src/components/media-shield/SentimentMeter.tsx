'use client';
import PropTypes from 'prop-types';
import type { SentimentResult } from '@/services/nlpService';

interface SentimentMeterProps {
  sentiment: SentimentResult;
}

/**
 * Renders a visual sentiment meter gauge showing positive/negative/neutral/mixed.
 *
 * @param {SentimentMeterProps} props
 * @returns {JSX.Element}
 */
export default function SentimentMeter({ sentiment }: SentimentMeterProps) {
  // Map score (-1 to 1) to percentage (0 to 100)
  const percentage = Math.round((sentiment.score + 1) * 50);

  const colorMap = {
    positive: {
      bg: 'bg-green-500',
      text: 'text-green-700 dark:text-green-400',
      label: '😊 Positive',
    },
    negative: {
      bg: 'bg-red-500',
      text: 'text-red-700 dark:text-red-400',
      label: '😠 Negative',
    },
    neutral: {
      bg: 'bg-slate-400',
      text: 'text-slate-700 dark:text-slate-300',
      label: '😐 Neutral',
    },
    mixed: {
      bg: 'bg-amber-500',
      text: 'text-amber-700 dark:text-amber-400',
      label: '🤔 Mixed',
    },
  };

  const style = colorMap[sentiment.label];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">
          Sentiment Analysis
        </h3>
        <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">
          NL API
        </span>
      </div>

      {/* Label */}
      <p className={`text-2xl font-bold mb-4 ${style.text}`}>{style.label}</p>

      {/* Gauge bar */}
      <div className="relative h-3 bg-gradient-to-r from-red-500 via-slate-300 to-green-500 rounded-full overflow-hidden mb-3">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow-lg transition-all duration-700"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>

      {/* Score details */}
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase">Score</p>
          <p className="text-lg font-mono font-bold text-slate-800 dark:text-white">
            {sentiment.score.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase">Magnitude</p>
          <p className="text-lg font-mono font-bold text-slate-800 dark:text-white">
            {sentiment.magnitude.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

SentimentMeter.propTypes = {
  sentiment: PropTypes.shape({
    score: PropTypes.number.isRequired,
    magnitude: PropTypes.number.isRequired,
    label: PropTypes.oneOf(['positive', 'negative', 'neutral', 'mixed'])
      .isRequired,
  }).isRequired,
};
