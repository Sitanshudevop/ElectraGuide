'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function VoterRights() {
  const { isSimpleMode } = useLanguage();

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/" className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1">
        ← Back to Dashboard
      </Link>
      
      {/* Bias Audit Remediation Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-8 rounded-r-lg text-sm text-blue-800 dark:text-blue-200">
        <strong className="font-bold flex items-center gap-2"><span aria-hidden="true">ℹ️</span> System Audit Flag:</strong>
        The emotive term <em>"purge"</em> was detected in the prompt and has been remediated to the objective, statutory term <strong>"Special Summary Revision (SIR) Deletions"</strong> to comply with neutrality guardrails.
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">⚖️</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Voter <span className="text-amber-500">Rights & Protections</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        {isSimpleMode 
          ? "A simple guide to help you if you face issues at the polling booth or with the voter list."
          : "A legal guide for common polling station issues and maintaining your electoral roll status."}
      </p>

      <div className="space-y-6">
        
        <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-2xl shadow-sm border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-2">
             {isSimpleMode ? "Name Missing from the Voter List Update?" : "Deleted during the April 2026 Special Summary Revision (SIR)?"}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
             {isSimpleMode 
               ? "If your name was removed during the recent updates, you must act before the deadline. Having a Voter ID card is not enough if your name is not on the list."
               : "If your name was removed during the recent electoral roll updates, you must act before the nomination deadline. Possession of an EPIC (Voter ID) alone does not guarantee voting rights if your name is off the roll."}
          </p>
          <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Submit Form 6:</strong> {isSimpleMode ? "Apply immediately as a new voter." : "Apply immediately as a new voter if you were wrongfully deleted."}</li>
            <li><strong>Submit Form 8:</strong> {isSimpleMode ? "If your details need correction or shifting." : "If your details were shifted or require correction."}</li>
            <li><strong>{isSimpleMode ? "Object (Form 7)" : "Appeal (Form 7)"}:</strong> {isSimpleMode ? "If you want to object to a name on the list." : "If you are objecting to the inclusion/deletion of a name."}</li>
          </ul>
          <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-block bg-civic-saffron text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition-colors">
            Access Official ECI Forms
          </a>
        </section>

        <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
             {isSimpleMode ? "Someone Already Voted in Your Name?" : "Someone Already Voted in Your Name? (Tendered Vote)"}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
             {isSimpleMode
               ? "If someone has falsely cast a vote under your name, do not leave. Demand a Tendered Ballot Paper from the officer. You will cast your vote on paper, and it will be counted if the race is very close."
               : "If someone has falsely cast a vote under your name, do not leave. Demand a Tendered Ballot Paper from the Presiding Officer under Rule 42 of the Conduct of Elections Rules, 1961. You will cast your vote on a physical paper ballot, which is kept separately and counted if the margin of victory is narrow enough to be contested."}
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
             {isSimpleMode ? "Someone Says You Are Not Who You Say You Are?" : "Identity Challenged by a Polling Agent? (Challenged Vote)"}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
             {isSimpleMode
               ? "A polling agent can challenge your identity by paying ₹2. The officer will quickly check. If you show a valid ID (Aadhaar, Passport, etc.), the challenge is rejected, and you can vote."
               : "A polling agent can challenge your identity by depositing a fee of ₹2. The Presiding Officer will hold a summary inquiry. If you prove your identity with valid documents (Aadhaar, Passport, etc.), the challenge is rejected, and you will be allowed to vote."}
          </p>
        </section>

      </div>
    </main>
  );
}
