import Link from 'next/link';

export default function ResultsSimulator() {
  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/" className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1">
        ← Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">📈</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Counting Day <span className="text-indigo-500">Dashboard</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        May 4, 2026: The official vote counting protocols. Understand how results are legally tallied and verified.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Table-wise Counting Protocol */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
               <span aria-hidden="true">🏢</span> Table-Wise Counting Protocol
            </h2>
          </div>
          <div className="p-6 flex-1 text-slate-600 dark:text-slate-300">
            <p className="mb-4">
              Inside the counting center, counting is done table-wise. A standard counting hall has 14 tables. The EVM Control Units (CUs) are brought to these tables sequentially (Round 1, Round 2, etc.).
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Agents for all candidates are seated at every table.</li>
              <li>The seals of the Control Unit are verified by all agents before the "Result" button is pressed.</li>
              <li>The tally from the CU is recorded on Form 17C, signed by the counting supervisor and the candidate agents.</li>
            </ul>
          </div>
        </section>

        {/* VVPAT Matching Rules */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="bg-slate-100 dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
               <span aria-hidden="true">📜</span> VVPAT Slip Matching Rules
            </h2>
          </div>
          <div className="p-6 flex-1 text-slate-600 dark:text-slate-300">
            <p className="mb-4">
              To ensure the cryptographic integrity of the EVMs, a mandatory verification of VVPAT paper slips is conducted against the electronic tally.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>By Supreme Court mandate, VVPAT slips of <strong>5 randomly selected polling stations</strong> per assembly constituency are physically counted.</li>
              <li>The selection happens via a draw of lots in the presence of candidates.</li>
              <li><strong>If a discrepancy occurs:</strong> The physical paper slip count overrides the EVM electronic count as per Rule 56D(4)(b) of the Conduct of Elections Rules.</li>
            </ul>
          </div>
        </section>

      </div>
    </main>
  );
}
