import Link from 'next/link';

/**
 * The Register page.
 * Provides guidance and links for voter registration (Form 6 and Form 8).
 *
 * @returns {JSX.Element} The rendered Register component.
 */
export default function Register() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
        Voter Registration <span className="text-civic-saffron">Guide</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        Follow these official Election Commission of India (ECI) guidelines to
        ensure you are on the electoral roll.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form 6 Card */}
        <section
          className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-t-4 border-civic-blue flex flex-col"
          role="region"
          aria-labelledby="form6-heading"
        >
          <div className="text-4xl mb-4" aria-hidden="true">
            📝
          </div>
          <h2
            id="form6-heading"
            className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
          >
            New Voter (Form 6)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">
            For citizens who are 18 years of age or older and are registering to
            vote for the very first time.
          </p>
          <ol className="list-decimal list-inside text-slate-700 dark:text-slate-200 space-y-3 mb-6 font-medium flex-1">
            <li>Verify your age (must be 18+).</li>
            <li>Keep a passport-sized photograph ready.</li>
            <li>
              Prepare proof of age and proof of residence (e.g., Aadhaar,
              Passport, Utility Bill).
            </li>
            <li>
              Submit Form 6 online via the Voter Service Portal
              (voters.eci.gov.in).
            </li>
          </ol>
          <a
            href="https://voters.eci.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-civic-blue text-white font-bold py-3 rounded-xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-colors"
          >
            Apply for Form 6
          </a>
        </section>

        {/* Form 8 Card */}
        <section
          className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-t-4 border-civic-saffron flex flex-col"
          role="region"
          aria-labelledby="form8-heading"
        >
          <div className="text-4xl mb-4" aria-hidden="true">
            🔄
          </div>
          <h2
            id="form8-heading"
            className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
          >
            Corrections / Shift (Form 8)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm">
            For existing voters who need to shift their constituency, correct
            details, or request a replacement EPIC.
          </p>
          <ul className="list-disc list-inside text-slate-700 dark:text-slate-200 space-y-3 mb-6 font-medium flex-1">
            <li>Shifting of residence (within or outside constituency).</li>
            <li>Correction of entries (Name, Age, Address, Photo).</li>
            <li>Issue of replacement EPIC without alteration.</li>
            <li>Marking of Person with Disability (PwD).</li>
          </ul>
          <a
            href="https://voters.eci.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-civic-saffron text-white font-bold py-3 rounded-xl hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 transition-colors"
          >
            Apply for Form 8
          </a>
        </section>
      </div>
    </main>
  );
}
