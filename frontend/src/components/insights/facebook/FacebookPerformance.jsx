// src/components/insights/facebook/FacebookPerformance.jsx
import {
  TrendingUp,
  TrendingDown,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Users,
  Video,
  Link,
  Zap,
  Image,
} from "lucide-react";
import { useState } from "react";

export default function FacebookPerformance() {
  const [activeTab, setActiveTab] = useState("top");

  const topPosts = [
    {
      title: "Dicas de segurança para iniciantes",
      reach: "215K",
      engagement: "12.8%",
      reactions: "18.5K",
      comments: "2.4K",
      shares: "4.2K",
      format: "Post",
      type: "Educativo",
      clicks: "8.5K",
      trend: "+215%",
      time: "há 3d",
    },
    {
      title: "Live: Respondendo dúvidas de cibersegurança",
      reach: "178K",
      engagement: "11.2%",
      reactions: "15.2K",
      comments: "3.8K",
      shares: "2.8K",
      format: "Live",
      type: "Interativo",
      clicks: "6.2K",
      trend: "+178%",
      time: "há 1d",
    },
    {
      title: "Meme do dia sobre hackers",
      reach: "148K",
      engagement: "9.8%",
      reactions: "12.8K",
      comments: "1.5K",
      shares: "3.5K",
      format: "Imagem",
      type: "Entretenimento",
      clicks: "4.8K",
      trend: "+148%",
      time: "há 2d",
    },
  ];

  const flopPosts = [
    {
      title: "Link externo sem imagem",
      reach: "28K",
      engagement: "2.9%",
      reactions: "2.4K",
      comments: "185",
      shares: "420",
      format: "Link",
      type: "Externo",
      clicks: "850",
      trend: "-72%",
      time: "há 5d",
      reason: "Falta de imagem destacada",
    },
    {
      title: "Post apenas com texto longo",
      reach: "35K",
      engagement: "3.4%",
      reactions: "3.1K",
      comments: "280",
      shares: "520",
      format: "Texto",
      type: "Informativo",
      clicks: "1.2K",
      trend: "-65%",
      time: "há 4d",
      reason: "Texto muito longo, sem formatação",
    },
    {
      title: "Anúncio sem botão claro",
      reach: "42K",
      engagement: "4.1%",
      reactions: "3.8K",
      comments: "320",
      shares: "680",
      format: "Anúncio",
      type: "Promocional",
      clicks: "980",
      trend: "-58%",
      time: "há 3d",
      reason: "Chamada para ação fraca",
    },
  ];

  const postsToShow = activeTab === "top" ? topPosts : flopPosts;

  // Função para obter ícone baseado no formato
  const getFormatIcon = (format) => {
    switch (format) {
      case "Live":
        return <Video className="w-6 h-6 text-red-400" />;
      case "Post":
        return <Zap className="w-6 h-6 text-blue-400" />;
      case "Imagem":
        return <Image className="w-6 h-6 text-green-400" />;
      case "Link":
        return <Link className="w-6 h-6 text-purple-400" />;
      case "Texto":
        return <MessageCircle className="w-6 h-6 text-gray-400" />;
      case "Anúncio":
        return <Zap className="w-6 h-6 text-yellow-400" />;
      default:
        return <Zap className="w-6 h-6 text-blue-400" />;
    }
  };

  // Função para obter classes de cor baseadas no formato
  const getFormatColor = (format) => {
    switch (format) {
      case "Live":
        return {
          bg: "bg-red-500/20",
          border: "border-red-500/30",
          text: "text-red-400",
        };
      case "Post":
        return {
          bg: "bg-blue-500/20",
          border: "border-blue-500/30",
          text: "text-blue-400",
        };
      case "Imagem":
        return {
          bg: "bg-green-500/20",
          border: "border-green-500/30",
          text: "text-green-400",
        };
      case "Link":
        return {
          bg: "bg-purple-500/20",
          border: "border-purple-500/30",
          text: "text-purple-400",
        };
      case "Texto":
        return {
          bg: "bg-gray-500/20",
          border: "border-gray-500/30",
          text: "text-gray-400",
        };
      case "Anúncio":
        return {
          bg: "bg-yellow-500/20",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
        };
      default:
        return {
          bg: "bg-blue-500/20",
          border: "border-blue-500/30",
          text: "text-blue-400",
        };
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Performance Facebook
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Alcance orgânico • Engajamento por tipo
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300">
                Feed Ativo
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
              <span>Alto Alcance</span>
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
              <span>Baixa Interação</span>
            </div>
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="space-y-3 sm:space-y-4">
        {postsToShow.map((post, i) => {
          const formatColor = getFormatColor(post.format);

          return (
            <div
              key={i}
              className={`group relative rounded-xl sm:rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
                activeTab === "top"
                  ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30 hover:border-blue-500/50"
                  : "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30 hover:border-orange-500/50"
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Format Badge */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${formatColor.bg} ${formatColor.border}`}
                  >
                    {getFormatIcon(post.format)}
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
                          className={`text-xs font-bold px-2 py-1 rounded-full ${formatColor.bg} ${formatColor.text}`}
                        >
                          {post.format}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-800/60 px-2 py-1 rounded-full">
                          {post.type}
                        </span>
                        <span className="text-xs text-gray-400">
                          {post.time}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-medium text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </h3>
                    </div>

                    {/* Trend Badge */}
                    <div
                      className={`px-3 py-1.5 rounded-lg font-bold ${
                        activeTab === "top"
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
                      <p className="text-sm font-bold text-white">
                        {post.reach}
                      </p>
                    </div>

                    <div className="bg-gray-800/40 p-2 rounded-lg">
                      <div className="flex items-center gap-1.5 mb-1">
                        <ThumbsUp className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-400">Reações</span>
                      </div>
                      <p className="text-sm font-bold text-white">
                        {post.reactions}
                      </p>
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
                        <span className="text-xs text-gray-400">Compart.</span>
                      </div>
                      <p className="text-sm font-bold text-white">
                        {post.shares}
                      </p>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-xs text-gray-400">
                          Engajamento:
                        </span>
                        <span
                          className={`text-xs font-bold ${
                            activeTab === "top"
                              ? "text-emerald-400"
                              : "text-orange-400"
                          }`}
                        >
                          {post.engagement}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="text-xs text-gray-400">Cliques:</span>
                        <span className="text-xs font-bold text-white">
                          {post.clicks}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reason for flop */}
                  {activeTab === "flop" && post.reason && (
                    <div className="mb-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <p className="text-xs text-orange-300">
                        <span className="font-medium">Análise IA:</span>{" "}
                        {post.reason}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-gray-800/60 hover:bg-gray-800 rounded-lg text-gray-300 text-sm font-medium transition-colors">
                      Ver insights
                    </button>
                    <button
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === "top"
                          ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                          : "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
                      }`}
                    >
                      {activeTab === "top" ? "Repetir formato" : "Corrigir"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 sm:mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20">
            <p className="text-xs text-gray-400 mb-1">Alcance médio</p>
            <p className="text-base font-bold text-blue-400">
              {activeTab === "top" ? "180K" : "35K"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-3 rounded-xl border border-emerald-500/20">
            <p className="text-xs text-gray-400 mb-1">Engaj. médio</p>
            <p
              className={`text-base font-bold ${
                activeTab === "top" ? "text-emerald-400" : "text-orange-400"
              }`}
            >
              {activeTab === "top" ? "11.3%" : "3.5%"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-xl border border-purple-500/20">
            <p className="text-xs text-gray-400 mb-1">Formato top</p>
            <p className="text-sm font-medium text-purple-400">
              {activeTab === "top" ? "Post/Live" : "Link/Texto"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-3 rounded-xl border border-red-500/20">
            <p className="text-xs text-gray-400 mb-1">Taxa cliques</p>
            <p className="text-sm font-medium text-red-400">
              {activeTab === "top" ? "4.5%" : "2.8%"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
