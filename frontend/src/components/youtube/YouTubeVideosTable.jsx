// src/components/youtube/YouTubeVideosTable.jsx
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  PlayCircle,
  Eye,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BarChart3,
  Clock,
  Calendar,
  Video,
  Film,
  Sparkles,
} from "lucide-react";

// Configurações
const YOUTUBE_API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY ||
  "AIzaSyCtTFbHQ8BXdmGghYUH2_qu_3EsUi1f0SY";
const CHANNEL_ID =
  import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "UC0tkO3jaK3afLwV0lSEgwFQ";
const MAX_VIDEOS_DISPLAY = 5;

const ENGAGEMENT_THRESHOLDS = {
  VIRAL: 10,
  FORTE: 5,
  MEDIO: 2,
};

const STATUS_STYLES = {
  SEM_DADOS: {
    status: "SEM DADOS",
    text: "text-gray-400",
    bg: "bg-gray-700/50",
    border: "border-gray-600/40",
    icon: AlertCircle,
  },
  VIRAL: {
    status: "VIRAL",
    text: "text-red-300",
    bg: "bg-red-500/20",
    border: "border-red-500/40",
    icon: Sparkles,
  },
  FORTE: {
    status: "FORTE",
    text: "text-emerald-300",
    bg: "bg-emerald-500/20",
    border: "border-emerald-500/40",
    icon: TrendingUp,
  },
  MEDIO: {
    status: "MÉDIO",
    text: "text-yellow-300",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/40",
    icon: BarChart3,
  },
  BAIXO: {
    status: "BAIXO",
    text: "text-gray-300",
    bg: "bg-gray-600/20",
    border: "border-gray-500/40",
    icon: BarChart3,
  },
};

const getStatusStyle = (views, likes, comments) => {
  if (!views || views === 0) return STATUS_STYLES.SEM_DADOS;

  const engagement = ((likes + comments) / views) * 100;

  if (engagement > ENGAGEMENT_THRESHOLDS.VIRAL) return STATUS_STYLES.VIRAL;
  if (engagement > ENGAGEMENT_THRESHOLDS.FORTE) return STATUS_STYLES.FORTE;
  if (engagement > ENGAGEMENT_THRESHOLDS.MEDIO) return STATUS_STYLES.MEDIO;
  return STATUS_STYLES.BAIXO;
};

const formatNumber = (num) => {
  if (!num && num !== 0) return "0";
  const numValue = Number(num);

  if (numValue >= 1000000000) return `${(numValue / 1000000000).toFixed(1)}B`;
  if (numValue >= 1000000) return `${(numValue / 1000000).toFixed(1)}M`;
  if (numValue >= 1000) return `${(numValue / 1000).toFixed(1)}K`;
  return numValue.toString();
};

const formatDuration = (isoDuration) => {
  if (!isoDuration || typeof isoDuration !== "string") return "0:00";

  try {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = isoDuration.match(regex);

    if (!match) return "0:00";

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  } catch (error) {
    console.error("Erro ao formatar duração:", isoDuration, error);
    return "0:00";
  }
};

const getVideoType = (duration) => {
  if (!duration || typeof duration !== "string") return "Vídeo";

  try {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = duration.match(regex);

    if (!match) return "Vídeo";

    const hours = parseInt(match[1] || "0", 10);
    const minutes = parseInt(match[2] || "0", 10);
    const seconds = parseInt(match[3] || "0", 10);

    if (hours === 0 && minutes === 0 && seconds <= 60) {
      return "Short";
    }

    if (hours > 0 || minutes > 20) {
      return "Longo";
    }

    return "Vídeo";
  } catch (error) {
    return "Vídeo";
  }
};

