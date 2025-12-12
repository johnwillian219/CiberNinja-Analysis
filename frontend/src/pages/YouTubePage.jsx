// src/pages/YouTubePage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import YouTubeHeader from "../components/youtube/YouTubeHeader";
import YouTubeStatsCards from "../components/youtube/YouTubeStatsCards";
import YouTubeViewsChart from "../components/youtube/YouTubeChart";
import YouTubeInsights from "../components/youtube/YouTubeInsights";
import YouTubeVideosTable from "../components/youtube/YouTubeVideosTable";
import YouTubeRankings from "../components/youtube/YouTubeRankings";

export default function YouTubePage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        <YouTubeHeader />
        <YouTubeStatsCards />
        <YouTubeViewsChart />
        <YouTubeInsights />
        <YouTubeVideosTable />
        <YouTubeRankings />
      </div>
    </DashboardLayout>
  );
}
