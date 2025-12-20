// src/components/insights/youtube/YouTubePerformance.jsx
import {
  TrendingUp,
  TrendingDown,
  Eye,
  ThumbsUp,
  MessageCircle,
  Zap,
  ChevronRight,
  PlayCircle,
  Image,
} from "lucide-react";
import { useState } from "react";

export default function YouTubePerformance() {
  const [activeTab, setActiveTab] = useState("top");

  const topVideos = [
    {
      title: "Hackeando o Algoritmo do YouTube em 2025",
      views: "215K",
      engagement: "9.8%",
      likes: "8.2K",
      comments: "1.4K",
      type: "vídeo",
      duration: "12:45",
      thumbnail: "🔥",
      trend: "+215%",
      category: "Tutorial",
    },
    {
      title: "Live: Invadindo a Deep Web",
      views: "148K",
      engagement: "8.7%",
      likes: "6.5K",
      comments: "890",
      type: "live",
      duration: "1:28:15",
      thumbnail: "🔴",
      trend: "+148%",
      category: "Live",
    },
    {
      title: "Como Instalar Kali Linux 2025",
      views: "98K",
      engagement: "8.1%",
      likes: "5.2K",
      comments: "720",
      type: "vídeo",
      duration: "8:32",
      thumbnail: "💻",
      trend: "+98%",
      category: "Tutorial",
    },
  ];

  const flopVideos = [
    {
      title: "Review de ferramenta antiga",
      views: "12K",
      engagement: "2.1%",
      likes: "450",
      comments: "65",
      type: "vídeo",
      duration: "6:15",
      thumbnail: "📦",
      trend: "-45%",
      category: "Review",
      reason: "Conteúdo desatualizado",
    },
    {
      title: "Vídeo sem thumbnail personalizada",
      views: "18K",
      engagement: "2.8%",
      likes: "620",
      comments: "92",
      type: "vídeo",
      duration: "10:20",
      thumbnail: "🖼️",
      trend: "-32%",
      category: "Tutorial",
      reason: "Thumbnail genérica",
    },
    {
      title: "Tutorial longo sem capítulos",
      views: "25K",
      engagement: "3.4%",
      likes: "850",
      comments: "120",
      type: "vídeo",
      duration: "24:45",
      thumbnail: "⏳",
      trend: "-28%",
      category: "Tutorial",
      reason: "Retenção baixa",
    },
  ];

  const videosToShow = activeTab === "top" ? topVideos : flopVideos;

  // Função de segurança para calcular largura da barra
  const calculateBarWidth = (engagement) => {
    const percentage = parseFloat(engagement);
    if (isNaN(percentage) || percentage < 0) return "0%";
    if (percentage > 20) return "100%";
    return `${percentage * 5}%`;
  };

  return (
    <div className="sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-red-500/20 rounded-lg">
                <TrendingUp className="w-4 h-4 text-red-400" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Performance YouTube
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Análise comparativa • Últimos 30 dias
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-800/60 rounded-lg">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">
                IA Ativa
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab("top")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "top"
                ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Top Performers</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("flop")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "flop"
                ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingDown className="w-4 h-4" />
              <span>Precisa Melhorar</span>
            </div>
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="space-y-3 sm:space-y-4">
        {videosToShow.map((video, i) => (
          <div
            key={i}
            className={`group relative rounded-xl sm:rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
              activeTab === "top"
                ? "bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-500/30 hover:border-emerald-500/50"
                : "bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30 hover:border-red-500/50"
            }`}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Thumbnail/Position */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2 ${
                    activeTab === "top"
                      ? "bg-emerald-500/20 border border-emerald-500/30"
                      : "bg-red-500/20 border border-red-500/30"
                  }`}
                >
                  {activeTab === "top" ? (
                    <span className="text-emerald-400 font-bold">#{i + 1}</span>
                  ) : (
                    <span className="text-red-400 font-bold">#{i + 1}</span>
                  )}
                </div>
                <div className="text-xs text-gray-400 bg-gray-800/60 px-2 py-1 rounded-full">
                  {video.thumbnail || "🎬"}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          activeTab === "top"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {video.category || "Geral"}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        {video.type || "vídeo"}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-white line-clamp-2 group-hover:text-emerald-300 transition-colors">
                      {video.title}
                    </h3>
                  </div>

                  {/* Trend Badge */}
                  <div
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      activeTab === "top"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {video.trend || "+0%"}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Views</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {video.views || "0"}
                    </p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Engaj.</span>
                    </div>
                    <p
                      className={`text-sm font-bold ${
                        activeTab === "top"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {video.engagement || "0%"}
                    </p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Likes</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {video.likes || "0"}
                    </p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Coment.</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {video.comments || "0"}
                    </p>
                  </div>
                </div>

                {/* Engagement Bar */}
                <div className="mt-3 mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">
                      Taxa de engajamento
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        activeTab === "top"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {video.engagement || "0%"}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        activeTab === "top" ? "bg-emerald-500" : "bg-red-500"
                      }`}
                      style={{ width: calculateBarWidth(video.engagement) }}
                    ></div>
                  </div>
                </div>

                {/* Reason for flop */}
                {activeTab === "flop" && video.reason && (
                  <div className="mt-3 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                    <p className="text-xs text-red-300">
                      <span className="font-medium">Possível causa:</span>{" "}
                      {video.reason}
                    </p>
                  </div>
                )}

                {/* Duration and Actions */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">
                    Duração: {video.duration || "0:00"}
                  </span>
                  <button className="text-xs text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1">
                    Ver análise completa
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-3 rounded-xl border border-emerald-500/20">
          <p className="text-xs text-gray-400 mb-1">Média Views</p>
          <p className="text-base font-bold text-emerald-400">
            {activeTab === "top" ? "154K" : "18K"}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20">
          <p className="text-xs text-gray-400 mb-1">Engajamento</p>
          <p
            className={`text-base font-bold ${
              activeTab === "top" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {activeTab === "top" ? "8.9%" : "2.8%"}
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-xl border border-purple-500/20">
          <p className="text-xs text-gray-400 mb-1">Duração média</p>
          <p className="text-sm font-medium text-purple-400">
            {activeTab === "top" ? "10:27" : "13:40"}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-3 rounded-xl border border-yellow-500/20">
          <p className="text-xs text-gray-400 mb-1">Categoria</p>
          <p className="text-sm font-medium text-yellow-400">
            {activeTab === "top" ? "Tutorial" : "Diversos"}
          </p>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="mt-6 sm:mt-8 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Dica da IA</h4>
            <p className="text-xs text-gray-400">
              {activeTab === "top"
                ? "Continue criando tutoriais! Este formato tem 3x mais retenção. Recomendo adicionar capítulos para melhor experiência."
                : "Vídeos acima de 15 minutos têm menor retenção. Considere dividir conteúdo longo em partes menores."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
