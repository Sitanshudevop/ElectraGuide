import Link from 'next/link';

/**
 * The How-To Vote page.
 * Provides a step-by-step guide for voting with EVM and VVPAT systems.
 *
 * @returns {JSX.Element} The rendered HowToVote component.
 */
export default function HowToVote() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/"
        className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
        EVM-VVPAT <span className="text-slate-500">Protocol</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        A visual guide on how to securely cast your vote and verify it using the
        Electronic Voting Machine setup.
      </p>

      <div className="space-y-8">
        {/* Step 1 */}
        <section className="flex flex-col md:flex-row items-center bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border border-slate-100 dark:border-slate-700">
          <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-civic-blue dark:text-blue-300 font-bold text-3xl w-16 h-16 flex items-center justify-center rounded-full mb-4 md:mb-0 md:mr-8">
            1
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Identity Verification
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Present your EPIC (Voter ID) or alternative approved document to
              the First Polling Officer. They will verify your name on the
              electoral roll. The Second Polling Officer will mark your finger
              with indelible ink and give you a slip.
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="flex flex-col md:flex-row items-center bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 border border-slate-100 dark:border-slate-700">
          <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900 text-civic-saffron dark:text-orange-300 font-bold text-3xl w-16 h-16 flex items-center justify-center rounded-full mb-4 md:mb-0 md:mr-8">
            2
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Press the Blue Button (EVM)
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Proceed to the voting compartment. Press the blue button on the
              Ballot Unit adjacent to the symbol and name of the candidate you
              wish to vote for. A red light will glow next to the symbol.
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="flex flex-col md:flex-row items-center bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-md p-6 border-2 border-civic-blue">
          <div className="flex-shrink-0 bg-civic-blue text-white font-bold text-3xl w-16 h-16 flex items-center justify-center rounded-full mb-4 md:mb-0 md:mr-8 shadow-inner">
            3
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Verify the Slip (VVPAT)
            </h2>
            <p className="text-slate-700 dark:text-slate-200 font-medium">
              Look at the transparent window of the VVPAT machine. A printed
              paper slip containing the serial number, name, and symbol of your
              chosen candidate will be visible for{' '}
              <span className="font-bold text-civic-saffron">7 seconds</span>{' '}
              before dropping into the sealed drop box. A loud beep will confirm
              your vote is cast.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
