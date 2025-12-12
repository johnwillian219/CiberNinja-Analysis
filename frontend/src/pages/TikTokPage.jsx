// src/pages/TikTokPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import TikTokHeader from "../components/tiktok/TikTokHeader";
import TikTokStatsCards from "../components/tiktok/TikTokStatsCards";
import TikTokChart from "../components/tiktok/TikTokChart";
import TikTokInsights from "../components/tiktok/TikTokInsights";
import TikTokVideosTable from "../components/tiktok/TikTokVideosTable";
import TikTokRankings from "../components/tiktok/TikTokRankings";

export default function TikTokPage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        <TikTokHeader />
        <TikTokStatsCards />
        <TikTokChart />
        <TikTokInsights />
        <TikTokVideosTable />
        <TikTokRankings />
      </div>
    </DashboardLayout>
  );
}
