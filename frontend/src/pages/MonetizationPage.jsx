// src/pages/MonetizationPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import {
  Youtube,
  Music,
  Instagram,
  Facebook,
  Euro,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const platforms = [
  {
    name: "YouTube",
    icon: Youtube,
    color: "bg-red-500",
    monetized: true,
    earnings: 320,
    change: "+12%",
    path: "/monetization/youtube",
  },
  {
    name: "TikTok",
    icon: Music,
    color: "bg-pink-500",
    monetized: true,
    earnings: 185,
    change: "+8%",
    path: "/monetization/tiktok",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-purple-500",
    monetized: false,
    earnings: 0,
    change: null,
    path: "/monetization/instagram",
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-500",
    monetized: false,
    earnings: 0,
    change: null,
    path: "/monetization/facebook",
  },
];

export default function MonetizationPage() {
  const [totalEarnings] = useState(505); // YouTube + TikTok

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 pb-16">
        {/* Cabeçalho compacto */}
        <div className="mb-6 md:mb-8 lg:mb-12">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Monetização
            </h1>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              <Euro className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-bold">
                €{totalEarnings}
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            Ganhos das suas plataformas nos últimos 30 dias
          </p>
        </div>

        {/* Resumo rápido - Mobile */}
        <div className="md:hidden mb-6 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400">Total ganho</p>
              <p className="text-xl font-bold text-white">€{totalEarnings}</p>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs">+10%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>2 plataformas ativas</span>
            <span>2 não monetizadas</span>
          </div>
        </div>

        {/* Cards das plataformas - Grid responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isMonetized = platform.monetized;

            return (
              <Link
                key={platform.name}
                to={platform.path}
                className={`group relative bg-gray-800/40 backdrop-blur-sm border rounded-xl md:rounded-2xl p-4 transition-all active:scale-[0.98] ${
                  isMonetized
                    ? "border-gray-700/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10"
                    : "border-gray-700/30 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="relative">
                  {/* Header compacto */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl ${platform.color} flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-white">
                          {platform.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isMonetized ? "bg-emerald-400" : "bg-red-400"
                            }`}
                          />
                          <span
                            className={`text-xs ${
                              isMonetized ? "text-emerald-400" : "text-red-400"
                            }`}
                          >
                            {isMonetized ? "Ativa" : "Inativa"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badge de mudança */}
                    {platform.change && (
                      <div className="flex items-center gap-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded text-xs">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">
                          {platform.change}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Ganhos */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                      <p className="text-2xl md:text-3xl font-bold text-white">
                        €{platform.earnings}
                      </p>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">
                      Últimos 30 dias
                    </p>
                  </div>

                  {/* Footer com ação */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
                    <span
                      className={`text-xs font-medium ${
                        isMonetized ? "text-cyan-400" : "text-gray-500"
                      }`}
                    >
                      {isMonetized ? "Ver detalhes" : "Ver requisitos"}
                    </span>
                    <div
                      className={`p-1 rounded-lg ${
                        isMonetized
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "bg-gray-700/50 text-gray-500"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5"
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
                </div>
              </Link>
            );
          })}
        </div>

        {/* Card de dica/ajuda - Mobile compacto */}
        <div className="mt-6 md:mt-8">
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/20 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white mb-1">
                  Como monetizar suas plataformas
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Plataformas não monetizadas precisam atender requisitos
                  específicos. Clique para ver detalhes e começar a ganhar.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[10px]">
                    YouTube: 1k inscritos
                  </span>
                  <span className="px-2 py-0.5 bg-pink-500/10 text-pink-400 rounded text-[10px]">
                    TikTok: 10k seguidores
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumo adicional para desktop */}
        <div className="hidden md:block mt-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total ganho</p>
              <p className="text-3xl font-bold text-white mt-1">
                €{totalEarnings}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Crescimento</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <p className="text-xl font-bold text-emerald-400">+10%</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Status</p>
              <div className="flex items-center justify-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-white text-sm">2 ativas</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-white text-sm">2 inativas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
