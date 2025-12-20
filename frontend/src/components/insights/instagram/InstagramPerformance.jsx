// src/components/insights/instagram/InstagramPerformance.jsx
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Image,
  PlayCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function InstagramPerformance() {
  const [activeFormat, setActiveFormat] = useState("all");

  const topPosts = [
    {
      title: "Aesthetic cyberpunk que você pediu",
      reach: "456K",
      engagement: "18.9%",
      likes: "42.5K",
      comments: "3.8K",
      shares: "8.2K",
      format: "Reels",
      type: "Estético",
      saves: "12.4K",
      trend: "+456%",
      time: "há 2d",
    },
    {
      title: "Reel: Tutorial rápido de phishing",
      reach: "378K",
      engagement: "16.2%",
      likes: "35.8K",
      comments: "2.9K",
      shares: "6.5K",
      format: "Reels",
      type: "Tutorial",
      saves: "9.8K",
      trend: "+378%",
      time: "há 1d",
    },
    {
      title: "Carrossel: 10 ferramentas essenciais",
      reach: "285K",
      engagement: "14.1%",
      likes: "28.4K",
      comments: "2.1K",
      shares: "4.8K",
      format: "Carrossel",
      type: "Educativo",
      saves: "15.6K",
      trend: "+285%",
      time: "há 3d",
    },
  ];

  const flopPosts = [
    {
      title: "Post sem legenda longa",
      reach: "45K",
      engagement: "3.4%",
      likes: "3.8K",
      comments: "285",
      shares: "420",
      format: "Foto",
      type: "Post",
      saves: "850",
      trend: "-68%",
      time: "há 5d",
      reason: "Legenda curta, baixa conversação",
    },
    {
      title: "Imagem única sem carrossel",
      reach: "68K",
      engagement: "4.1%",
      likes: "5.2K",
      comments: "420",
      shares: "680",
      format: "Foto",
      type: "Post",
      saves: "1.2K",
      trend: "-54%",
      time: "há 4d",
      reason: "Formato único, sem carrossel",
    },
    {
      title: "Story sem interação",
      reach: "92K",
      engagement: "5.2%",
      likes: "6.8K",
      comments: "580",
      shares: "920",
      format: "Story",
      type: "Temporário",
      saves: "N/A",
      trend: "-42%",
      time: "há 1d",
      reason: "Falta de polls/stickers",
    },
  ];

  const postsToShow = activeFormat === "top" ? topPosts : flopPosts;
  const filteredPosts =
    activeFormat === "all"
      ? postsToShow
      : postsToShow.filter(
          (post) => post.format.toLowerCase() === activeFormat
        );

  return (
    <div className="sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Performance Instagram
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Análise por formato • Explore e Reels
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300">
                Explore Ativo
              </span>
            </div>
          </div>
        </div>

        {/* Format Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 mb-6">
          {["all", "reels", "carrossel", "foto", "story"].map((format) => (
            <button
              key={format}
              onClick={() => setActiveFormat(format)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeFormat === format
                  ? format === "all"
                    ? "bg-gray-700 text-white"
                    : format === "reels"
                    ? "bg-purple-500/20 text-purple-400"
                    : format === "carrossel"
                    ? "bg-pink-500/20 text-pink-400"
                    : format === "foto"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-orange-500/20 text-orange-400"
                  : "bg-gray-800/50 text-gray-400 hover:text-white"
              }`}
            >
              {format === "all" && "📊 Todos"}
              {format === "reels" && (
                <>
                  <PlayCircle className="w-3.5 h-3.5" /> Reels
                </>
              )}
              {format === "carrossel" && (
                <>
                  <Image className="w-3.5 h-3.5" /> Carrossel
                </>
              )}
              {format === "foto" && (
                <>
                  <Image className="w-3.5 h-3.5" /> Foto
                </>
              )}
              {format === "story" && (
                <>
                  <Zap className="w-3.5 h-3.5" /> Story
                </>
              )}
            </button>
          ))}
        </div>

        {/* Performance Tabs */}
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveFormat("all")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeFormat === "all"
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
            onClick={() => setActiveFormat("flop")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeFormat === "flop"
                ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400"
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

      {/* Posts Grid */}
      <div className="space-y-3 sm:space-y-4">
        {filteredPosts.map((post, i) => (
          <div
            key={i}
            className={`group relative rounded-xl sm:rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
              activeFormat === "all"
                ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 hover:border-purple-500/50"
                : "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30 hover:border-orange-500/50"
            }`}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Format Icon */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                    post.format === "Reels"
                      ? "bg-purple-500/20 border border-purple-500/30"
                      : post.format === "Carrossel"
                      ? "bg-pink-500/20 border border-pink-500/30"
                      : post.format === "Foto"
                      ? "bg-blue-500/20 border border-blue-500/30"
                      : "bg-orange-500/20 border border-orange-500/30"
                  }`}
                >
                  {post.format === "Reels" ? (
                    <PlayCircle className="w-6 h-6 text-purple-400" />
                  ) : post.format === "Carrossel" ? (
                    <Image className="w-6 h-6 text-pink-400" />
                  ) : post.format === "Foto" ? (
                    <Image className="w-6 h-6 text-blue-400" />
                  ) : (
                    <Zap className="w-6 h-6 text-orange-400" />
                  )}
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800/60 text-gray-300">
                  #{i + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          post.format === "Reels"
                            ? "bg-purple-500/20 text-purple-400"
                            : post.format === "Carrossel"
                            ? "bg-pink-500/20 text-pink-400"
                            : post.format === "Foto"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {post.format}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-800/60 px-2 py-1 rounded-full">
                        {post.type}
                      </span>
                      <span className="text-xs text-gray-400">{post.time}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {post.title}
                    </h3>
                  </div>

                  {/* Trend Badge */}
                  <div
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      activeFormat === "all"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-orange-500/20 text-orange-400"
                    }`}
                  >
                    {post.trend}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3">
                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Alcance</span>
                    </div>
                    <p className="text-sm font-bold text-white">{post.reach}</p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Heart className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Likes</span>
                    </div>
                    <p className="text-sm font-bold text-white">{post.likes}</p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Coment.</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {post.comments}
                    </p>
                  </div>

                  <div className="bg-gray-800/40 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Share2 className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-400">Salvos</span>
                    </div>
                    <p className="text-sm font-bold text-white">{post.saves}</p>
                  </div>
                </div>

                {/* Engagement Rate */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          activeFormat === "all"
                            ? "bg-emerald-500"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${parseFloat(post.engagement) * 5}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        activeFormat === "all"
                          ? "text-emerald-400"
                          : "text-orange-400"
                      }`}
                    >
                      {post.engagement}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    Taxa de engajamento
                  </span>
                </div>

                {/* Reason & Actions */}
                {activeFormat === "flop" && post.reason && (
                  <div className="mb-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <p className="text-xs text-orange-300">
                      <span className="font-medium">Sugestão IA:</span>{" "}
                      {post.reason}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-gray-800/60 hover:bg-gray-800 rounded-lg text-gray-300 text-sm font-medium transition-colors">
                    Ver detalhes
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeFormat === "all"
                        ? "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
                        : "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
                    }`}
                  >
                    {activeFormat === "all" ? "Repetir formato" : "Otimizar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 sm:mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-xl border border-purple-500/20">
            <p className="text-xs text-gray-400 mb-1">Média alcance</p>
            <p className="text-base font-bold text-purple-400">
              {activeFormat === "all" ? "373K" : "68K"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-3 rounded-xl border border-emerald-500/20">
            <p className="text-xs text-gray-400 mb-1">Engaj. médio</p>
            <p
              className={`text-base font-bold ${
                activeFormat === "all" ? "text-emerald-400" : "text-orange-400"
              }`}
            >
              {activeFormat === "all" ? "16.4%" : "4.2%"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 p-3 rounded-xl border border-pink-500/20">
            <p className="text-xs text-gray-400 mb-1">Formato top</p>
            <p className="text-sm font-medium text-pink-400">Reels</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20">
            <p className="text-xs text-gray-400 mb-1">Saves médios</p>
            <p className="text-sm font-medium text-blue-400">
              {activeFormat === "all" ? "12.6K" : "1.0K"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
