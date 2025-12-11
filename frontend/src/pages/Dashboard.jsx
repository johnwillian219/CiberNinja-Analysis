// src/pages/DashboardPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import PlatformCard from "../components/dashboard/PlatformCard";
import TopVideosSection from "../components/dashboard/TopVideosSection";
import AIInsights from "../components/dashboard/AIInsights";

import YoutubeIcon from "@icons/YoutubeIcon";
import TiktokIcon from "@icons/TiktokIcon";
import InstagramIcon from "@icons/InstagramIcon";
import FacebookIcon from "@icons/FacebookIcon";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* ===== BOAS-VINDAS ===== */}
      <div className="mb-10">
        <h2 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Bem-vindo de volta, CiberNinja!
        </h2>
        <p className="text-gray-400 text-lg">
          Aqui está a visão geral das suas redes sociais nos últimos 30 dias.
        </p>
      </div>
      {/* ===== CARDS DAS PLATAFORMAS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {/* YouTube */}
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

        {/* TikTok */}
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

        {/* Instagram */}
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

        {/* Facebook */}
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
      {/* ===== SEÇÃO DE VÍDEOS MAIS VISTOS ===== */}
      <TopVideosSection />
      {/* ===== SEÇÃO DE INSIGHTS DE IA ===== */}
      <AIInsights />;
    </DashboardLayout>
  );
}
