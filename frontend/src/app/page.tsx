'use client';
import HomeHeader from '@/components/home/HomeHeader';
import GlobalHeatmap from '@/components/home/GlobalHeatmap';
import DashboardGrid from '@/components/home/DashboardGrid';
import CommunityPoll from '@/components/home/CommunityPoll';
import RegionalElections from '@/components/home/RegionalElections';
import { useRemoteConfig } from '@/context/RemoteConfigContext';

/**
 * The main landing page (Dashboard) for ElectraGuide.
 * Renders the global election heatmap, personalized regional elections,
 * community poll, and navigation tiles.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home() {
  const { showCommunityPoll } = useRemoteConfig();

  return (
    <main
      className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700"
      role="main"
    >
      <div className="w-full max-w-7xl flex flex-col items-center">
        <HomeHeader />
        <GlobalHeatmap />
        <RegionalElections />
        {showCommunityPoll && <CommunityPoll />}
        <DashboardGrid />
      </div>
    </main>
  );
}
