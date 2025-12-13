// src/pages/MonetizationPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { Youtube, Music, Instagram, Facebook, Euro } from "lucide-react";

const platforms = [
  {
    name: "YouTube",
    icon: Youtube,
    color: "from-red-500 to-pink-500",
    monetized: true,
    earnings: 320,
    path: "/monetization/youtube",
  },
  {
    name: "TikTok",
    icon: Music,
    color: "from-pink-500 to-purple-500",
    monetized: true,
    earnings: 185,
    path: "/monetization/tiktok",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "from-purple-500 to-orange-500",
    monetized: false,
    earnings: 0,
    path: "/monetization/instagram",
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "from-blue-500 to-cyan-500",
    monetized: false,
    earnings: 0,
    path: "/monetization/facebook",
  },
];

export default function MonetizationPage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Cabeçalho */}
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Monetização
          </h1>
          <p className="text-gray-400 text-xl">
            Visão geral dos ganhos em todas as suas plataformas
          </p>
        </div>

        {/* Cards das plataformas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isMonetized = platform.monetized;

            return (
              <Link
                key={platform.name}
                to={platform.path}
                className={`group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-${
                  isMonetized ? "emerald" : "gray"
                }-500/20 ${!isMonetized ? "opacity-70 grayscale" : ""}`}
              >
                {/* Gradiente de fundo sutil */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-10 rounded-3xl`}
                />

                <div className="relative z-10">
                  {/* Ícone da plataforma */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Nome e status */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {platform.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          isMonetized ? "bg-emerald-400" : "bg-red-400"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          isMonetized ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isMonetized ? "Monetizado" : "Não monetizado"}
                      </span>
                    </div>
                  </div>

                  {/* Ganhos */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Euro className="w-6 h-6 text-emerald-400" />
                      <p className="text-4xl font-bold text-white">
                        {isMonetized ? `€${platform.earnings}` : "€0"}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">Últimos 30 dias</p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-3 text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                    <span>Ver detalhes</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Dica final */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-lg">
            Clique em uma plataforma para ver os requisitos de monetização,
            histórico de ganhos e vídeos mais rentáveis.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
