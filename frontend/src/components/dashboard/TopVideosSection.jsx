// src/components/dashboard/TopVideosSection.jsx
import { useState, useEffect } from "react";
import YoutubeIcon from "@icons/YoutubeIcon";
import TiktokIcon from "@icons/TiktokIcon";
import InstagramIcon from "@icons/InstagramIcon";
import FacebookIcon from "@icons/FacebookIcon";
import {
  ExternalLink,
  PlayCircle,
  Film,
  Zap,
  Loader2,
  Clock,
} from "lucide-react";

// Configurações da API
const YOUTUBE_API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY ||
  "AIzaSyCtTFbHQ8BXdmGghYUH2_qu_3EsUi1f0SY";
const CHANNEL_ID =
  import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "UC0tkO3jaK3afLwV0lSEgwFQ";

// Função para buscar vídeos do YouTube
const fetchYouTubeVideos = async () => {
  try {
    // Buscar vídeos mais populares do canal
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=15&order=viewCount&type=video&key=${YOUTUBE_API_KEY}`
    );

    const videosData = await videosResponse.json();

    if (!videosData.items || videosData.items.length === 0) {
      return { topLongVideo: null, topShortVideo: null };
    }

    // Buscar estatísticas e duração
    const videoIds = videosData.items.map((item) => item.id.videoId).join(",");
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );

    const statsData = await statsResponse.json();

    // Processar vídeos
    const allVideos = videosData.items
      .map((item) => {
        const stats =
          statsData.items?.find((v) => v.id === item.id.videoId)?.statistics ||
          {};
        const duration =
          statsData.items?.find((v) => v.id === item.id.videoId)?.contentDetails
            ?.duration || "";

        // Detectar shorts (vídeos com menos de 100 segundos = 1:40)
        const durationInSeconds = parseDurationToSeconds(duration);
        const isShort = durationInSeconds < 100; // Menos de 1:40

        const views = parseInt(stats.viewCount || 0);
        const likes = parseInt(stats.likeCount || 0);
        const comments = parseInt(stats.commentCount || 0);
        const engagement =
          views > 0
            ? (((likes + comments) / views) * 100).toFixed(1) + "%"
            : "0%";

        return {
          id: item.id.videoId,
          platform: "YouTube",
          Icon: YoutubeIcon,
          color: "text-red-500",
          thumbnail:
            item.snippet.thumbnails?.high?.url ||
            item.snippet.thumbnails?.medium?.url ||
            `https://img.youtube.com/vi/${item.id.videoId}/mqdefault.jpg`,
          title: item.snippet.title,
          views: views,
          engagement: engagement,
          url: `https://youtu.be/${item.id.videoId}`,
          isShort: isShort,
          duration: formatDuration(durationInSeconds),
        };
      })
      .filter((video) => video.views > 0); // Filtrar vídeos com views

    // Separar vídeos longos e shorts
    const longVideos = allVideos.filter((video) => !video.isShort);
    const shortVideos = allVideos.filter((video) => video.isShort);

    // Pegar o top 1 de cada
    const topLongVideo =
      longVideos.sort((a, b) => b.views - a.views)[0] || null;
    const topShortVideo =
      shortVideos.sort((a, b) => b.views - a.views)[0] || null;

    return { topLongVideo, topShortVideo };
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);
    return { topLongVideo: null, topShortVideo: null };
  }
};

