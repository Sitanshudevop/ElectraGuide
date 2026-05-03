'use client';
import PropTypes from 'prop-types';
import React from 'react';

interface Question {
  q: string;
  options: string[];
  ans: number;
}

interface QuizActiveProps {
  current: number;
  total: number;
  question: Question;
  selected: number | null;
  setSelected: (val: number) => void;
  handleNext: () => void;
}

export default function QuizActive({
  current,
  total,
  question,
  selected,
  setSelected,
  handleNext,
}: QuizActiveProps) {
  return (
    <div>
      <p className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">
        Question {current + 1} of {total}
      </p>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        {question.q}
      </h2>
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`w-full text-left p-4 rounded-xl border-2 font-medium transition-all ${
              selected === idx
                ? 'border-civic-blue bg-blue-50 dark:bg-blue-900/30 text-civic-blue dark:text-blue-300'
                : 'border-slate-200 dark:border-slate-700 hover:border-civic-saffron hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mt-8 text-right">
        <button
          disabled={selected === null}
          onClick={handleNext}
          className="bg-civic-blue text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          {current === total - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

QuizActive.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  question: PropTypes.object.isRequired,
  selected: PropTypes.number,
  setSelected: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};
