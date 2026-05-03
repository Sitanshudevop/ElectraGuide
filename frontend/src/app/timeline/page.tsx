import Link from 'next/link';

/**
 * The Timeline page.
 * Displays key milestones and phases for the Indian General Elections.
 *
 * @returns {JSX.Element} The rendered Timeline component.
 */
export default function Timeline() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
        2026 Election <span className="text-civic-blue">Timeline</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
        Key milestones for the Indian General Elections, featuring specific
        phases retrieved by our Scout Agent.
      </p>

      <div className="relative border-l-4 border-civic-saffron ml-4 md:ml-6 space-y-12">
        {/* Phase Node 1 */}
        <div className="relative pl-8">
          <div
            className="absolute -left-3.5 top-1 h-6 w-6 rounded-full bg-civic-blue border-4 border-white shadow"
            aria-hidden="true"
          ></div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Gazette Notification Issued
          </h2>
          <p className="text-civic-saffron font-bold text-sm mb-2">
            March 27, 2026
          </p>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-300">
              The Election Commission of India (ECI) officially announces the
              start of the nomination process for Phase II.
            </p>
          </div>
        </div>

        {/* Phase Node 2 (Highlight) */}
        <div className="relative pl-8">
          <div
            className="absolute -left-4 top-1 h-7 w-7 rounded-full bg-civic-saffron border-4 border-white shadow ring-4 ring-orange-200 animate-pulse"
            aria-hidden="true"
          ></div>
          <h2 className="text-2xl font-bold text-civic-blue dark:text-blue-400">
            West Bengal Phase II Polling
          </h2>
          <p className="text-civic-saffron font-bold text-sm mb-2">
            April 29, 2026
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-md border-l-4 border-civic-blue">
            <p className="text-slate-700 dark:text-slate-200 font-medium mb-3">
              Voting day for designated constituencies in West Bengal. Polling
              stations will remain open from 7:00 AM to 6:00 PM.
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>Carry your EPIC (Voter ID) or an approved alternative ID.</li>
              <li>
                Mobile phones are strictly prohibited inside the polling booth.
              </li>
            </ul>
          </div>
        </div>

        {/* Phase Node 3 */}
        <div className="relative pl-8">
          <div
            className="absolute -left-3.5 top-1 h-6 w-6 rounded-full bg-slate-400 border-4 border-white shadow"
            aria-hidden="true"
          ></div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            Counting of Votes
          </h2>
          <p className="text-slate-500 font-bold text-sm mb-2">June 4, 2026</p>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-300">
              Simultaneous counting of votes across all phases and states
              nationwide.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
