'use client';
import { useLanguage } from '@/context/LanguageContext';
import DashboardTile from '@/components/DashboardTile';

export default function DashboardGrid() {
  const { isSimpleMode } = useLanguage();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
      <DashboardTile
        title={isSimpleMode ? 'Election Dates' : 'Election Timeline'}
        description={
          isSimpleMode
            ? 'Track important dates and voting days.'
            : 'Track upcoming deadlines, gazette notifications, and voting days.'
        }
        icon="📅"
        href="/timeline"
        colorClass="bg-gradient-to-br from-civic-blue to-blue-600"
      />
      <DashboardTile
        title={isSimpleMode ? 'Get Registered' : 'Register to Vote'}
        description={
          isSimpleMode
            ? 'Easy steps to get your name on the list.'
            : 'Step-by-step guide to Forms, eligibility, and getting on the electoral roll.'
        }
        icon="📝"
        href="/register"
        colorClass="bg-gradient-to-br from-civic-saffron to-orange-500"
      />
      <DashboardTile
        title={isSimpleMode ? 'Voting Guide' : 'How to Vote'}
        description={
          isSimpleMode
            ? 'Learn how the machines work and your rights.'
            : 'Learn about EVMs, VVPATs, polling station protocols, and your rights.'
        }
        icon="🗳️"
        href="/how-to-vote"
        colorClass="bg-gradient-to-br from-slate-700 to-slate-900"
      />
      <DashboardTile
        title={isSimpleMode ? 'News Checker' : 'Media Shield'}
        description={
          isSimpleMode
            ? 'Check if news articles are fair and true.'
            : 'Analyze headlines for bias, loaded language, and verify evidence.'
        }
        icon="🛡️"
        href="/media-shield"
        colorClass="bg-gradient-to-br from-indigo-500 to-purple-600"
      />
      <DashboardTile
        title={isSimpleMode ? 'World View' : 'Global Comparison'}
        description={
          isSimpleMode
            ? 'See how other countries vote.'
            : 'Compare Indian electoral processes with international democracies.'
        }
        icon="🌍"
        href="/compare"
        colorClass="bg-gradient-to-br from-teal-500 to-emerald-600"
      />
      <DashboardTile
        title={isSimpleMode ? 'Machine Safety' : 'Security Lab'}
        description={
          isSimpleMode
            ? 'See the tech that keeps votes safe.'
            : 'Explore EVM and VVPAT technical safeguards and verification protocols.'
        }
        icon="🔒"
        href="/security"
        colorClass="bg-gradient-to-br from-rose-500 to-red-600"
      />
      <DashboardTile
        title={isSimpleMode ? 'Your Rights' : 'Voter Rights'}
        description={
          isSimpleMode
            ? 'What to do if there are problems on election day.'
            : 'Legal guide for common polling station issues and protections.'
        }
        icon="⚖️"
        href="/rights"
        colorClass="bg-gradient-to-br from-amber-500 to-yellow-600"
      />
      <DashboardTile
        title={isSimpleMode ? 'Party Promises' : 'Manifesto Audit'}
        description={
          isSimpleMode
            ? 'Simple summaries of what parties promise.'
            : 'Objective summaries of the top party manifestos for the 2026 cycle.'
        }
        icon="📊"
        href="/candidates"
        colorClass="bg-gradient-to-br from-cyan-500 to-blue-500"
      />
      <DashboardTile
        title={isSimpleMode ? 'Vote Counting' : 'Counting Day'}
        description={
          isSimpleMode
            ? 'Learn how votes are legally added up.'
            : 'Understand table-wise counting protocols and VVPAT slip matching rules.'
        }
        icon="📈"
        href="/results"
        colorClass="bg-gradient-to-br from-indigo-600 to-indigo-800"
      />
      <DashboardTile
        title={isSimpleMode ? 'Fun Quiz' : 'Interactive Quiz'}
        description={
          isSimpleMode
            ? 'Test what you know about elections!'
            : 'Test your electoral knowledge with our randomized global systems quiz.'
        }
        icon="🧠"
        href="/quiz"
        colorClass="bg-gradient-to-br from-pink-500 to-rose-500"
      />
    </div>
  );
}
