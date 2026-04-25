'use client';
import DashboardTile from "@/components/DashboardTile";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { isSimpleMode } = useLanguage();

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700" role="main">
      <div className="w-full max-w-7xl flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-civic-blue dark:text-white mb-6 tracking-tight">
            Welcome to <span className="text-civic-saffron">ElectaGuide</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium">
            {isSimpleMode 
               ? "Your easy-to-use guide to understanding elections. Pick a topic below to start."
               : "Your unbiased, interactive companion for navigating the democratic process. Select an option below to begin your journey."}
          </p>
        </div>

        {/* Global Heatmap Section */}
        <div className="w-full mb-12 bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-slate-700">
           <div className="flex flex-col md:flex-row justify-between items-center mb-6 z-10 relative">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                 <span aria-hidden="true">🗺️</span> {isSimpleMode ? "Active Elections Map" : "2026 Global Election Heatmap"}
              </h2>
              <div className="flex gap-4 mt-4 md:mt-0">
                 <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-civic-saffron animate-pulse"></span> <span className="text-slate-300 text-sm">West Bengal</span></div>
                 <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span> <span className="text-slate-300 text-sm">US Primaries</span></div>
                 <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span> <span className="text-slate-300 text-sm">UK Local</span></div>
              </div>
           </div>
           
           {/* High-Fidelity World Map Overlay */}
           <div className="relative w-full h-64 md:h-[400px] bg-slate-800 rounded-2xl overflow-hidden shadow-inner border border-slate-700 flex items-center justify-center">
              {/* Using a highly recognizable, accurate public-domain equirectangular world map SVG */}
              <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
                 alt="World Map" 
                 className="absolute inset-0 w-full h-full object-fill opacity-60 dark:opacity-40 sepia-[.3] hue-rotate-[180deg] saturate-[2]"
                 style={{ filter: 'invert(1) brightness(0.8) contrast(1.2)' }}
                 draggable={false}
              />

              {/* Hotspots Container - Scaling identically with the image */}
              <div className="absolute inset-0 w-full h-full">
                 
                 {/* US Primaries Pin (Eastern US) */}
                 <div className="absolute top-[33%] left-[24%] group cursor-pointer z-10 hover:z-30">
                    <div className="w-5 h-5 bg-blue-500 rounded-full animate-ping opacity-75 absolute -inset-0.5"></div>
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,1)] relative z-10"></div>
                    <div className="absolute bottom-8 -left-32 bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded hidden group-hover:block w-64 shadow-xl border border-slate-200 pointer-events-none">
                       <p className="text-blue-600 mb-1 border-b pb-1 font-extrabold uppercase tracking-wide">May Primaries (IN, OH)</p>
                       <p className="text-slate-700">Status: Registration deadline April 27.</p>
                    </div>
                 </div>

                 {/* UK Local Pin (United Kingdom) */}
                 <div className="absolute top-[23%] left-[47%] group cursor-pointer z-10 hover:z-30">
                    <div className="w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75 absolute -inset-0.5"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(239,68,68,1)] relative z-10"></div>
                    <div className="absolute bottom-8 -left-32 bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded hidden group-hover:block w-64 shadow-xl border border-slate-200 pointer-events-none">
                       <p className="text-red-600 mb-1 border-b pb-1 font-extrabold uppercase tracking-wide">Local Council Elections: May 7</p>
                       <p className="text-slate-700">Status: Active campaigning.</p>
                    </div>
                 </div>

                 {/* West Bengal Phase II Pin (East India) */}
                 <div className="absolute top-[43%] left-[70.5%] group cursor-pointer z-20 hover:z-30">
                    <div className="w-5 h-5 bg-civic-saffron rounded-full animate-ping opacity-75 absolute -inset-0.5"></div>
                    <div className="w-4 h-4 bg-civic-saffron rounded-full border-2 border-white shadow-[0_0_15px_rgba(249,115,22,1)] relative z-10"></div>
                    <div className="absolute bottom-8 -left-32 bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded hidden group-hover:block w-64 shadow-xl border border-slate-200 pointer-events-none">
                       <p className="text-civic-saffron mb-1 border-b pb-1 font-extrabold uppercase tracking-wide">Phase II Polling: April 29</p>
                       <p className="text-slate-700">Status: 4 days remaining.</p>
                    </div>
                 </div>

              </div>
           </div>
        </div>

        {/* Dashboard Grid - 10 Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
          <DashboardTile
            title={isSimpleMode ? "Election Dates" : "Election Timeline"}
            description={isSimpleMode ? "Track important dates and voting days." : "Track upcoming deadlines, gazette notifications, and voting days."}
            icon="📅"
            href="/timeline"
            colorClass="bg-gradient-to-br from-civic-blue to-blue-600"
          />
          <DashboardTile
            title={isSimpleMode ? "Get Registered" : "Register to Vote"}
            description={isSimpleMode ? "Easy steps to get your name on the list." : "Step-by-step guide to Forms, eligibility, and getting on the electoral roll."}
            icon="📝"
            href="/register"
            colorClass="bg-gradient-to-br from-civic-saffron to-orange-500"
          />
          <DashboardTile
            title={isSimpleMode ? "Voting Guide" : "How to Vote"}
            description={isSimpleMode ? "Learn how the machines work and your rights." : "Learn about EVMs, VVPATs, polling station protocols, and your rights."}
            icon="🗳️"
            href="/how-to-vote"
            colorClass="bg-gradient-to-br from-slate-700 to-slate-900"
          />
          <DashboardTile
            title={isSimpleMode ? "News Checker" : "Media Shield"}
            description={isSimpleMode ? "Check if news articles are fair and true." : "Analyze headlines for bias, loaded language, and verify evidence."}
            icon="🛡️"
            href="/media-shield"
            colorClass="bg-gradient-to-br from-indigo-500 to-purple-600"
          />
          <DashboardTile
            title={isSimpleMode ? "World View" : "Global Comparison"}
            description={isSimpleMode ? "See how other countries vote." : "Compare Indian electoral processes with international democracies."}
            icon="🌍"
            href="/compare"
            colorClass="bg-gradient-to-br from-teal-500 to-emerald-600"
          />
          <DashboardTile
            title={isSimpleMode ? "Machine Safety" : "Security Lab"}
            description={isSimpleMode ? "See the tech that keeps votes safe." : "Explore EVM and VVPAT technical safeguards and verification protocols."}
            icon="🔒"
            href="/security"
            colorClass="bg-gradient-to-br from-rose-500 to-red-600"
          />
          <DashboardTile
            title={isSimpleMode ? "Your Rights" : "Voter Rights"}
            description={isSimpleMode ? "What to do if there are problems on election day." : "Legal guide for common polling station issues and protections."}
            icon="⚖️"
            href="/rights"
            colorClass="bg-gradient-to-br from-amber-500 to-yellow-600"
          />
          <DashboardTile
            title={isSimpleMode ? "Party Promises" : "Manifesto Audit"}
            description={isSimpleMode ? "Simple summaries of what parties promise." : "Objective summaries of the top party manifestos for the 2026 cycle."}
            icon="📊"
            href="/candidates"
            colorClass="bg-gradient-to-br from-cyan-500 to-blue-500"
          />
          <DashboardTile
            title={isSimpleMode ? "Vote Counting" : "Counting Day"}
            description={isSimpleMode ? "Learn how votes are legally added up." : "Understand table-wise counting protocols and VVPAT slip matching rules."}
            icon="📈"
            href="/results"
            colorClass="bg-gradient-to-br from-indigo-600 to-indigo-800"
          />
          <DashboardTile
            title={isSimpleMode ? "Fun Quiz" : "Interactive Quiz"}
            description={isSimpleMode ? "Test what you know about elections!" : "Test your electoral knowledge with our randomized global systems quiz."}
            icon="🧠"
            href="/quiz"
            colorClass="bg-gradient-to-br from-pink-500 to-rose-500"
          />
        </div>

      </div>
    </main>
  );
}
