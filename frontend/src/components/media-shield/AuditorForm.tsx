'use client';
import PropTypes from 'prop-types';
import React from 'react';

interface AuditorFormProps {
  textInput: string;
  setTextInput: (val: string) => void;
  handleAnalyze: (e?: React.FormEvent) => Promise<void>;
  isAuditing: boolean;
  isScanning: boolean;
  errorMessage: string;
}

export default function AuditorForm({
  textInput,
  setTextInput,
  handleAnalyze,
  isAuditing,
  isScanning,
  errorMessage,
}: AuditorFormProps) {
  return (
    <form
      onSubmit={handleAnalyze}
      className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col justify-center"
    >
      <textarea
        placeholder="Paste article text or headline here..."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        rows={5}
        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 text-slate-700 dark:text-slate-200 outline-none resize-none mb-4"
      />
      <button
        type="submit"
        disabled={isAuditing || isScanning || !textInput.trim()}
        className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        Analyze with Gemini
      </button>

      {errorMessage && (
        <p className="text-red-500 mt-4 text-sm font-medium">{errorMessage}</p>
      )}
    </form>
  );
}

AuditorForm.propTypes = {
  textInput: PropTypes.string.isRequired,
  setTextInput: PropTypes.func.isRequired,
  handleAnalyze: PropTypes.func.isRequired,
  isAuditing: PropTypes.bool.isRequired,
  isScanning: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
