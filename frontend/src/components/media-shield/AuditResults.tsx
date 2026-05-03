'use client';
import PropTypes from 'prop-types';
import React from 'react';

interface AnalysisResult {
  bias_rating: string;
  loaded_phrases: string[];
  missing_context: string;
  credibility_score: number;
  summary: string;
}

interface AuditResultsProps {
  auditComplete: boolean;
  analysisResult: AnalysisResult | null;
  showRationale: boolean;
  setShowRationale: (val: boolean) => void;
  handleDownloadPDF: () => Promise<void>;
  scorecardRef: React.RefObject<HTMLDivElement | null>;
  isSimpleMode: boolean;
}

export default function AuditResults({
  auditComplete,
  analysisResult,
  showRationale,
  setShowRationale,
  handleDownloadPDF,
  scorecardRef,
  isSimpleMode,
}: AuditResultsProps) {
  if (!auditComplete || !analysisResult) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-civic-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span aria-hidden="true">📄</span>{' '}
          {isSimpleMode ? 'Download Report' : 'Download Audit Report (PDF)'}
        </button>
      </div>

      <section
        ref={scorecardRef}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border-t-8 border-indigo-500 overflow-hidden flex flex-col"
      >
        <div className="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <span aria-hidden="true">📰</span> Live Source Analysis
          </span>
          <span className="text-xs font-mono bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-800">
            gemini-flash-latest
          </span>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {analysisResult.summary}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-slate-500 mb-2 uppercase tracking-wide font-bold">
                Credibility Score
              </p>
              <p
                className={`text-5xl font-mono font-bold ${analysisResult.credibility_score > 70 ? 'text-green-600' : analysisResult.credibility_score > 40 ? 'text-orange-500' : 'text-red-600'}`}
              >
                {analysisResult.credibility_score}/100
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-slate-500 mb-2 uppercase tracking-wide font-bold">
                Detected Bias
              </p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 capitalize">
                {analysisResult.bias_rating}
              </p>
            </div>
          </div>

          <div
            className="border-t border-slate-200 dark:border-slate-700 pt-6"
            data-html2canvas-ignore
          >
            <button
              onClick={() => setShowRationale(!showRationale)}
              className="bg-slate-800 dark:bg-slate-700 text-white font-bold py-2 px-6 rounded hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
            >
              <span aria-hidden="true">🔍</span>{' '}
              {showRationale
                ? 'Hide Details'
                : 'Show Rationale & Missing Context'}
            </button>

            {showRationale && (
              <div className="mt-6 space-y-6 animate-in fade-in duration-300">
                <div className="p-5 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-r-lg">
                  <h4 className="font-bold text-red-800 dark:text-red-400 mb-3 flex items-center gap-2">
                    <span aria-hidden="true">⚠️</span> Loaded Phrases Detected
                  </h4>
                  {analysisResult.loaded_phrases.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-sm">
                      {analysisResult.loaded_phrases.map((phrase, i) => (
                        <li key={i}>&quot;{phrase}&quot;</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-700 dark:text-slate-300 text-sm">
                      No significant loaded language detected.
                    </p>
                  )}
                </div>

                <div className="p-5 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-lg">
                  <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
                    <span aria-hidden="true">ℹ️</span> Missing Context
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">
                    {analysisResult.missing_context ||
                      'No missing context noted.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

AuditResults.propTypes = {
  auditComplete: PropTypes.bool.isRequired,
  analysisResult: PropTypes.object,
  showRationale: PropTypes.bool.isRequired,
  setShowRationale: PropTypes.func.isRequired,
  handleDownloadPDF: PropTypes.func.isRequired,
  scorecardRef: PropTypes.object.isRequired,
  isSimpleMode: PropTypes.bool.isRequired,
};