// Funções auxiliares para duração
const parseDurationToSeconds = (duration) => {
  if (!duration) return 0;

  // Formato ISO 8601: PT#H#M#S
  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) return 0;

  const hours = parseInt(matches[1] || 0);
  const minutes = parseInt(matches[2] || 0);
  const seconds = parseInt(matches[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
};

const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// Dados de exemplo para outras plataformas
const getPlatformVideos = () => {
  // TikTok
  const tiktokLongVideo = {
    id: "tiktok-long-1",
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=320&h=180&fit=crop",
    title: "Guia completo: Segurança digital para iniciantes",
    views: 285000,
    engagement: "18.5%",
    url: "#",
    isShort: false,
    duration: "3:45",
  };

  const tiktokShortVideo = {
    id: "tiktok-short-1",
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    thumbnail:
      "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=320&h=180&fit=crop",
    title: "⚠️ Erros de segurança que você comete",
    views: 1420000,
    engagement: "32.8%",
    url: "#",
    isShort: true,
    duration: "0:45",
  };

  // Instagram
  const instagramLongVideo = {
    id: "ig-long-1",
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    thumbnail:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=320&h=180&fit=crop",
    title: "Tutorial: Como configurar 2FA em todas suas contas",
    views: 89000,
    engagement: "22.1%",
    url: "#",
    isShort: false,
    duration: "4:20",
  };

  const instagramShortVideo = {
    id: "ig-short-1",
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    thumbnail:
      "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=320&h=180&fit=crop",
    title: "Dica rápida: Senhas fortes em 30 segundos",
    views: 256000,
    engagement: "28.3%",
    url: "#",
    isShort: true,
    duration: "0:30",
  };

  // Facebook
  const facebookLongVideo = {
    id: "fb-long-1",
    platform: "Facebook",
    Icon: FacebookIcon,
    color: "text-blue-500",
    thumbnail:
      "https://images.unsplash.com/photo-1611224885990-ab7363d5f1d9?w=320&h=180&fit=crop",
    title: "Live especial: Privacidade online em 2024",
    views: 67000,
    engagement: "15.7%",
    url: "#",
    isShort: false,
    duration: "58:30",
  };

  const facebookShortVideo = {
    id: "fb-short-1",
    platform: "Facebook",
    Icon: FacebookIcon,
    color: "text-blue-500",
    thumbnail:
      "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=320&h=180&fit=crop",
    title: "Clipes: Melhores momentos da live de segurança",
    views: 145000,
    engagement: "19.2%",
    url: "#",
    isShort: true,
    duration: "1:15",
  };

  return {
    tiktokLongVideo,
    tiktokShortVideo,
    instagramLongVideo,
    instagramShortVideo,
    facebookLongVideo,
    facebookShortVideo,
  };
};

const VideoCard = ({ video }) => (
  <div
    className="group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl overflow-hidden
                hover:border-cyan-500/50 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500
                hover:-translate-y-1 sm:hover:-translate-y-2"
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700"
        onError={(e) => {
          // Fallback para thumbnails quebradas
          if (video.platform === "YouTube") {
            e.target.src = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
          } else {
            e.target.src = `https://images.unsplash.com/photo-161${Math.floor(
              Math.random() * 1000000
            )}?w=320&h=180&fit=crop&q=80`;
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <PlayCircle className="w-10 h-10 sm:w-16 sm:h-16 text-white/90 drop-shadow-2xl" />
      </div>

      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 p-1.5 sm:p-2 bg-black/70 backdrop-blur-sm rounded-lg">
        <video.Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${video.color}`} />
      </div>

      {/* Badge de duração */}
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white border border-gray-600/50 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        <span>{video.duration}</span>
      </div>

      {/* Badge de Short */}
      {video.isShort && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/80 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold text-emerald-400 border border-emerald-500/50">
          SHORT
        </div>
      )}
    </div>

    <div className="p-3 sm:p-5">
      <div className="flex items-center gap-2 mb-2">
        <video.Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${video.color}`} />
        <span className="text-xs sm:text-sm text-gray-400">
          {video.platform}
        </span>
      </div>

      <h4 className="font-semibold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors text-sm sm:text-base leading-tight">
        {video.title}
      </h4>

      <div className="flex items-center justify-between mt-3 sm:mt-4 text-sm">
        <div>
          <p className="text-gray-400 text-xs sm:text-sm">Views</p>
          <p className="text-lg sm:text-xl font-bold text-white">
            {video.views > 1000000
              ? (video.views / 1000000).toFixed(1) + "M"
              : video.views > 1000
              ? (video.views / 1000).toFixed(1) + "K"
              : video.views.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs sm:text-sm">Engajamento</p>
          <p className="text-lg sm:text-xl font-bold text-emerald-400">
            {video.engagement}
          </p>
        </div>
      </div>

      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 sm:mt-5 w-full inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-all ${
          video.url === "#"
            ? "bg-gray-700/30 border border-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400"
        }`}
        onClick={(e) => video.url === "#" && e.preventDefault()}
      >
        {video.url === "#" ? "Em breve" : "Ver vídeo"}
        {video.url !== "#" && (
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        )}
      </a>
    </div>
  </div>
);

export default function TopVideosSection() {
  const [activeTab, setActiveTab] = useState("long");
  const [youtubeVideos, setYoutubeVideos] = useState({
    topLongVideo: null,
    topShortVideo: null,
    loading: true,
  });

  // Dados das outras plataformas
  const platformVideos = getPlatformVideos();

  useEffect(() => {
    const loadYouTubeVideos = async () => {
      setYoutubeVideos((prev) => ({ ...prev, loading: true }));

      try {
        const data = await fetchYouTubeVideos();
        setYoutubeVideos({
          topLongVideo: data.topLongVideo || getFallbackLongVideo(),
          topShortVideo: data.topShortVideo || getFallbackShortVideo(),
          loading: false,
        });
      } catch (error) {
        console.error("Erro ao carregar vídeos:", error);
        setYoutubeVideos({
          topLongVideo: getFallbackLongVideo(),
          topShortVideo: getFallbackShortVideo(),
          loading: false,
        });
      }
    };

    loadYouTubeVideos();
  }, []);

  // Fallback para YouTube
  const getFallbackLongVideo = () => ({
    id: "Y-I2sNGEOR4",
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/Y-I2sNGEOR4/mqdefault.jpg",
    title: "Como Instalar o Kali Linux na VirtualBox | Aula 01",
    views: 125400,
    engagement: "9.8%",
    url: "https://youtu.be/Y-I2sNGEOR4",
    isShort: false,
    duration: "25:30",
  });

  const getFallbackShortVideo = () => ({
    id: "M-g-ZSNbVNc",
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/M-g-ZSNbVNc/mqdefault.jpg",
    title: "Livros Proibidos de Hacking ⚔️",
    views: 2100000,
    engagement: "24.7%",
    url: "https://www.youtube.com/shorts/M-g-ZSNbVNc",
    isShort: true,
    duration: "0:58",
  });

  // Combinar vídeos baseado na tab ativa
  const getCurrentVideos = () => {
    if (activeTab === "long") {
      return [
        youtubeVideos.topLongVideo,
        platformVideos.tiktokLongVideo,
        platformVideos.instagramLongVideo,
        platformVideos.facebookLongVideo,
      ].filter((v) => v);
    } else {
      return [
        youtubeVideos.topShortVideo,
        platformVideos.tiktokShortVideo,
        platformVideos.instagramShortVideo,
        platformVideos.facebookShortVideo,
      ].filter((v) => v);
    }
  };

  const currentVideos = getCurrentVideos();

  return (
    <section className="mt-10 sm:mt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            {activeTab === "long"
              ? "Melhores Vídeos Longos"
              : "Melhores Shorts"}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            {activeTab === "long" ? "Vídeos > 1:40" : "Vídeos < 1:40"} • Todas
            as plataformas
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg sm:rounded-xl border border-gray-700/50 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("long")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all ${
              activeTab === "long"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Film className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Longos (+1:40)</span>
            <span className="xs:hidden">Longos</span>
          </button>
          <button
            onClick={() => setActiveTab("short")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all ${
              activeTab === "short"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Shorts (-1:40)</span>
            <span className="xs:hidden">Shorts</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {youtubeVideos.loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
            <p className="text-gray-400">Carregando vídeos do YouTube...</p>
          </div>
        </div>
      ) : (
        /* Grid - Scroll horizontal em mobile, grid em desktop */
        <div className="relative">
          {/* Grid para desktop */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {currentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* Scroll horizontal para mobile */}
          <div className="sm:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-4 min-w-max">
              {currentVideos.map((video) => (
                <div key={video.id} className="w-64 flex-shrink-0">
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          </div>

          {/* Legenda das plataformas */}
          <div className="mt-8 pt-6 border-t border-gray-700/30">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                📊 Dados em tempo real do YouTube • Outras plataformas em
                desenvolvimento
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-300">
                    YouTube (API Real)
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <span className="text-xs text-gray-300">
                    TikTok (Em breve)
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                  <span className="text-xs text-gray-300">
                    Instagram (Em breve)
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-gray-300">
                    Facebook (Em breve)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
