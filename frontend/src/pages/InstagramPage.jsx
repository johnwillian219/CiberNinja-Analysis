// src/pages/InstagramPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import InstagramHeader from "../components/instagram/InstagramHeader";
import InstagramStatsCards from "../components/instagram/InstagramStatsCards";
import InstagramChart from "../components/instagram/InstagramChart";
import InstagramInsights from "../components/instagram/InstagramInsights";
import InstagramVideosTable from "../components/instagram/InstagramVideosTable";
import InstagramRankings from "../components/instagram/InstagramRankings";

export default function InstagramPage() {
  return (
    <DashboardLayout>
      <div className="sm:p-5 md:p-6 lg:p-8 xl:p-10 pb-16">
        <InstagramHeader />
        <InstagramStatsCards />
        <InstagramChart />
        <InstagramInsights />
        <InstagramVideosTable />
        <InstagramRankings />
      </div>
    </DashboardLayout>
  );
}
