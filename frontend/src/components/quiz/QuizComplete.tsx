'use client';
import PropTypes from 'prop-types';
import React from 'react';
import QuizPieChart from '@/components/charts/QuizPieChart';

interface QuizCompleteProps {
  score: number;
  total: number;
  isSaving: boolean;
  saveMessage: string;
  handleRetake: () => void;
}

/**
 * Renders the quiz completion view with score summary and a Google Charts pie chart.
 *
 * @param {QuizCompleteProps} props
 * @returns {JSX.Element}
 */
export default function QuizComplete({
  score,
  total,
  isSaving,
  saveMessage,
  handleRetake,
}: QuizCompleteProps) {
  return (
    <div className="text-center py-10">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Quiz Complete!
      </h2>
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
        You scored{' '}
        <span className="font-bold text-civic-blue dark:text-blue-400">
          {score}
        </span>{' '}
        out of {total}.
      </p>

      {/* Google Charts Pie Chart */}
      <QuizPieChart score={score} total={total} />

      {isSaving ? (
        <p className="text-slate-500 animate-pulse mt-6">
          Saving your score...
        </p>
      ) : saveMessage ? (
        <p
          className={`font-medium mt-6 ${saveMessage.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
        >
          {saveMessage}
        </p>
      ) : null}
      <button
        onClick={handleRetake}
        className="mt-8 bg-civic-saffron text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors"
      >
        Retake Quiz
      </button>
    </div>
  );
}

QuizComplete.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveMessage: PropTypes.string.isRequired,
  handleRetake: PropTypes.func.isRequired,
};
