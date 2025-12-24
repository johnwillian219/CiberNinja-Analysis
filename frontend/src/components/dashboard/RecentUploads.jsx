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
  Loader2,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";

// Configurações da API
const YOUTUBE_API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY ||
  "AIzaSyCtTFbHQ8BXdmGghYUH2_qu_3EsUi1f0SY";
const CHANNEL_ID =
  import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "UC0tkO3jaK3afLwV0lSEgwFQ";

// Função para buscar vídeos recentes do YouTube
const fetchRecentYouTubeVideos = async () => {
  try {
    // Buscar vídeos mais recentes do canal (ordenados por data)
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&order=date&type=video&key=${YOUTUBE_API_KEY}`
    );

    const videosData = await videosResponse.json();

    if (!videosData.items || videosData.items.length === 0) {
      return [];
    }

    // Buscar estatísticas dos vídeos
    const videoIds = videosData.items.map((item) => item.id.videoId).join(",");
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );

    const statsData = await statsResponse.json();

    // Processar vídeos
    const recentVideos = videosData.items.slice(0, 2).map((item, index) => {
      const stats =
        statsData.items?.find((v) => v.id === item.id.videoId)?.statistics ||
        {};
      const duration =
        statsData.items?.find((v) => v.id === item.id.videoId)?.contentDetails
          ?.duration || "";

      // Calcular status baseado nas views
      const views = parseInt(stats.viewCount || 0);
      const durationInSeconds = parseDurationToSeconds(duration);
      const isShort = durationInSeconds < 100; // Menos de 1:40

      // Determinar status baseado nas views
      let status = "fraco";
      if (views > 10000) status = "forte";
      else if (views > 5000) status = "médio";

      // Formatar data (publicado há X dias)
      const publishedAt = new Date(item.snippet.publishedAt);
      const daysAgo = Math.floor(
        (new Date() - publishedAt) / (1000 * 60 * 60 * 24)
      );
      const dateStr =
        daysAgo === 0 ? "Hoje" : daysAgo === 1 ? "Ontem" : `${daysAgo}d`;

      return {
        platform: "YouTube",
        Icon: YoutubeIcon,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        date: dateStr,
        title: item.snippet.title,
        initialViews: views,
        status: status,
        type: isShort ? "short" : "vídeo",
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails?.default?.url,
        publishedAt: item.snippet.publishedAt,
        isYouTube: true,
        realData: true,
      };
    });

    return recentVideos;
  } catch (error) {
    console.error("Erro ao buscar vídeos recentes do YouTube:", error);
    return [];
  }
};

// Função para parse de duração
const parseDurationToSeconds = (duration) => {
  if (!duration) return 0;

  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return 0;

  const hours = parseInt(matches[1] || 0);
  const minutes = parseInt(matches[2] || 0);
  const seconds = parseInt(matches[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
};

// Dados de exemplo para outras plataformas
const getOtherPlatformVideos = () => [
  // TikTok - 2 vídeos
  {
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    date: "2d",
    title: "POV: Você entra no servidor errado",
    initialViews: 89000,
    status: "forte",
    type: "short",
    isYouTube: false,
    realData: false,
  },
  {
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    date: "4d",
    title: "Hackeando o algoritmo do TikTok",
    initialViews: 120000,
    status: "forte",
    type: "short",
    isYouTube: false,
    realData: false,
  },
  // Instagram - 2 vídeos
  {
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    date: "1d",
    title: "Quando o firewall falha",
    initialViews: 34000,
    status: "médio",
    type: "reels",
    isYouTube: false,
    realData: false,
  },
  {
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    date: "5d",
    title: "Aesthetic cyberpunk hacker",
    initialViews: 18000,
    status: "fraco",
    type: "reels",
    isYouTube: false,
    realData: false,
  },
  // Facebook - 2 vídeos
  {
    platform: "Facebook",
    Icon: FacebookIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    date: "Hoje",
    title: "Live: Q&A Segurança Digital 2024",
    initialViews: 12500,
    status: "médio",
    type: "live",
    isYouTube: false,
    realData: false,
  },
  {
    platform: "Facebook",
    Icon: FacebookIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    date: "6d",
    title: "Tutorial Privacidade Online",
    initialViews: 8900,
    status: "fraco",
    type: "vídeo",
    isYouTube: false,
    realData: false,
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
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar vídeos do YouTube
  useEffect(() => {
    const loadYouTubeVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const videos = await fetchRecentYouTubeVideos();
        setYoutubeVideos(videos);
      } catch (err) {
        console.error("Erro ao carregar vídeos do YouTube:", err);
        setError("Não foi possível carregar os vídeos do YouTube");
        // Usar dados de fallback para YouTube
        setYoutubeVideos([
          {
            platform: "YouTube",
            Icon: YoutubeIcon,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/30",
            date: "1d",
            title: "Hackers Mais Perigosos da História",
            initialViews: 45600,
            status: "forte",
            type: "vídeo",
            isYouTube: true,
            realData: false,
          },
          {
            platform: "YouTube",
            Icon: YoutubeIcon,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            borderColor: "border-red-500/30",
            date: "3d",
            title: "Instalar Kali Linux VirtualBox",
            initialViews: 67800,
            status: "forte",
            type: "vídeo",
            isYouTube: true,
            realData: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadYouTubeVideos();
  }, []);

  // Dados das outras plataformas
  const otherVideos = getOtherPlatformVideos();

  // Combinar todos os vídeos
  const allUploads = [...youtubeVideos, ...otherVideos];

  // Filtrar itens pela plataforma
  const filteredAllUploads =
    activeFilter === "todos"
      ? allUploads
      : allUploads.filter((video) => {
          if (activeFilter === "youtube") return video.platform === "YouTube";
          if (activeFilter === "tiktok") return video.platform === "TikTok";
          if (activeFilter === "instagram")
            return video.platform === "Instagram";
          if (activeFilter === "facebook") return video.platform === "Facebook";
          return true;
        });

  // Aplicar o limite de expansão
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
          <div className="flex items-center gap-2">
            {loading && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span className="text-xs font-medium text-cyan-400">Live</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">IA</span>
            </div>
          </div>
        </div>

        {/* Filtros rápidos */}
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
                YouTube {youtubeVideos.some((v) => v.realData) && "✓"}
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

      {/* Loading State */}
      {loading && activeFilter === "youtube" ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
            <p className="text-gray-400">Carregando uploads do YouTube...</p>
          </div>
        </div>
      ) : error && activeFilter === "youtube" ? (
        <div className="text-center py-8">
          <p className="text-red-400 text-sm mb-2">⚠️ {error}</p>
          <p className="text-gray-400 text-xs">Mostrando dados de exemplo</p>
        </div>
      ) : (
        /* Mobile Cards Otimizados */
        <div className="space-y-3 pb-16">
          {displayedUploads.map((video, index) => {
            const statusStyle = getStatusStyle(video.status);
            const StatusIcon = statusStyle.icon;
            const TypeIcon = getTypeIcon(video.type);

            return (
              <div
                key={index}
                className={`bg-gray-800/60 backdrop-blur-sm border ${
                  video.borderColor
                } rounded-xl p-3 group hover:bg-gray-800/80 transition-all duration-200 ${
                  video.isYouTube && video.realData
                    ? "border-l-4 border-l-red-500"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Ícone da plataforma com tipo */}
                  <div className="relative">
                    <div
                      className={`p-2 rounded-lg ${video.bgColor} border ${video.borderColor} relative`}
                    >
                      <video.Icon className={`w-5 h-5 ${video.color}`} />
                      {video.isYouTube && video.realData && (
                        <div className="absolute -top-1 -right-1">
                          <div className="bg-red-600 rounded-full p-0.5">
                            <Clock className="w-2.5 h-2.5 text-white" />
                          </div>
                        </div>
                      )}
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
                          {video.date}
                          {video.isYouTube && video.realData && (
                            <span className="text-red-400 text-xs">• Live</span>
                          )}
                        </span>
                      </div>

                      {/* Status compacto */}
                      <div
                        className={`px-2 py-1 rounded-full flex items-center gap-1 ${statusStyle.bg} ${statusStyle.border}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span
                          className={`text-xs font-bold ${statusStyle.text}`}
                        >
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>

                    {/* Título */}
                    <h4 className="text-sm font-medium text-white mb-2 line-clamp-2 leading-tight group-hover:text-cyan-300 transition-colors">
                      {video.title}
                      {video.isYouTube && video.realData && (
                        <span className="ml-1 text-xs text-red-400">✓</span>
                      )}
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
      )}

      {/* Botão ver mais/menos */}
      {filteredAllUploads.length > 4 && !loading && (
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

          {/* Contador e status */}
          <div className="text-center mt-2 space-y-1">
            <span className="text-xs text-gray-500">
              Mostrando {displayedUploads.length} de {filteredAllUploads.length}{" "}
              uploads
            </span>
            {youtubeVideos.some((v) => v.realData) && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs text-red-400">
                  YouTube: Dados em tempo real
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
