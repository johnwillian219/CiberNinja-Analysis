// src/pages/InsightsPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { useState } from "react";

// Componentes gerais
import InsightsHeader from "../components/insights/general/InsightsHeader";
import InsightChart from "../components/insights/general/InsightChart";
import AllPlatformsOverview from "../components/insights/general/AllPlatformsOverview";
import CombinedRecommendations from "../components/insights/general/CombinedRecommendations";
import GlobalAlerts from "../components/insights/general/GlobalAlerts";

// Componentes por plataforma

import YouTubePerformance from "../components/insights/youtube/YouTubePerformance";
import YouTubeAlerts from "../components/insights/youtube/YouTubeAlerts";

import TikTokPerformance from "../components/insights/tiktok/TikTokPerformance";
import TikTokAlerts from "../components/insights/tiktok/TikTokAlerts";

import InstagramPerformance from "../components/insights/instagram/InstagramPerformance";
import InstagramAlerts from "../components/insights/instagram/InstagramAlerts";

import FacebookPerformance from "../components/insights/facebook/FacebookPerformance";
import FacebookAlerts from "../components/insights/facebook/FacebookAlerts";

// Mapeamento de componentes por plataforma
const platformComponents = {
  all: {
    Recommendations: CombinedRecommendations,
    Alerts: GlobalAlerts,
  },
  youtube: {
    Performance: YouTubePerformance,
    Alerts: YouTubeAlerts,
  },
  tiktok: {
    Performance: TikTokPerformance,
    Alerts: TikTokAlerts,
  },
  instagram: {
    Performance: InstagramPerformance,
    Alerts: InstagramAlerts,
  },
  facebook: {
    Performance: FacebookPerformance,
    Alerts: FacebookAlerts,
  },
};

export default function InsightsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const Components = platformComponents[selectedPlatform] || {};

  return (
    <DashboardLayout>
      <div className="sm:p-6 lg:p-8 xl:p-10">
        {/* Header com filtro integrado e status da IA */}
        <InsightsHeader
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
        />

        {/* Visão geral + gráfico comparativo — apenas quando "Todas as plataformas" */}
        {selectedPlatform === "all" && (
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <AllPlatformsOverview />
            <InsightChart />
          </div>
        )}

        {/* Conteúdo dinâmico */}
        <div className="space-y-8 sm:space-y-12 lg:space-y-16 xl:space-y-20">
          {/* Insights específicos — só mostra quando uma plataforma está selecionada */}
          {selectedPlatform !== "all" && Components.Insights && (
            <Components.Insights />
          )}

          {/* Recomendações, Performance e Alertas — gerais ou específicas */}
          {Components.Recommendations && <Components.Recommendations />}
          {Components.Performance && <Components.Performance />}
          {Components.Alerts && <Components.Alerts />}
        </div>
      </div>
    </DashboardLayout>
  );
}
