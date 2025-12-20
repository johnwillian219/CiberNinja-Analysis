// src/components/insights/tiktok/TikTokPerformance.jsx
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Zap,
  Music,
  Timer,
  Flame,
} from "lucide-react";
import { useState } from "react";

export default function TikTokPerformance() {
  const [activeTab, setActiveTab] = useState("top");

  const topVideos = [
    {
      title: "POV: Você entra no servidor errado",
      views: "2.1M",
      engagement: "18.4%",
      likes: "245K",
      comments: "18.2K",
      shares: "45K",
      type: "POV",
      duration: "15s",
      audio: "Trending",
      sound: "🔥 Cyberbeat",
      trend: "Viral",
    },
    {
      title: "Quando o beat dropa e vira meme",
      views: "1.6M",
      engagement: "16.2%",
      likes: "198K",
      comments: "14.5K",
      shares: "32K",
      type: "Meme",
      duration: "9s",
      audio: "Original",
      sound: "🎵 Original",
      trend: "+1.6M",
    },
    {
      title: "Hackeando o algoritmo em 15 segundos",
      views: "1.2M",
      engagement: "14.8%",
      likes: "168K",
      comments: "12.8K",
      shares: "28K",
      type: "Tutorial",
      duration: "21s",
      audio: "Trending",
      sound: "⚡ Tech Hop",
      trend: "+1.2M",
    },
  ];

  const flopVideos = [
    {
      title: "Vídeo longo sem hook",
      views: "98K",
      engagement: "4.2%",
      likes: "8.2K",
      comments: "450",
      shares: "980",
      type: "Vídeo",
      duration: "58s",
      audio: "Popular",
      sound: "🎧 Lo-Fi",
      trend: "-62%",
      reason: "Retenção baixa após 3s",
    },
    {
      title: "Post com texto excessivo",
      views: "145K",
      engagement: "5.1%",
      likes: "12.5K",
      comments: "680",
      shares: "1.2K",
      type: "Text",
      duration: "12s",
      audio: "Trending",
      sound: "📝 Speech",
      trend: "-41%",
      reason: "Muito texto, pouco visual",
    },
    {
      title: "Vídeo sem música trending",
      views: "210K",
      engagement: "6.3%",
      likes: "18.5K",
      comments: "920",
      shares: "2.1K",
      type: "Tutorial",
      duration: "18s",
      audio: "Original",
      sound: "🎼 Sem áudio",
      trend: "-33%",
      reason: "Áudio não otimizado",
    },
  ];

  const videosToShow = activeTab === "top" ? topVideos : flopVideos;

  return (
    <div className="sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg">
                <Flame className="w-4 h-4 text-pink-400" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Performance TikTok
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Análise viral • Últimas 72 horas
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-lg">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300">
                Viral Ativo
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
                ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-4 h-4" />
              <span>Conteúdo Viral</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("flop")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "flop"
                ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingDown className="w-4 h-4" />
              <span>Baixo Alcance</span>
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
                ? "bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/30 hover:border-pink-500/50"
                : "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30 hover:border-orange-500/50"
            }`}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Position Badge */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                    activeTab === "top"
                      ? "bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-pink-500/40"
                      : "bg-gradient-to-br from-orange-500/30 to-red-500/30 border border-orange-500/40"
                  }`}
                >
                  {activeTab === "top" && i === 0 ? (
                    <Flame className="w-6 h-6 text-pink-400 animate-pulse" />
                  ) : (
                    <span
                      className={`text-xl font-bold ${
                        activeTab === "top"
                          ? "text-pink-400"
                          : "text-orange-400"
                      }`}
                    >
                      #{i + 1}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 bg-gray-800/60 px-2 py-1 rounded-full flex items-center gap-1">
                  <Timer className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          activeTab === "top"
                            ? "bg-pink-500/20 text-pink-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {video.type}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Music className="w-3 h-3" />
                        {video.audio}
                      </span>
                      <span className="text-xs text-gray-400">
                        {video.sound}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-white line-clamp-2 group-hover:text-pink-300 transition-colors">
                      {video.title}
                    </h3>
                  </div>

                  {/* Trend Badge */}
                  <div
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      activeTab === "top"
                        ? "bg-pink-500/20 text-pink-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {video.trend}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-3">
                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Views</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {video.views}
                    </p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Heart className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Likes</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {video.likes}
                    </p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Coment.</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {video.comments}
                    </p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Share2 className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Shares</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {video.shares}
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
                          ? "text-pink-400"
                          : "text-orange-400"
                      }`}
                    >
                      {video.engagement}
                    </p>
                  </div>
                </div>

                {/* Reason & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-700/30">
                  {activeTab === "flop" && video.reason && (
                    <div className="flex-1">
                      <p className="text-xs text-orange-300">
                        <span className="font-medium">Análise IA:</span>{" "}
                        {video.reason}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-gray-800/60 hover:bg-gray-800 rounded-lg text-gray-300 text-xs font-medium transition-colors">
                      Ver análise
                    </button>
                    <button
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        activeTab === "top"
                          ? "bg-pink-500/20 hover:bg-pink-500/30 text-pink-400"
                          : "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
                      }`}
                    >
                      {activeTab === "top" ? "Repetir fórmula" : "Otimizar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 sm:mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-3 rounded-xl border border-pink-500/20">
            <p className="text-xs text-gray-400 mb-1">Vídeos virais</p>
            <p className="text-base font-bold text-pink-400">3</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-3 rounded-xl border border-emerald-500/20">
            <p className="text-xs text-gray-400 mb-1">Engaj. médio</p>
            <p
              className={`text-base font-bold ${
                activeTab === "top" ? "text-emerald-400" : "text-orange-400"
              }`}
            >
              {activeTab === "top" ? "16.5%" : "5.2%"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20">
            <p className="text-xs text-gray-400 mb-1">Duração ideal</p>
            <p className="text-sm font-medium text-blue-400">15-21s</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 p-3 rounded-xl border border-purple-500/20">
            <p className="text-xs text-gray-400 mb-1">Áudio trending</p>
            <p className="text-sm font-medium text-purple-400">67%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
