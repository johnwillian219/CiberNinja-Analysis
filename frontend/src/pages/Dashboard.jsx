// src/pages/DashboardPage.jsx
import { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import PlatformCard from "../components/dashboard/PlatformCard";
import TopVideosSection from "../components/dashboard/TopVideosSection";
import AIInsights from "../components/dashboard/AIInsights";
import RecentUploads from "../components/dashboard/RecentUploads";
import { PlatformCardsContainer } from "../components/dashboard/PlatformCard";
import YoutubeIcon from "@icons/YoutubeIcon";
import TiktokIcon from "@icons/TiktokIcon";
import InstagramIcon from "@icons/InstagramIcon";
import FacebookIcon from "@icons/FacebookIcon";

// Configurações da API do YouTube
const YOUTUBE_API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY ||
  "AIzaSyCtTFbHQ8BXdmGghYUH2_qu_3EsUi1f0SY";
const CHANNEL_ID =
  import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "UC0tkO3jaK3afLwV0lSEgwFQ";

// Função para buscar dados do canal
const fetchYouTubeChannelData = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics;
      const snippet = data.items[0].snippet;
      return {
        subscribers: parseInt(stats.subscriberCount) || 0,
        totalSubscribers: parseInt(stats.subscriberCount) || 0,
        videoCount: parseInt(stats.videoCount) || 0,
        viewCount: parseInt(stats.viewCount) || 0,
        channelName: snippet.title || "YouTube Channel",
        thumbnail: snippet.thumbnails?.default?.url,
      };
    }
    return {
      subscribers: 0,
      totalSubscribers: 0,
      videoCount: 0,
      viewCount: 0,
      channelName: "YouTube Channel",
    };
  } catch (error) {
    console.error("Erro ao buscar dados do YouTube:", error);
    return {
      subscribers: 0,
      totalSubscribers: 0,
      videoCount: 0,
      viewCount: 0,
      channelName: "YouTube Channel",
    };
  }
};

// Função para calcular crescimento desde o mês passado (mock para exemplo)
const calculateGrowth = (currentSubscribers) => {
  // Para simular crescimento, vamos usar 5% do total atual
  // Em produção, você buscaria dados históricos
  return Math.floor(currentSubscribers * 0.05);
};

export default function DashboardPage() {
  const [youtubeData, setYoutubeData] = useState({
    subscribers: 187542, // Valor inicial
    growth: 12480,
    loading: true,
  });

  useEffect(() => {
    const loadYouTubeData = async () => {
      setYoutubeData((prev) => ({ ...prev, loading: true }));

      try {
        const data = await fetchYouTubeChannelData();
        const growth = calculateGrowth(data.subscribers);

        setYoutubeData({
          subscribers: data.subscribers,
          growth: growth,
          loading: false,
        });
      } catch (error) {
        console.error("Erro ao carregar dados do YouTube:", error);
        setYoutubeData({
          subscribers: 187542,
          growth: 12480,
          loading: false,
        });
      }
    };

    loadYouTubeData();
  }, []);

  return (
    <DashboardLayout>
      {/* ===== BOAS-VINDAS ===== */}
      <div className="mb-8 lg:mb-10 text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 lg:mb-3 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Bem-vindo de volta, CiberNinja!
        </h2>
        <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
          Aqui está a visão geral das suas redes sociais nos últimos 30 dias.
        </p>
      </div>

      {/* Substituir o grid antigo por: */}
      <PlatformCardsContainer>
        {/* YouTube */}
        <div className="w-full">
          <PlatformCard
            platform={{
              name: "YouTube",
              path: "/youtube",
              followersLabel: "inscritos",
              color: "text-red-500",
            }}
            Icon={YoutubeIcon}
            followers={youtubeData.subscribers}
            growth={youtubeData.growth}
            growthText="este mês"
            loading={youtubeData.loading}
          />
        </div>

        {/* TikTok */}
        <div className="w-full">
          <PlatformCard
            platform={{
              name: "TikTok",
              path: "/tiktok",
              followersLabel: "seguidores",
              color: "text-pink-500",
            }}
            Icon={TiktokIcon}
            followers={92341}
            growth={8920}
            growthText="este mês"
          />
        </div>

        {/* Instagram */}
        <div className="w-full">
          <PlatformCard
            platform={{
              name: "Instagram",
              path: "/instagram",
              followersLabel: "seguidores",
              color: "text-pink-400",
            }}
            Icon={InstagramIcon}
            followers={65420}
            growth={-1840}
            growthText="este mês"
          />
        </div>

        {/* Facebook */}
        <div className="w-full">
          <PlatformCard
            platform={{
              name: "Facebook",
              path: "/facebook",
              followersLabel: "seguidores",
              color: "text-blue-500",
            }}
            Icon={FacebookIcon}
            followers={48291}
            growth={320}
            growthText="este mês"
          />
        </div>
      </PlatformCardsContainer>

      {/* ===== SEÇÃO DE VÍDEOS MAIS VISTOS ===== */}
      <TopVideosSection />

      {/* ===== SEÇÃO DE INSIGHTS DE IA ===== */}
      <AIInsights />

      {/* ===== SEÇÃO DE UPLOADS RECENTES ===== */}
      <RecentUploads />
    </DashboardLayout>
  );
}
