// src/components/dashboard/RecentUploads.jsx
import YoutubeIcon from "@icons/YoutubeIcon";
import TiktokIcon from "@icons/TiktokIcon";
import InstagramIcon from "@icons/InstagramIcon";
import FacebookIcon from "@icons/FacebookIcon";
import {
  Calendar,
  Eye,
  Zap,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Filter,
} from "lucide-react";
import { useState } from "react";

const recentUploads = [
  // YouTube - 2 vídeos
  {
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    date: "10/12",
    title: "Hackers Mais Perigosos da História",
    initialViews: 45600,
    status: "forte",
    type: "vídeo",
  },
  {
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    date: "08/12",
    title: "Instalar Kali Linux VirtualBox",
    initialViews: 67800,
    status: "forte",
    type: "vídeo",
  },
  // TikTok - 2 vídeos
  {
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    date: "09/12",
    title: "POV: Você entra no servidor errado",
    initialViews: 89000,
    status: "forte",
    type: "short",
  },
  {
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    date: "07/12",
    title: "Hackeando o algoritmo",
    initialViews: 120000,
    status: "forte",
    type: "short",
  },
  // Instagram - 2 vídeos
  {
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    date: "09/12",
    title: "Quando o firewall falha",
    initialViews: 34000,
    status: "médio",
    type: "reels",
  },
  {
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    date: "05/12",
    title: "Aesthetic cyberpunk",
    initialViews: 18000,
    status: "fraco",
    type: "reels",
  },
  // Facebook - 2 vídeos
  {
    platform: "Facebook",
    Icon: FacebookIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    date: "11/12",
    title: "Live: Q&A Segurança Digital",
    initialViews: 12500,
    status: "médio",
    type: "live",
  },
  {
    platform: "Facebook",
    Icon: FacebookIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    date: "04/12",
    title: "Tutorial Privacidade Online",
    initialViews: 8900,
    status: "fraco",
    type: "vídeo",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "forte":
      return {
        bg: "bg-emerald-500/20",
        text: "text-emerald-400",
        border: "border-emerald-500/50",
        icon: TrendingUp,
        label: "Forte",
      };
    case "médio":
      return {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-500/50",
        icon: TrendingUp,
        label: "Médio",
      };
    case "fraco":
      return {
        bg: "bg-red-500/20",
        text: "text-red-400",
        border: "border-red-500/50",
        icon: TrendingDown,
        label: "Fraco",
      };
    default:
      return {
        bg: "bg-gray-500/20",
        text: "text-gray-400",
        border: "border-gray-500/50",
        icon: TrendingUp,
        label: "Neutro",
      };
  }
};

const formatViews = (views) => {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(0) + "K";
  return views.toString();
};

const formatDate = (dateStr) => {
  return dateStr;
};

const getTypeIcon = (type) => {
  switch (type) {
    case "short":
    case "reels":
      return PlayCircle;
    case "live":
      return Sparkles;
    default:
      return Sparkles;
  }
};

