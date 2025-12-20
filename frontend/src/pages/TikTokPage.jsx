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
      <div className="sm:p-5 md:p-6 lg:p-8 xl:p-10 pb-16">
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