const StatusBadge = ({ status, text, bg, border, icon: Icon }) => (
  <div
    className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${bg} ${text} ${border}`}
  >
    <Icon className="w-3 h-3" />
    <span>{status}</span>
  </div>
);

const CompactStat = ({ icon: Icon, value, label, color = "text-gray-300" }) => (
  <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-700/30 rounded-lg">
    <Icon className={`w-3.5 h-3.5 ${color}`} />
    <div className="flex flex-col">
      <span className="text-xs font-bold text-white">{value}</span>
      <span className="text-[10px] text-gray-400 -mt-0.5">{label}</span>
    </div>
  </div>
);

export default function YouTubeVideosTable() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "publishedAt",
    direction: "desc",
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [channelStats, setChannelStats] = useState({
    totalViews: 0,
    avgEngagement: 0,
    totalVideos: 0,
  });
  const [showAllVideos, setShowAllVideos] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar dados do canal
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
      );
      const channelData = await channelResponse.json();

      if (!channelData.items?.length) {
        throw new Error("Canal não encontrado");
      }

      const channel = channelData.items[0];
      const channelStatsData = channel.statistics || {};

      // Buscar vídeos do canal
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=15&order=date&type=video&key=${YOUTUBE_API_KEY}`
      );
      const videosData = await videosResponse.json();

      const videoIds =
        videosData.items?.map((item) => item.id?.videoId).filter(Boolean) || [];

      if (videoIds.length === 0) {
        throw new Error("Nenhum vídeo encontrado no canal");
      }

      // Buscar estatísticas dos vídeos
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet&id=${videoIds.join(
          ","
        )}&key=${YOUTUBE_API_KEY}`
      );
      const statsData = await statsResponse.json();

      // Processar vídeos
      const processedVideos =
        statsData.items?.map((item) => {
          const statistics = item.statistics || {};
          const contentDetails = item.contentDetails || {};
          const snippet = item.snippet || {};

          const views = parseInt(statistics.viewCount || 0);
          const likes = parseInt(statistics.likeCount || 0);
          const comments = parseInt(statistics.commentCount || 0);
          const engagement = views > 0 ? ((likes + comments) / views) * 100 : 0;

          const status = getStatusStyle(views, likes, comments);
          const publishedAt = new Date(snippet.publishedAt);
          const videoType = getVideoType(contentDetails.duration);

          return {
            id: item.id,
            title: snippet.title,
            thumbnail:
              snippet.thumbnails?.medium?.url ||
              snippet.thumbnails?.default?.url,
            duration: formatDuration(contentDetails.duration),
            publishedAt: snippet.publishedAt,
            date: publishedAt.toLocaleDateString("pt-BR"),
            shortDate: publishedAt.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
            }),
            views,
            likes,
            comments,
            engagement: Number(engagement.toFixed(1)),
            engagementFormatted: `${engagement.toFixed(1)}%`,
            ...status,
            type: videoType,
            url: `https://youtu.be/${item.id}`,
          };
        }) || [];

      // Calcular estatísticas
      const totalViewsLoaded = processedVideos.reduce(
        (sum, video) => sum + video.views,
        0
      );
      const avgEngagement =
        processedVideos.length > 0
          ? processedVideos.reduce((sum, video) => sum + video.engagement, 0) /
            processedVideos.length
          : 0;

      setVideos(processedVideos);
      setChannelStats({
        totalViews: parseInt(channelStatsData.viewCount) || totalViewsLoaded,
        avgEngagement,
        totalVideos:
          parseInt(channelStatsData.videoCount) || processedVideos.length,
      });
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Erro ao carregar vídeos:", err);
      setError(
        err.message === "Canal não encontrado"
          ? "Canal não encontrado. Verifique o ID do canal."
          : "Não foi possível carregar os vídeos. Verifique sua conexão ou quota da API."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedVideos = useMemo(() => {
    const sorted = [...videos];
    const { key, direction } = sortConfig;

    sorted.sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [videos, sortConfig]);

  const displayedVideos = useMemo(() => {
    return showAllVideos
      ? sortedVideos
      : sortedVideos.slice(0, MAX_VIDEOS_DISPLAY);
  }, [sortedVideos, showAllVideos]);

  useEffect(() => {
    fetchVideos();

    const interval = setInterval(fetchVideos, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchVideos]);

  if (loading) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <div className="h-8 w-48 bg-gray-700/50 rounded-lg animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-700/30 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-gray-700/50 rounded-xl animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-700/30 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-8">
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-3">
            Erro ao carregar vídeos
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={fetchVideos}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 sm:p-6 mb-8">
      {/* Cabeçalho compacto */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl lg:text-2xl font-bold text-white">
              Vídeos do Canal
            </h2>
            <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">
              {formatNumber(channelStats.totalVideos)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Eye className="w-4 h-4" />
              <span className="font-medium text-white">
                {formatNumber(channelStats.totalViews)}
              </span>
              <span>views</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium text-white">
                {channelStats.avgEngagement.toFixed(1)}%
              </span>
              <span>engajamento</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchVideos}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors text-sm font-medium"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </button>
        </div>
      </div>

      {/* Tabela Desktop Compacta */}
      <div className="hidden lg:block">
        <div className="w-full overflow-hidden">
          {/* Cabeçalho da tabela - usando divs em vez de table */}
          <div className="grid grid-cols-12 gap-2 px-3 py-3 bg-gray-700/30 rounded-lg mb-2 text-gray-400 text-xs font-medium">
            <div className="col-span-5">VÍDEO</div>
            <div
              className="col-span-1 text-center cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-1"
              onClick={() => handleSort("views")}
            >
              <Eye className="w-3.5 h-3.5" />
              VIEWS
              {sortConfig.key === "views" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                ))}
            </div>
            <div
              className="col-span-1 text-center cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-1"
              onClick={() => handleSort("likes")}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              LIKES
              {sortConfig.key === "likes" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                ))}
            </div>
            <div
              className="col-span-1 text-center cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-1"
              onClick={() => handleSort("engagement")}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              ENG.
              {sortConfig.key === "engagement" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                ))}
            </div>
            <div
              className="col-span-2 text-center cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-1"
              onClick={() => handleSort("publishedAt")}
            >
              <Calendar className="w-3.5 h-3.5" />
              DATA
              {sortConfig.key === "publishedAt" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                ))}
            </div>
            <div className="col-span-2 text-center">STATUS</div>
          </div>

          {/* Lista de vídeos */}
          <div className="space-y-2">
            {displayedVideos.map((video) => (
              <div
                key={video.id}
                className="grid grid-cols-12 gap-2 items-center px-3 py-3 bg-gray-800/30 hover:bg-gray-700/40 rounded-lg transition-colors group"
              >
                {/* Thumbnail e título */}
                <div className="col-span-5">
                  <div className="flex items-center gap-3">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative flex-shrink-0"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-20 h-12 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/90 text-white text-[10px] px-1 py-0.5 rounded">
                        {video.duration}
                      </div>
                      {video.type === "Short" && (
                        <span className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-1 py-0.5 rounded font-bold">
                          S
                        </span>
                      )}
                    </a>

                    <div className="min-w-0 flex-1">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group-hover:text-blue-400 transition-colors"
                      >
                        <p className="text-sm font-medium text-white line-clamp-1 group-hover:text-blue-400 mb-1">
                          {video.title}
                        </p>
                      </a>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            video.type === "Short"
                              ? "bg-red-500/20 text-red-300"
                              : video.type === "Longo"
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {video.type}
                        </span>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Views */}
                <div className="col-span-1">
                  <div className="text-center">
                    <div className="text-white font-bold text-sm">
                      {formatNumber(video.views)}
                    </div>
                  </div>
                </div>

                {/* Likes */}
                <div className="col-span-1">
                  <div className="text-center">
                    <div className="text-white font-medium text-sm">
                      {formatNumber(video.likes)}
                    </div>
                  </div>
                </div>

                {/* Engagement */}
                <div className="col-span-1">
                  <div className="text-center">
                    <div
                      className={`font-bold text-sm ${
                        video.engagement > 10
                          ? "text-red-400"
                          : video.engagement > 5
                          ? "text-emerald-400"
                          : video.engagement > 2
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      {video.engagementFormatted}
                    </div>
                  </div>
                </div>

                {/* Data */}
                <div className="col-span-2">
                  <div className="text-center">
                    <div className="text-white text-sm font-medium">
                      {video.shortDate || video.date}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {video.type === "Short" ? "Short" : "Vídeo"}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <div className="flex justify-center">
                    <StatusBadge {...video} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão Ver Mais/Menos */}
          {videos.length > MAX_VIDEOS_DISPLAY && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAllVideos(!showAllVideos)}
                className="px-5 py-2 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 mx-auto"
              >
                {showAllVideos ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Mostrar menos
                  </>
                ) : (
                  <>
                    Mostrar mais vídeos
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="text-gray-400 text-xs mt-2">
                {displayedVideos.length} de {videos.length} vídeos mostrados
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cards Mobile */}
      <div className="lg:hidden space-y-3">
        {displayedVideos.map((video, i) => {
          const isExpanded = expandedCard === i;
          const StatusIcon = video.icon || BarChart3;

          return (
            <div
              key={video.id}
              className={`bg-gray-800/50 border ${
                video.border
              } rounded-xl overflow-hidden transition-all duration-300 ${
                isExpanded ? "shadow-xl" : "shadow-md hover:shadow-lg"
              }`}
            >
              <div className="p-4">
                {/* Cabeçalho do card */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StatusIcon className="w-4 h-4" />
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${video.bg} ${video.text} border ${video.border}`}
                    >
                      {video.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{video.date}</span>
                </div>

                {/* Thumbnail e título */}
                <div className="flex items-start gap-4 mb-4">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex-shrink-0 block"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-28 h-20 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/90 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                    {video.type === "Short" && (
                      <span className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                        SHORT
                      </span>
                    )}
                  </a>

                  <div className="flex-1 min-w-0">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mb-2"
                    >
                      <h3 className="text-white font-medium line-clamp-2 hover:text-blue-400 transition-colors">
                        {video.title}
                      </h3>
                    </a>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          video.type === "Short"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {video.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Estatísticas principais */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <CompactStat
                    icon={Eye}
                    value={formatNumber(video.views)}
                    label="Views"
                    color="text-blue-400"
                  />
                  <CompactStat
                    icon={ThumbsUp}
                    value={formatNumber(video.likes)}
                    label="Likes"
                    color="text-green-400"
                  />
                  <CompactStat
                    icon={TrendingUp}
                    value={video.engagementFormatted}
                    label="Eng."
                    color={
                      video.engagement > 10
                        ? "text-red-400"
                        : video.engagement > 5
                        ? "text-emerald-400"
                        : "text-yellow-400"
                    }
                  />
                </div>

                {/* Botão expandir */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : i)}
                    className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Menos detalhes
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Mais detalhes
                      </>
                    )}
                  </button>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 rounded-lg transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Assistir
                  </a>
                </div>

                {/* Conteúdo expandido */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <div className="grid grid-cols-2 gap-3">
                      <CompactStat
                        icon={MessageCircle}
                        value={formatNumber(video.comments)}
                        label="Comentários"
                        color="text-gray-400"
                      />
                      <CompactStat
                        icon={Clock}
                        value={video.duration}
                        label="Duração"
                        color="text-gray-400"
                      />
                    </div>

                    <div className="mt-4">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors w-full justify-center font-medium text-sm"
                      >
                        <PlayCircle className="w-5 h-5" />
                        Assistir no YouTube
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Botão Ver Mais/Menos Mobile */}
        {videos.length > MAX_VIDEOS_DISPLAY && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowAllVideos(!showAllVideos)}
              className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium w-full text-sm"
            >
              {showAllVideos ? (
                <>
                  <ChevronUp className="w-4 h-4 inline mr-2" />
                  Ver menos vídeos
                </>
              ) : (
                <>
                  Ver mais vídeos ({videos.length - MAX_VIDEOS_DISPLAY}{" "}
                  restantes)
                  <ChevronDown className="w-4 h-4 inline ml-2" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="mt-6 pt-4 border-t border-gray-700/30 text-center">
        <p className="text-gray-500 text-xs">
          Atualizado às{" "}
          {lastUpdated ? lastUpdated.toLocaleTimeString("pt-BR") : "--:--"} •
          Dados da YouTube Data API v3
        </p>
      </div>
    </div>
  );
}
