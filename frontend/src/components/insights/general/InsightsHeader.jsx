// src/components/insights/general/InsightsHeader.jsx
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Youtube, Music, Instagram, Facebook, Globe } from "lucide-react";

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

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="text-center mb-4 sm:mb-10 lg:mb-12 xl:mb-16">
      {/* Título principal */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-4 sm:mb-6">
        Insights Inteligência Artificial
      </h1>
      <p className="text-gray-400 text-center text-sm sm:text-base lg:text-lg xl:text-xl max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-4">
        Análise avançada.
      </p>

      {/* Mobile: Duas linhas */}
      <div className="lg:hidden">
        {/* Linha 1: Katana IA + Filtro lado a lado */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Status da IA */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/40 rounded-full">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 font-bold text-xs">
              Katana IA • Ativa
            </span>
          </div>

          {/* Filtro de plataforma */}
          <div className="relative flex-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl text-white font-semibold hover:bg-gray-700 hover:border-gray-600 transition-all shadow-lg w-full"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm flex-1 text-left">
                {currentPlatform.label === "Todas Plataformas"
                  ? "Plataformas"
                  : currentPlatform.label}
              </span>
              <ChevronDown
                className={`w-3 h-3 transition-transform flex-shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-30">
                {platforms.map((platform) => {
                  const PlatIcon = platform.icon;
                  return (
                    <button
                      key={platform.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlatformChange(platform.value);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-gray-700 transition-all ${
                        selectedPlatform === platform.value ? "bg-gray-700" : ""
                      }`}
                    >
                      <PlatIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="font-medium text-sm">
                        {platform.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Linha 2: Última análise centralizada */}
        <div className="flex items-center justify-center gap-1.5 text-emerald-400">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">
            Última análise: há poucos segundos
          </span>
        </div>
      </div>

      {/* Desktop: Mantido EXATAMENTE como estava */}
      <div className="hidden lg:flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8">
        {/* Status da IA */}
        <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/40 rounded-full">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse"></div>
          <span className="text-purple-300 font-bold text-xs sm:text-sm lg:text-base">
            Katana IA v2 • Ativa
          </span>
        </div>

        {/* Filtro de plataforma ao lado */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="flex items-center gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl sm:rounded-2xl text-white font-semibold hover:bg-gray-700 hover:border-gray-600 transition-all shadow-lg"
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
            <span className="text-sm sm:text-base lg:text-lg">
              <span className="lg:hidden">Plataforma</span>
              <span className="hidden lg:inline">{currentPlatform.label}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 sm:mt-3 lg:mt-4 left-1/2 -translate-x-1/2 w-56 sm:w-64 lg:w-72 bg-gray-800 border border-gray-700 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden z-30">
              {platforms.map((platform) => {
                const PlatIcon = platform.icon;
                return (
                  <button
                    key={platform.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlatformChange(platform.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 sm:gap-4 lg:gap-5 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-left text-white hover:bg-gray-700 transition-all ${
                      selectedPlatform === platform.value ? "bg-gray-700" : ""
                    }`}
                  >
                    <PlatIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                    <span className="font-medium text-sm sm:text-base lg:text-lg">
                      {platform.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Última análise */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium">
            Última análise: há poucos segundos
          </span>
        </div>
      </div>
    </div>
  );
}
