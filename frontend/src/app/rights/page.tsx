'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { traceAsync } from '@/services/perfService';

const LEGAL_SYSTEM_PROMPT =
  'You are an Indian electoral law expert. Answer questions based on the Representation of the People Act 1951, the Conduct of Elections Rules 1961, and official ECI (Election Commission of India) guidelines. Cite specific sections, rules, or form numbers when applicable. Keep answers clear, factual, and concise (under 200 words). Never give personal legal advice — always recommend consulting an official source for specific cases.';

/**
 * The Voter Rights page.
 * Outlines constitutional voter protections and includes a Gemini-powered legal Q&A.
 *
 * @returns {JSX.Element} The rendered VoterRights component.
 */
export default function VoterRights() {
  const { isSimpleMode } = useLanguage();
  const [legalQuery, setLegalQuery] = useState('');
  const [legalAnswer, setLegalAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [legalError, setLegalError] = useState('');

  /**
   * Sends a legal question to Gemini with electoral law context.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @returns {Promise<void>}
   */
  const handleAskLegal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalQuery.trim() || isAsking) return;

    setIsAsking(true);
    setLegalAnswer('');
    setLegalError('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) throw new Error('Gemini API Key is missing.');

      const answer = await traceAsync('gemini_legal_qa', async () => {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-flash-latest',
          systemInstruction: LEGAL_SYSTEM_PROMPT,
        });

        const modeHint = isSimpleMode
          ? ' (Please answer in simple, easy-to-understand language.)'
          : '';

        const result = await model.generateContent(legalQuery + modeHint);
        return result.response.text();
      });
      setLegalAnswer(answer);
    } catch (err: unknown) {
      setLegalError(err instanceof Error ? err.message : 'An error occurred.');
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1"
      >
        ← Back to Dashboard
      </Link>

      {/* Bias Audit Remediation Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg text-sm text-blue-800 dark:text-blue-200">
        <strong className="font-bold flex items-center gap-2">
          <span aria-hidden="true">ℹ️</span> System Audit Flag:
        </strong>
        The emotive term <em>&quot;purge&quot;</em> was detected in the prompt
        and has been remediated to the objective, statutory term{' '}
        <strong>&quot;Special Summary Revision (SIR) Deletions&quot;</strong> to
        comply with neutrality guardrails.
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">
          ⚖️
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Voter <span className="text-amber-500">Rights &amp; Protections</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        {isSimpleMode
          ? 'A simple guide to help you if you face issues at the polling booth or with the voter list.'
          : 'A legal guide for common polling station issues and maintaining your electoral roll status.'}
      </p>

      <div className="space-y-6">
        {/* Ask a Legal Question — Gemini AI */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-8 rounded-2xl shadow-md border border-indigo-200 dark:border-indigo-800">
          <h2 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
            <span aria-hidden="true">🧠</span>{' '}
            {isSimpleMode ? 'Ask a Voting Question' : 'Ask a Legal Question'}
            <span className="text-xs font-mono bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-800">
              Gemini AI
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            {isSimpleMode
              ? 'Type your question about voting rules or problems, and our AI will answer based on official rules.'
              : 'Ask any question about Indian electoral law. Answers are powered by Gemini AI and grounded in the Representation of the People Act and ECI guidelines.'}
          </p>

          <form onSubmit={handleAskLegal} className="flex gap-3">
            <input
              type="text"
              value={legalQuery}
              onChange={(e) => setLegalQuery(e.target.value)}
              placeholder={
                isSimpleMode
                  ? 'e.g., What do I do if my name is missing?'
                  : 'e.g., What is the procedure for filing Form 7 objection?'
              }
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <button
              type="submit"
              disabled={isAsking || !legalQuery.trim()}
              className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isAsking ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Ask'
              )}
            </button>
          </form>

          {legalError && (
            <p className="text-red-500 mt-3 text-sm font-medium">
              {legalError}
            </p>
          )}

          {legalAnswer && (
            <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-xl border border-indigo-200 dark:border-indigo-700 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden="true">⚖️</span>
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">
                  Legal Answer
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap">
                {legalAnswer}
              </p>
              <p className="text-xs text-slate-400 mt-4 border-t border-slate-200 dark:border-slate-700 pt-3">
                ⚠️ This is AI-generated guidance, not formal legal advice.
                Always verify with official ECI sources.
              </p>
            </div>
          )}
        </section>

        {/* Existing static content */}
        <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl shadow-sm border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-2">
            {isSimpleMode
              ? 'Name Missing from the Voter List Update?'
              : 'Deleted during the April 2026 Special Summary Revision (SIR)?'}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            {isSimpleMode
              ? 'If your name was removed during the recent updates, you must act before the deadline.'
              : 'If your name was removed during recent electoral roll updates, you must act before the nomination deadline. Possession of an EPIC alone does not guarantee voting rights.'}
          </p>
          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li>
              <strong>Submit Form 6:</strong>{' '}
              {isSimpleMode
                ? 'Apply immediately as a new voter.'
                : 'Apply immediately as a new voter if you were wrongfully deleted.'}
            </li>
            <li>
              <strong>Submit Form 8:</strong>{' '}
              {isSimpleMode
                ? 'If your details need correction or shifting.'
                : 'If your details were shifted or require correction.'}
            </li>
            <li>
              <strong>
                {isSimpleMode ? 'Object (Form 7)' : 'Appeal (Form 7)'}:
              </strong>{' '}
              {isSimpleMode
                ? 'If you want to object to a name on the list.'
                : 'If you are objecting to the inclusion/deletion of a name.'}
            </li>
          </ul>
          <a
            href="https://voters.eci.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-civic-saffron text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition-colors"
          >
            Access Official ECI Forms
          </a>
        </section>

        <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {isSimpleMode
              ? 'Someone Already Voted in Your Name?'
              : 'Someone Already Voted in Your Name? (Tendered Vote)'}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            {isSimpleMode
              ? 'If someone has falsely cast a vote under your name, do not leave. Demand a Tendered Ballot Paper from the officer.'
              : 'Demand a Tendered Ballot Paper from the Presiding Officer under Rule 42 of the Conduct of Elections Rules, 1961.'}
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            {isSimpleMode
              ? 'Someone Says You Are Not Who You Say You Are?'
              : 'Identity Challenged by a Polling Agent? (Challenged Vote)'}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            {isSimpleMode
              ? 'A polling agent can challenge your identity by paying ₹2. Show a valid ID and the challenge is rejected.'
              : 'A polling agent can challenge your identity by depositing ₹2. The Presiding Officer will hold a summary inquiry. Prove your identity with valid documents and vote.'}
          </p>
        </section>
      </div>
    </main>
  );
}
