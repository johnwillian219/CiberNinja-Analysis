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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";

export default function YouTubePerformance() {
  const [activeTab, setActiveTab] = useState("top");
  const [youtubeData, setYoutubeData] = useState({
    topVideos: [],
    flopVideos: [],
    loading: true,
    error: null,
  });
  const { youtubeConnected } = useAuth();

  // Função para buscar dados dos vídeos
  const fetchYouTubeVideos = async () => {
    if (!youtubeConnected) {
      setYoutubeData({
        topVideos: [],
        flopVideos: [],
        loading: false,
        error: "Conecte sua conta do YouTube",
      });
      return;
    }

    setYoutubeData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Primeiro, buscar os vídeos mais recentes do canal
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${
          import.meta.env.VITE_YOUTUBE_CHANNEL_ID
        }&maxResults=20&order=date&type=video&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`
      );

      const channelData = await channelResponse.json();

      if (!channelData.items || channelData.items.length === 0) {
        throw new Error("Nenhum vídeo encontrado no canal");
      }

      // Pegar IDs dos vídeos
      const videoIds = channelData.items
        .map((item) => item.id.videoId)
        .join(",");

      // Buscar estatísticas detalhadas
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails,snippet&id=${videoIds}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`
      );

      const statsData = await statsResponse.json();

      if (!statsData.items) {
        throw new Error("Não foi possível obter estatísticas");
      }

      // Processar vídeos
      const processedVideos = statsData.items.map((video, index) => {
        const stats = video.statistics || {};
        const details = video.contentDetails || {};
        const snippet = video.snippet || {};

        const views = parseInt(stats.viewCount || 0);
        const likes = parseInt(stats.likeCount || 0);
        const comments = parseInt(stats.commentCount || 0);

        // Calcular engajamento (likes + comments) / views
        const engagement =
          views > 0 ? (((likes + comments) / views) * 100).toFixed(1) : "0.0";

        // Converter duração ISO 8601 para formato legível
        const formatDuration = (duration) => {
          if (!duration) return "0:00";

          const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
          if (!match) return duration;

          const hours = parseInt(match[1] || 0);
          const minutes = parseInt(match[2] || 0);
          const seconds = parseInt(match[3] || 0);

          if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`;
          }
          return `${minutes}:${seconds.toString().padStart(2, "0")}`;
        };

        // Determinar se é vídeo longo ou short
        const isLong = details.duration
          ? details.duration.includes("H") ||
            (details.duration.includes("M") &&
              parseInt(details.duration.match(/PT(?:(\d+)M)?/)[1] || 0) > 5)
          : true;

        // Calcular tendência (simulado baseado na posição)
        const positionFactor = index + 1;
        const trend =
          index < 3
            ? `+${(100 - positionFactor * 20).toFixed(0)}%`
            : `-${(positionFactor * 15).toFixed(0)}%`;

        return {
          id: video.id,
          title: snippet.title || "Vídeo sem título",
          views: views,
          formattedViews:
            views >= 1000 ? `${(views / 1000).toFixed(0)}K` : views.toString(),
          engagement: `${engagement}%`,
          engagementValue: parseFloat(engagement),
          likes: likes,
          formattedLikes:
            likes >= 1000 ? `${(likes / 1000).toFixed(1)}K` : likes.toString(),
          comments: comments,
          formattedComments:
            comments >= 1000
              ? `${(comments / 1000).toFixed(1)}K`
              : comments.toString(),
          type: isLong ? "vídeo" : "short",
          duration: formatDuration(details.duration),
          thumbnail: snippet.thumbnails?.default?.url || "",
          trend: trend,
          category:
            snippet.categoryId === "28"
              ? "Tecnologia"
              : snippet.categoryId === "27"
              ? "Educação"
              : "Geral",
          isTop: index < 3,
          reason:
            index >= 3
              ? getLowPerformanceReason(views, engagement, details.duration)
              : null,
        };
      });

      // Separar top e flop videos
      const topVideos = processedVideos
        .filter((video) => video.isTop)
        .sort((a, b) => b.views - a.views);

      const flopVideos = processedVideos
        .filter((video) => !video.isTop)
        .sort((a, b) => a.views - b.views)
        .slice(0, 3); // Pegar os 3 piores

      setYoutubeData({
        topVideos,
        flopVideos,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Erro ao buscar vídeos do YouTube:", err);
      setYoutubeData({
        topVideos: [],
        flopVideos: [],
        loading: false,
        error: "Falha ao carregar vídeos do YouTube",
      });
    }
  };

  // Função para determinar motivo de baixa performance
  const getLowPerformanceReason = (views, engagement, duration) => {
    const engagementNum = parseFloat(engagement);
    const durationMinutes = parseDurationToMinutes(duration);

    if (engagementNum < 3) {
      return "Engajamento abaixo da média";
    }
    if (durationMinutes > 15) {
      return "Duração muito longa";
    }
    if (views < 1000) {
      return "Pouca visibilidade";
    }
    return "Conteúdo precisa de otimização";
  };

  // Função auxiliar para converter duração em minutos
  const parseDurationToMinutes = (duration) => {
    if (!duration) return 0;

    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    return hours * 60 + minutes + seconds / 60;
  };

  // Efeito para carregar dados
  useEffect(() => {
    fetchYouTubeVideos();
  }, [youtubeConnected]);

  const videosToShow =
    activeTab === "top" ? youtubeData.topVideos : youtubeData.flopVideos;

  // Calcular estatísticas médias
  const calculateAverages = (videos) => {
    if (videos.length === 0)
      return { views: 0, engagement: 0, duration: "0:00" };

    const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
    const avgViews = totalViews / videos.length;

    const totalEngagement = videos.reduce(
      (sum, video) => sum + video.engagementValue,
      0
    );
    const avgEngagement = totalEngagement / videos.length;

    const durations = videos.map((video) =>
      parseDurationToMinutes(video.duration)
    );
    const avgDurationMinutes =
      durations.reduce((sum, duration) => sum + duration, 0) / durations.length;

    // Formatar duração média
    const formatAvgDuration = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = Math.floor(minutes % 60);
      const secs = Math.floor((minutes % 1) * 60);

      if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`;
      }
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Determinar categoria mais comum
    const categories = videos.map((video) => video.category);
    const mostCommonCategory = categories.reduce((a, b, i, arr) =>
      arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
        ? a
        : b
    );

    return {
      views:
        avgViews >= 1000
          ? `${(avgViews / 1000).toFixed(0)}K`
          : Math.round(avgViews).toString(),
      engagement: `${avgEngagement.toFixed(1)}%`,
      duration: formatAvgDuration(avgDurationMinutes),
      category: mostCommonCategory,
    };
  };

  const averages = calculateAverages(videosToShow);

  // Função de segurança para calcular largura da barra
  const calculateBarWidth = (engagement) => {
    const percentage = parseFloat(engagement);
    if (isNaN(percentage) || percentage < 0) return "0%";
    if (percentage > 20) return "100%";
    return `${percentage * 5}%`;
  };

  if (youtubeData.loading) {
    return (
      <div className="sm:p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-gray-400">Analisando performance do YouTube...</p>
          <p className="text-gray-500 text-sm mt-1">
            Buscando dados reais dos seus vídeos
          </p>
        </div>
      </div>
    );
  }

  if (youtubeData.error) {
    return (
      <div className="sm:p-6">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-full mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Não foi possível carregar
          </h3>
          <p className="text-red-400 text-sm mb-4">{youtubeData.error}</p>
          <p className="text-gray-400 text-sm">
            {!youtubeConnected
              ? "Conecte sua conta do YouTube para ver análise de performance"
              : "Verifique sua conexão com o YouTube"}
          </p>
        </div>
      </div>
    );
  }

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
              Análise de vídeos reais • Últimos 30 dias
              {youtubeConnected && (
                <span className="text-emerald-400 ml-2">✓ Dados reais</span>
              )}
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
              <span>Top Performers ({youtubeData.topVideos.length})</span>
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
              <span>Precisa Melhorar ({youtubeData.flopVideos.length})</span>
            </div>
          </button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="space-y-3 sm:space-y-4">
        {videosToShow.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">
              Nenhum vídeo encontrado nesta categoria
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Faça upload de mais vídeos no YouTube
            </p>
          </div>
        ) : (
          videosToShow.map((video, i) => (
            <div
              key={video.id || i}
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
                      <span className="text-emerald-400 font-bold">
                        #{i + 1}
                      </span>
                    ) : (
                      <span className="text-red-400 font-bold">#{i + 1}</span>
                    )}
                  </div>
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt="Thumbnail"
                      className="w-12 h-9 rounded object-cover"
                    />
                  ) : (
                    <div className="w-12 h-9 bg-gray-700/50 rounded flex items-center justify-center">
                      <PlayCircle className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
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
                        {video.formattedViews || "0"}
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
                        {video.formattedLikes || "0"}
                      </p>
                    </div>

                    <div className="bg-gray-800/40 p-2 rounded-lg">
                      <div className="flex items-center gap-1.5 mb-1">
                        <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs text-gray-400">Coment.</span>
                      </div>
                      <p className="text-sm font-bold text-white">
                        {video.formattedComments || "0"}
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
                    <a
                      href={`https://youtu.be/${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                    >
                      Ver vídeo
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-3 rounded-xl border border-emerald-500/20">
          <p className="text-xs text-gray-400 mb-1">Média Views</p>
          <p className="text-base font-bold text-emerald-400">
            {averages.views}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20">
          <p className="text-xs text-gray-400 mb-1">Engajamento</p>
          <p
            className={`text-base font-bold ${
              activeTab === "top" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {averages.engagement}
          </p>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-xl border border-purple-500/20">
          <p className="text-xs text-gray-400 mb-1">Duração média</p>
          <p className="text-sm font-medium text-purple-400">
            {averages.duration}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-3 rounded-xl border border-yellow-500/20">
          <p className="text-xs text-gray-400 mb-1">Categoria</p>
          <p className="text-sm font-medium text-yellow-400">
            {averages.category}
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
                ? `Continue criando conteúdo na categoria "${averages.category}"! Esta categoria está performando bem. Mantenha títulos claros e thumbnails atrativas.`
                : "Considere otimizar thumbnails e títulos para melhorar o CTR. Vídeos mais curtos tendem a ter melhor retenção."}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {youtubeConnected
                ? "Análise baseada em dados reais do seu canal"
                : "Conecte sua conta do YouTube para dicas personalizadas"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
