// src/pages/InsightsPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { useState } from "react";

// Componentes gerais
import InsightsHeader from "../components/insights/general/InsightsHeader";
import InsightChart from "../components/insights/general/InsightChart";
import AllPlatformsOverview from "../components/insights/general/AllPlatformsOverview";
import CombinedRecommendations from "../components/insights/general/CombinedRecommendations";
import CrossPlatformPerformance from "../components/insights/general/CrossPlatformPerformance";
import GlobalAlerts from "../components/insights/general/GlobalAlerts";

// Componentes por plataforma
import YouTubeInsights from "../components/insights/youtube/YouTubeInsights";
import YouTubeRecommendations from "../components/insights/youtube/YouTubeRecommendations";
import YouTubePerformance from "../components/insights/youtube/YouTubePerformance";
import YouTubeAlerts from "../components/insights/youtube/YouTubeAlerts";

import TikTokInsights from "../components/insights/tiktok/TikTokInsights";
import TikTokRecommendations from "../components/insights/tiktok/TikTokRecommendations";
import TikTokPerformance from "../components/insights/tiktok/TikTokPerformance";
import TikTokAlerts from "../components/insights/tiktok/TikTokAlerts";

import InstagramInsights from "../components/insights/instagram/InstagramInsights";
import InstagramRecommendations from "../components/insights/instagram/InstagramRecommendations";
import InstagramPerformance from "../components/insights/instagram/InstagramPerformance";
import InstagramAlerts from "../components/insights/instagram/InstagramAlerts";

import FacebookInsights from "../components/insights/facebook/FacebookInsights";
import FacebookRecommendations from "../components/insights/facebook/FacebookRecommendations";
import FacebookPerformance from "../components/insights/facebook/FacebookPerformance";
import FacebookAlerts from "../components/insights/facebook/FacebookAlerts";

// Mapeamento de componentes por plataforma
// "all" não tem "Insights" para evitar repetição com AllPlatformsOverview
const platformComponents = {
  all: {
    Recommendations: CombinedRecommendations,
    Performance: CrossPlatformPerformance,
    Alerts: GlobalAlerts,
  },
  youtube: {
    Insights: YouTubeInsights,
    Recommendations: YouTubeRecommendations,
    Performance: YouTubePerformance,
    Alerts: YouTubeAlerts,
  },
  tiktok: {
    Insights: TikTokInsights,
    Recommendations: TikTokRecommendations,
    Performance: TikTokPerformance,
    Alerts: TikTokAlerts,
  },
  instagram: {
    Insights: InstagramInsights,
    Recommendations: InstagramRecommendations,
    Performance: InstagramPerformance,
    Alerts: InstagramAlerts,
  },
  facebook: {
    Insights: FacebookInsights,
    Recommendations: FacebookRecommendations,
    Performance: FacebookPerformance,
    Alerts: FacebookAlerts,
  },
};

export default function InsightsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const Components = platformComponents[selectedPlatform] || {};

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Header com filtro integrado e status da IA */}
        <InsightsHeader
          selectedPlatform={selectedPlatform}
          onPlatformChange={setSelectedPlatform}
        />

        {/* Visão geral + gráfico comparativo — apenas quando "Todas as plataformas" */}
        {selectedPlatform === "all" && (
          <>
            <AllPlatformsOverview />
            <InsightChart />
          </>
        )}

        {/* Conteúdo dinâmico */}
        <div className="space-y-20">
          {/* Insights específicos — só mostra quando uma plataforma está selecionada */}
          {selectedPlatform !== "all" && Components.Insights && (
            <Components.Insights />
          )}

          {/* Recomendações, Performance e Alertas — gerais ou específicas */}
          <Components.Recommendations />
          <Components.Performance />
          <Components.Alerts />
        </div>
      </div>
    </DashboardLayout>
  );
}
