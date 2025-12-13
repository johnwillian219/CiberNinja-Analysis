// src/components/insights/general/InsightsHeader.jsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Youtube,
  Music, // TikTok (lucide tem "music" como melhor aproximação, ou usa svg custom se quiseres)
  Instagram,
  Facebook,
  Globe, // para "Todas as plataformas"
} from "lucide-react";

const platforms = [
  { value: "all", label: "Todas Plataformas", icon: Globe },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "tiktok", label: "TikTok", icon: Music },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "facebook", label: "Facebook", icon: Facebook },
];

export default function InsightsHeader({ selectedPlatform, onPlatformChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentPlatform =
    platforms.find((p) => p.value === selectedPlatform) || platforms[0];
  const Icon = currentPlatform.icon;

  return (
    <div className="text-center mb-16">
      {/* Título principal */}
      <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-6">
        Insights da Inteligência Artificial
      </h1>
      <p className="text-gray-400 text-xl max-w-4xl mx-auto mb-10">
        Análise avançada com recomendações personalizadas, padrões detectados e
        alertas em tempo real.
      </p>

      {/* Linha inferior: Status IA + Filtro de plataforma */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Status da IA */}
        <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/40 rounded-full">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-purple-300 font-bold">
            Katana IA v2 • Ativa
          </span>
        </div>

        {/* Filtro de plataforma ao lado */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-4 px-8 py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl text-white font-semibold hover:bg-gray-700 hover:border-gray-600 transition-all shadow-lg"
          >
            <Icon className="w-8 h-8" />
            <span className="text-lg">{currentPlatform.label}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-72 bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-30">
              {platforms.map((platform) => {
                const PlatIcon = platform.icon;
                return (
                  <button
                    key={platform.value}
                    onClick={() => {
                      onPlatformChange(platform.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-5 px-8 py-5 text-left text-white hover:bg-gray-700 transition-all ${
                      selectedPlatform === platform.value ? "bg-gray-700" : ""
                    }`}
                  >
                    <PlatIcon className="w-8 h-8" />
                    <span className="font-medium text-lg">
                      {platform.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Última análise */}
        <div className="flex items-center gap-2 text-emerald-400">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">
            Última análise: há poucos segundos
          </span>
        </div>
      </div>
    </div>
  );
}
