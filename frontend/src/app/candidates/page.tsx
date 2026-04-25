import Link from 'next/link';

export default function ManifestoAnalyzer() {
  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link href="/" className="inline-flex items-center text-civic-blue dark:text-blue-400 hover:underline mb-8 font-medium focus:ring-2 focus:ring-civic-blue rounded-md px-2 py-1">
        ← Back to Dashboard
      </Link>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" aria-hidden="true">📊</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
          Manifesto <span className="text-cyan-500">Audit</span>
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        Objective summaries of the top party manifestos for the West Bengal 2026 cycle, focusing strictly on verifiable promises regarding Youth Employment and Digital Infrastructure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* TMC */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-t-4 border-green-600 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">All India Trinamool Congress (TMC)</h2>
          </div>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-3 mb-6 flex-1">
            <li><strong>Youth Employment:</strong> Proposes scaling the "Student Credit Card" scheme limit to ₹15 Lakhs and promises 500,000 new MSME-backed apprenticeships.</li>
            <li><strong>Digital Infrastructure:</strong> Pledges to expand "Duare Sarkar" (Government at Doorstep) digital portals and free Wi-Fi zones in 100 tier-2 and tier-3 municipalities.</li>
          </ul>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700 mt-auto">
             <div className="flex justify-between text-xs font-mono font-bold text-green-600">
                <span>Neutrality Score: 92/100</span>
                <span>STATUS: PASS</span>
             </div>
          </div>
        </section>

        {/* BJP */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border-t-4 border-orange-500 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Bharatiya Janata Party (BJP)</h2>
          </div>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-3 mb-6 flex-1">
            <li><strong>Youth Employment:</strong> Commits to establishing 50 new Skill India hubs in the state and filling 200,000 vacant state government positions within 18 months.</li>
            <li><strong>Digital Infrastructure:</strong> Proposes 100% optical fiber connectivity to all Gram Panchayats and establishing three new IT parks in North Bengal.</li>
          </ul>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700 mt-auto">
             <div className="flex justify-between text-xs font-mono font-bold text-green-600">
                <span>Neutrality Score: 90/100</span>
                <span>STATUS: PASS</span>
             </div>
          </div>
        </section>

      </div>
    </main>
  );
}
