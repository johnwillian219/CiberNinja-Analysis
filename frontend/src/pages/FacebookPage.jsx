// src/pages/FacebookPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import FacebookHeader from "../components/facebook/FacebookHeader";
import FacebookStatsCards from "../components/facebook/FacebookStatsCards";
import FacebookChart from "../components/facebook/FacebookChart";
import FacebookInsights from "../components/facebook/FacebookInsights";
import FacebookVideosTable from "../components/facebook/FacebookVideosTable";
import FacebookRankings from "../components/facebook/FacebookRankings";

export default function FacebookPage() {
  return (
    <DashboardLayout>
      <div className="sm:p-5 md:p-6 lg:p-8 xl:p-10 pb-16">
        <FacebookHeader />
        <FacebookStatsCards />
        <FacebookChart />
        <FacebookInsights />
        <FacebookVideosTable />
        <FacebookRankings />
      </div>
    </DashboardLayout>
  );
}
