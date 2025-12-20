// src/pages/DashboardPage.jsx
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

export default function DashboardPage() {
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
          {" "}
          {/* wrapper para garantir tamanho consistente */}
          <PlatformCard
            platform={{
              name: "YouTube",
              path: "/youtube",
              followersLabel: "inscritos",
              color: "text-red-500",
            }}
            Icon={YoutubeIcon}
            followers={187542}
            growth={12480}
            growthText="este mês"
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