export default function RecentUploads() {
  const [expanded, setExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");

  // Primeiro filtrar TODOS os itens pela plataforma
  const filteredAllUploads =
    activeFilter === "todos"
      ? recentUploads
      : recentUploads.filter((video) => {
          if (activeFilter === "youtube") return video.platform === "YouTube";
          if (activeFilter === "tiktok") return video.platform === "TikTok";
          if (activeFilter === "instagram")
            return video.platform === "Instagram";
          if (activeFilter === "facebook") return video.platform === "Facebook";
          return true;
        });

  // Depois aplicar o limite de expansão
  const displayedUploads = expanded
    ? filteredAllUploads
    : filteredAllUploads.slice(0, 4);

  return (
    <section className="mt-8 sm:mt-12 lg:mt-16">
      {/* Header Mobile Otimizado */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Uploads Recentes</h3>
            <p className="text-gray-400 text-xs mt-1">
              Últimos 7 dias • 2 por plataforma
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
            <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">IA</span>
          </div>
        </div>

        {/* Filtros rápidos para mobile - Scroll horizontal */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrar por:</span>
            </div>
            <span className="text-xs text-gray-500">
              {displayedUploads.length} itens
            </span>
          </div>

          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setActiveFilter("todos")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === "todos"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setActiveFilter("youtube")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeFilter === "youtube"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
                YouTube
              </button>
              <button
                onClick={() => setActiveFilter("tiktok")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeFilter === "tiktok"
                    ? "bg-pink-500/20 text-pink-400"
                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
              >
                <TiktokIcon className="w-3.5 h-3.5" />
                TikTok
              </button>
              <button
                onClick={() => setActiveFilter("instagram")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeFilter === "instagram"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                Instagram
              </button>
              <button
                onClick={() => setActiveFilter("facebook")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeFilter === "facebook"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-gray-800/50 text-gray-400 hover:text-white"
                }`}
              >
                <FacebookIcon className="w-3.5 h-3.5" />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards Otimizados */}
      <div className="space-y-3 pb-16">
        {displayedUploads.map((video, index) => {
          const statusStyle = getStatusStyle(video.status);
          const StatusIcon = statusStyle.icon;
          const TypeIcon = getTypeIcon(video.type);

          return (
            <div
              key={index}
              className={`bg-gray-800/60 backdrop-blur-sm border ${video.borderColor} rounded-xl p-3 group hover:bg-gray-800/80 transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                {/* Ícone da plataforma com tipo */}
                <div className="relative">
                  <div
                    className={`p-2 rounded-lg ${video.bgColor} border ${video.borderColor}`}
                  >
                    <video.Icon className={`w-5 h-5 ${video.color}`} />
                  </div>
                  {/* Badge do tipo */}
                  <div className="absolute -bottom-1 -right-1">
                    <div className="bg-gray-900 border border-gray-700 rounded-full p-0.5">
                      <TypeIcon className="w-3 h-3 text-gray-300" />
                    </div>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  {/* Primeira linha: Plataforma + Data + Status */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${video.color}`}>
                        {video.platform}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(video.date)}
                      </span>
                    </div>

                    {/* Status compacto */}
                    <div
                      className={`px-2 py-1 rounded-full flex items-center gap-1 ${statusStyle.bg} ${statusStyle.border}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      <span className={`text-xs font-bold ${statusStyle.text}`}>
                        {statusStyle.label}
                      </span>
                    </div>
                  </div>

                  {/* Título */}
                  <h4 className="text-sm font-medium text-white mb-2 line-clamp-2 leading-tight group-hover:text-cyan-300 transition-colors">
                    {video.title}
                  </h4>

                  {/* Stats na mesma linha */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Views */}
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 bg-gray-900/50 rounded">
                          <Eye className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Views</p>
                          <p className="text-sm font-bold text-white">
                            {formatViews(video.initialViews)}
                          </p>
                        </div>
                      </div>

                      {/* Tipo */}
                      <div className="h-8 w-px bg-gray-700/50"></div>

                      <div>
                        <p className="text-xs text-gray-400">Tipo</p>
                        <p className="text-xs font-medium text-gray-300 capitalize">
                          {video.type}
                        </p>
                      </div>
                    </div>

                    {/* Ícone de ação */}
                    <button className="p-1.5 rounded-lg bg-gray-900/30 hover:bg-gray-800 transition-colors">
                      <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão ver mais/menos - Só mostra se tiver mais de 4 itens no filtro atual */}
      {filteredAllUploads.length > 4 && (
        <div className="mb-16 mt-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full py-2.5 bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/50 rounded-xl text-cyan-400 font-medium flex items-center justify-center gap-2 transition-all group"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Mostrar menos</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>Ver mais uploads</span>
              </>
            )}
          </button>

          {/* Contador */}
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500">
              Mostrando {displayedUploads.length} de {filteredAllUploads.length}{" "}
              uploads
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
