// src/components/facebook/FacebookVideosTable.jsx
import {
  PlayCircle,
  Filter,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  BarChart3,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";

const posts = [
  {
    title: "Dicas de segurança para iniciantes",
    reach: 215000,
    reactions: 35600,
    comments: 2890,
    shares: 8920,
    engagement: "7.4%",
    date: "10/12",
    status: "VIRAL",
    type: "Vídeo",
    duration: "5:42",
  },
  {
    title: "Live: Respondendo dúvidas de cibersegurança",
    reach: 178000,
    reactions: 28500,
    comments: 4200,
    shares: 5600,
    engagement: "8.9%",
    date: "09/12",
    status: "VIRAL",
    type: "Live",
    duration: "1:22:15",
  },
  {
    title: "Carrossel: 10 ferramentas essenciais",
    reach: 148000,
    reactions: 21800,
    comments: 1850,
    shares: 3200,
    engagement: "6.1%",
    date: "08/12",
    status: "FORTE",
    type: "Carrossel",
    duration: "-",
  },
  {
    title: "Meme do dia sobre hackers",
    reach: 82000,
    reactions: 12500,
    comments: 980,
    shares: 1850,
    engagement: "4.8%",
    date: "05/12",
    status: "MÉDIO",
    type: "Imagem",
    duration: "-",
  },
  {
    title: "Anúncio de novo curso",
    reach: 52000,
    reactions: 6800,
    comments: 420,
    shares: 920,
    engagement: "3.2%",
    date: "03/12",
    status: "FRACO",
    type: "Texto",
    duration: "-",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "VIRAL":
      return {
        bg: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
        text: "text-blue-300",
        border: "border-blue-500/40",
        glow: "shadow-blue-500/20",
      };
    case "FORTE":
      return {
        bg: "bg-gradient-to-r from-emerald-500/20 to-green-500/20",
        text: "text-emerald-300",
        border: "border-emerald-500/40",
        glow: "shadow-emerald-500/20",
      };
    case "MÉDIO":
      return {
        bg: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20",
        text: "text-yellow-300",
        border: "border-yellow-500/40",
        glow: "shadow-yellow-500/20",
      };
    case "FRACO":
      return {
        bg: "bg-gradient-to-r from-gray-500/20 to-gray-600/20",
        text: "text-gray-300",
        border: "border-gray-500/40",
        glow: "shadow-gray-500/20",
      };
    default:
      return {
        bg: "bg-gray-500/20",
        text: "text-gray-300",
        border: "border-gray-500/60",
        glow: "shadow-gray-500/20",
      };
  }
};

export default function FacebookVideosTable() {
  const [selectedFilter, setSelectedFilter] = useState("30d");
  const [expandedCard, setExpandedCard] = useState(null);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-10 lg:mb-12">
      {/* Cabeçalho */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 lg:mb-10 gap-4 sm:gap-6">
        <div className="text-center lg:text-left">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Publicações Recentes
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base mt-1">
            Últimos 30 dias • Ordenado por alcance
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700/80 backdrop-blur-sm rounded-xl sm:rounded-2xl text-gray-300 hover:bg-gray-600 hover:text-white transition-all text-sm sm:text-base w-full sm:w-auto">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Filtros</span>
            <span className="sm:hidden">Filtrar</span>
          </button>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700/80 backdrop-blur-sm rounded-xl sm:rounded-2xl text-white outline-none cursor-pointer hover:bg-gray-600 transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            <option value="30d">30 dias</option>
            <option value="7d">7 dias</option>
            <option value="all">Todos</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm font-medium border-b border-gray-700 pb-6">
              <th className="pb-6 pr-8">Publicação</th>
              <th className="pb-6 pr-8 text-center">Alcance</th>
              <th className="pb-6 pr-8 text-center">Reações</th>
              <th className="pb-6 pr-8 text-center">Comentários</th>
              <th className="pb-6 pr-8 text-center">Shares</th>
              <th className="pb-6 pr-8 text-center">Engajamento</th>
              <th className="pb-6 pr-8 text-center">Data</th>
              <th className="pb-6 text-center">Status IA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {posts.map((post, i) => (
              <tr
                key={i}
                className="hover:bg-gray-700/30 transition-all duration-200 group"
              >
                <td className="py-6 pr-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-12 lg:w-24 lg:h-14 bg-gray-700 rounded-lg lg:rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                        <PlayCircle className="w-8 h-8 lg:w-12 lg:h-12 text-gray-500" />
                      </div>
                      {post.type === "Live" && (
                        <span className="absolute bottom-1 right-1 bg-red-500/90 text-white text-xs px-1.5 py-0.5 rounded">
                          LIVE
                        </span>
                      )}
                    </div>
                    <div className="max-w-xs">
                      <p className="text-white font-medium text-sm lg:text-base leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors">
                        {post.title}
                      </p>
                      <p className="text-gray-500 text-xs lg:text-sm mt-1">
                        {post.type}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-6 text-center">
                  <p className="text-white font-bold text-base lg:text-lg">
                    {formatNumber(post.reach)}
                  </p>
                </td>

                <td className="py-6 text-center">
                  <p className="text-white font-medium">
                    {formatNumber(post.reactions)}
                  </p>
                </td>

                <td className="py-6 text-center">
                  <p className="text-white font-medium">
                    {formatNumber(post.comments)}
                  </p>
                </td>

                <td className="py-6 text-center">
                  <p className="text-white font-medium">
                    {formatNumber(post.shares)}
                  </p>
                </td>

                <td className="py-6 text-center">
                  <p className="text-emerald-400 font-bold text-base lg:text-lg">
                    {post.engagement}
                  </p>
                </td>

                <td className="py-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </td>

                <td className="py-6 text-center">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-xs font-bold border ${
                      getStatusStyle(post.status).border
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {posts.map((post, i) => {
          const statusStyle = getStatusStyle(post.status);
          const isExpanded = expandedCard === i;

          return (
            <div
              key={i}
              className={`bg-gray-800/50 border ${statusStyle.border} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${statusStyle.glow}`}
            >
              {/* Header - Visível sempre */}
              <div
                className="p-3 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedCard(isExpanded ? null : i)}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-9 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center overflow-hidden shadow">
                      <PlayCircle className="w-5 h-5 text-gray-400" />
                    </div>
                    {post.type === "Live" && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        L
                      </span>
                    )}
                    {post.duration !== "-" && (
                      <span className="absolute bottom-0.5 left-0.5 bg-black/80 text-white text-[10px] px-1 py-0.5 rounded">
                        {post.duration}
                      </span>
                    )}
                  </div>

                  {/* Post info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                      >
                        {post.status}
                      </span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="text-white font-medium text-sm leading-tight line-clamp-1">
                      {post.title}
                    </h3>
                  </div>
                </div>

                {/* Expand/collapse icon */}
                <div className="flex-shrink-0 ml-2">
                  <MoreVertical
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Expandable content */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-gray-700/50 animate-fadeIn">
                  {/* Stats grid */}
                  <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="text-center">
                      <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-lg">
                        <Eye className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-xs font-bold text-white">
                          {formatNumber(post.reach)}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          Alcance
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-lg">
                        <Heart className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-xs font-bold text-white">
                          {formatNumber(post.reactions)}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          Reações
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-lg">
                        <MessageCircle className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-xs font-bold text-white">
                          {formatNumber(post.comments)}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          Comentários
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex flex-col items-center p-2 bg-gray-900/50 rounded-lg">
                        <Share2 className="w-4 h-4 text-gray-400 mb-1" />
                        <span className="text-xs font-bold text-white">
                          {formatNumber(post.shares)}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          Shares
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Engajamento */}
                  <div className="mb-3">
                    <div className="flex flex-col items-center p-2 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                      <BarChart3 className="w-4 h-4 text-emerald-400 mb-1" />
                      <span className="text-xs font-bold text-emerald-400">
                        {post.engagement}
                      </span>
                      <span className="text-[10px] text-emerald-300/80 mt-0.5">
                        Engajamento
                      </span>
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Postado: {post.date}
                      </span>
                      <span>•</span>
                      <span>{post.type}</span>
                    </div>
                    <span className="text-blue-400 font-medium">
                      Ver detalhes →
                    </span>
                  </div>
                </div>
              )}

              {/* Quick stats bar (visible when collapsed) */}
              {!isExpanded && (
                <div className="px-3 pb-3 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-gray-300">
                        <Eye className="w-3 h-3" />
                        {formatNumber(post.reach)}
                      </span>
                      <span className="flex items-center gap-1 text-gray-300">
                        <Heart className="w-3 h-3" />
                        {formatNumber(post.reactions)}
                      </span>
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        {post.engagement}
                      </span>
                    </div>
                    <span className="text-blue-400 text-xs font-medium">
                      Ver →
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
