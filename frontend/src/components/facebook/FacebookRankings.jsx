// src/components/facebook/FacebookRankings.jsx
import {
  TrendingUp,
  TrendingDown,
  Flame,
  Trophy,
  AlertTriangle,
  Eye,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const top5 = [
  {
    rank: 1,
    title: "Dicas de segurança para iniciantes",
    reach: "215K",
    change: "+89%",
    performance: "excelente",
  },
  {
    rank: 2,
    title: "Live: Respondendo dúvidas de cibersegurança",
    reach: "178K",
    change: "+124%",
    performance: "excelente",
  },
  {
    rank: 3,
    title: "Carrossel: 10 ferramentas essenciais",
    reach: "148K",
    change: "+67%",
    performance: "bom",
  },
  {
    rank: 4,
    title: "Meme do dia sobre hackers",
    reach: "82K",
    change: "+41%",
    performance: "bom",
  },
  {
    rank: 5,
    title: "Anúncio de novo curso",
    reach: "52K",
    change: "+28%",
    performance: "regular",
  },
];

const risingFast = [
  {
    title: "Live: Respondendo dúvidas de cibersegurança",
    growth: "+124%",
    reach: "178K",
  },
  {
    title: "Dicas de segurança para iniciantes",
    growth: "+89%",
    reach: "215K",
  },
  {
    title: "Carrossel: 10 ferramentas essenciais",
    growth: "+67%",
    reach: "148K",
  },
];

const needsAttention = [
  {
    title: "Post antigo sobre Windows XP",
    drop: "-72%",
    reason: "Conteúdo desatualizado",
  },
  {
    title: "Link externo sem imagem",
    drop: "-58%",
    reason: "Baixo alcance",
  },
  {
    title: "Texto muito longo sem quebras",
    drop: "-49%",
    reason: "Baixa retenção",
  },
];

const getPerformanceColor = (performance) => {
  switch (performance) {
    case "excelente":
      return "text-emerald-400";
    case "bom":
      return "text-cyan-400";
    case "regular":
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
};

const getPerformanceBg = (performance) => {
  switch (performance) {
    case "excelente":
      return "bg-emerald-500/20";
    case "bom":
      return "bg-cyan-500/20";
    case "regular":
      return "bg-yellow-500/20";
    default:
      return "bg-gray-500/20";
  }
};

export default function FacebookRankings() {
  const [activeTab, setActiveTab] = useState("top5");

  return (
    <div className="mt-8 sm:mt-12 lg:mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Destaques da Página
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Análise de performance das publicações
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="hidden sm:inline">Última atualização:</span>
          <span>Hoje</span>
        </div>
      </div>

      {/* Tabs para mobile */}
      <div className="lg:hidden">
        <div className="flex gap-2 mb-6 bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-xl border border-gray-700/50">
          <button
            onClick={() => setActiveTab("top5")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === "top5"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Trophy className="w-4 h-4" />
            Top
          </button>
          <button
            onClick={() => setActiveTab("rising")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === "rising"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Flame className="w-4 h-4" />
            Alta
          </button>
          <button
            onClick={() => setActiveTab("attention")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === "attention"
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            Atenção
          </button>
        </div>

        {/* Conteúdo mobile */}
        <div className="space-y-4">
          {activeTab === "top5" &&
            top5.map((video) => (
              <div
                key={video.rank}
                className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 group hover:bg-gray-800/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${getPerformanceBg(
                      video.performance
                    )} ${getPerformanceColor(video.performance)}`}
                  >
                    #{video.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {video.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.reach}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          video.change.startsWith("+")
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {video.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === "rising" &&
            risingFast.map((video, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-emerald-500/30 rounded-xl p-4 group hover:bg-gray-800/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm line-clamp-2">
                      {video.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {video.reach}
                      </span>
                      <span className="text-emerald-400 font-bold text-sm">
                        {video.growth}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {activeTab === "attention" &&
            needsAttention.map((video, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-yellow-500/30 rounded-xl p-4 group hover:bg-gray-800/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm line-clamp-2">
                      {video.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-400">
                        {video.reason}
                      </span>
                      <span className="text-red-400 font-bold text-sm">
                        {video.drop}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Cards para desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {/* TOP 5 */}
        <div className="bg-gray-800/70 border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Top 5 Semanal</h3>
          </div>
          <div className="space-y-4">
            {top5.map((video) => (
              <div
                key={video.rank}
                className="flex items-center gap-3 group hover:bg-gray-700/30 p-2 rounded-lg transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getPerformanceBg(
                    video.performance
                  )} ${getPerformanceColor(video.performance)}`}
                >
                  #{video.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm line-clamp-2 group-hover:text-blue-300 transition-colors">
                    {video.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.reach}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        video.change.startsWith("+")
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {video.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EM ALTA */}
        <div className="bg-gray-800/70 border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Em Alta</h3>
          </div>
          <div className="space-y-4">
            {risingFast.map((video, i) => (
              <div
                key={i}
                className="flex items-center gap-3 group hover:bg-gray-700/30 p-2 rounded-lg transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm line-clamp-2">
                    {video.title}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.reach}
                    </span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {video.growth}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATENÇÃO */}
        <div className="bg-gray-800/70 border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Precisa Atenção</h3>
          </div>
          <div className="space-y-4">
            {needsAttention.map((video, i) => (
              <div
                key={i}
                className="flex items-center gap-3 group hover:bg-gray-700/30 p-2 rounded-lg transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/50 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm line-clamp-2">
                    {video.title}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-400">
                      {video.reason}
                    </span>
                    <span className="text-red-400 font-bold text-sm">
                      {video.drop}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="mt-6 text-center">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 rounded-xl text-gray-300 hover:text-white text-sm font-medium transition-all">
          Ver ranking completo
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
