// src/components/youtube/YouTubeRankings.jsx - VERSÃO COMPACTA E OTIMIZADA

import { useState, useEffect, useCallback } from "react";
import {
  Trophy,
  Flame,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Eye,
  BarChart3,
  RefreshCw,
  ExternalLink,
  Heart,
  MessageCircle,
  Clock,
} from "lucide-react";

const YOUTUBE_API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY ||
  "AIzaSyCtTFbHQ8BXdmGghYUH2_qu_3EsUi1f0SY";
const CHANNEL_ID =
  import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "UC0tkO3jaK3afLwV0lSEgwFQ";

const getPerformanceStyle = (engagement) => {
  if (engagement > 10)
    return {
      label: "VIRAL",
      color: "text-red-400",
      bg: "bg-red-500/20",
      border: "border-red-500/40",
      icon: Flame,
    };
  if (engagement > 5)
    return {
      label: "FORTE",
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/40",
      icon: TrendingUp,
    };
  if (engagement > 2)
    return {
      label: "BOM",
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      border: "border-cyan-500/40",
      icon: BarChart3,
    };
  return {
    label: "BAIXO",
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/40",
    icon: TrendingDown,
  };
};

const formatNumber = (num) => {
  if (!num && num !== 0) return "0";
  const numValue = Number(num);

  if (numValue >= 1000000) return `${(numValue / 1000000).toFixed(1)}M`;
  if (numValue >= 1000) return `${(numValue / 1000).toFixed(1)}K`;
  return numValue.toString();
};

export default function YouTubeRankings() {
  const [activeTab, setActiveTab] = useState("top5");
  const [top5, setTop5] = useState([]);
  const [risingFast, setRisingFast] = useState([]);
  const [needsAttention, setNeedsAttention] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchRankings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar vídeos
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=20&order=date&type=video&key=${YOUTUBE_API_KEY}`
      );
      const videosData = await videosResponse.json();

      if (!videosData.items?.length) {
        throw new Error("Nenhum vídeo encontrado no canal");
      }

      const videoIds = videosData.items
        .map((item) => item.id.videoId)
        .filter(Boolean);

      // Buscar estatísticas
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds.join(
          ","
        )}&key=${YOUTUBE_API_KEY}`
      );
      const statsData = await statsResponse.json();

      const videos =
        statsData.items?.map((item, index) => {
          const snippet = videosData.items[index]?.snippet || {};
          const stats = item.statistics || {};

          const views = parseInt(stats.viewCount || 0);
          const likes = parseInt(stats.likeCount || 0);
          const comments = parseInt(stats.commentCount || 0);
          const engagement = views > 0 ? ((likes + comments) / views) * 100 : 0;

          const publishedAt = new Date(snippet.publishedAt);
          const daysAgo = Math.floor(
            (Date.now() - publishedAt.getTime()) / (1000 * 60 * 60 * 24)
          );

          // Calcular taxa de likes e comentários
          const likeRate = views > 0 ? (likes / views) * 100 : 0;
          const commentRate = views > 0 ? (comments / views) * 100 : 0;
          const viewsPerDay = daysAgo > 0 ? views / daysAgo : views;

          const style = getPerformanceStyle(engagement);
          const StyleIcon = style.icon;

          return {
            id: item.id,
            title: snippet.title || "Sem título",
            thumbnail:
              snippet.thumbnails?.medium?.url ||
              snippet.thumbnails?.default?.url,
            views,
            likes,
            comments,
            engagement: Number(engagement.toFixed(1)),
            engagementFormatted: `${engagement.toFixed(1)}%`,
            likeRate: Number(likeRate.toFixed(1)),
            commentRate: Number(commentRate.toFixed(1)),
            daysAgo,
            viewsPerDay: Math.round(viewsPerDay),
            publishedAt,
            style,
            StyleIcon,
            url: `https://youtu.be/${item.id}`,
          };
        }) || [];

      // Top 5 por views
      const sortedTop = [...videos]
        .filter((v) => v.views > 0)
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)
        .map((v, i) => ({
          ...v,
          rank: i + 1,
          shortTitle:
            v.title.length > 40 ? v.title.substring(0, 40) + "..." : v.title,
          viewsFormatted: formatNumber(v.views),
        }));

      // Em Alta (crescimento rápido recente)
      const recentVideos = videos.filter(
        (v) => v.daysAgo <= 14 && v.views > 100
      );
      const rising = recentVideos
        .sort((a, b) => b.viewsPerDay - a.viewsPerDay)
        .slice(0, 3)
        .map((v) => ({
          ...v,
          shortTitle:
            v.title.length > 40 ? v.title.substring(0, 40) + "..." : v.title,
          viewsFormatted: formatNumber(v.views),
          growth: `+${v.viewsPerDay.toLocaleString()}/dia`,
        }));

      // Precisa Atenção - LÓGICA MELHORADA
      const attentionNeeded = videos
        .filter((v) => {
          // Filtrar vídeos com problemas
          const hasLowEngagement = v.engagement < 1;
          const hasLowLikeRate = v.likeRate < 2;
          const hasNoComments = v.comments === 0 && v.daysAgo > 3;
          const isStagnant = v.viewsPerDay < 50 && v.daysAgo > 7;

          // Pelo menos 2 problemas para precisar de atenção
          const problems = [
            hasLowEngagement,
            hasLowLikeRate,
            hasNoComments,
            isStagnant,
          ].filter(Boolean).length;

          return v.views > 100 && v.daysAgo > 2 && problems >= 2;
        })
        .sort((a, b) => {
          // Ordenar por gravidade do problema
          const aProblems = [
            a.engagement < 1 ? 3 : 0,
            a.likeRate < 2 ? 2 : 0,
            a.comments === 0 ? 2 : 0,
            a.viewsPerDay < 50 ? 1 : 0,
          ].reduce((sum, val) => sum + val, 0);

          const bProblems = [
            b.engagement < 1 ? 3 : 0,
            b.likeRate < 2 ? 2 : 0,
            b.comments === 0 ? 2 : 0,
            b.viewsPerDay < 50 ? 1 : 0,
          ].reduce((sum, val) => sum + val, 0);

          return bProblems - aProblems;
        })
        .slice(0, 3)
        .map((v) => {
          // Identificar problemas específicos
          const problems = [];
          if (v.engagement < 1) problems.push("Engajamento muito baixo");
          if (v.likeRate < 2) problems.push("Poucos likes");
          if (v.comments === 0) problems.push("Sem comentários");
          if (v.viewsPerDay < 50) problems.push("Crescimento lento");

          const mainProblem = problems[0] || "Baixo desempenho";

          return {
            ...v,
            shortTitle:
              v.title.length > 40 ? v.title.substring(0, 40) + "..." : v.title,
            viewsFormatted: formatNumber(v.views),
            suggestion: mainProblem,
            problems: problems.slice(0, 2), // Mostrar até 2 problemas
          };
        });

      setTop5(sortedTop);
      setRisingFast(rising);
      setNeedsAttention(attentionNeeded);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Erro ao carregar rankings:", err);
      setError("Não foi possível carregar os rankings. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRankings();
  }, [fetchRankings]);

  const RankCard = ({ item, type }) => {
    const StyleIcon = item.StyleIcon || BarChart3;

    return (
      <div
        className={`bg-gray-800/40 hover:bg-gray-700/50 rounded-xl p-4 transition-all duration-200 border ${item.style.border} hover:border-gray-600`}
      >
        <div className="flex items-start gap-3">
          {/* Badge de posição */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.style.bg} flex-shrink-0`}
          >
            {type === "top5" ? (
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">#{item.rank}</span>
              </div>
            ) : type === "rising" ? (
              <TrendingUp className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <p className="text-white font-medium text-sm line-clamp-1 hover:text-blue-300 transition-colors mb-2">
                {item.shortTitle}
              </p>
            </a>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-gray-700/50 px-2 py-1 rounded-lg">
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-white text-xs font-bold">
                  {item.viewsFormatted}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <StyleIcon className={`w-3.5 h-3.5 ${item.style.color}`} />
                <span className={`text-xs font-bold ${item.style.color}`}>
                  {item.style.label}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-white text-xs font-medium">
                  {item.engagementFormatted}
                </span>
              </div>

              {type === "rising" && item.growth && (
                <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 text-xs font-medium">
                    {item.growth}
                  </span>
                </div>
              )}
            </div>

            {/* Problemas específicos para "Precisa Atenção" */}
            {type === "attention" &&
              item.problems &&
              item.problems.length > 0 && (
                <div className="mt-2">
                  {item.problems.map((problem, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-xs text-yellow-400"
                    >
                      <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                      <span>{problem}</span>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Botão rápido */}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            title="Abrir no YouTube"
          >
            <ExternalLink className="w-4 h-4 text-gray-500 hover:text-blue-400" />
          </a>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 mb-6">
        <div className="h-32 bg-gray-700/30 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-red-500/30 rounded-xl p-4 mb-6">
        <div className="text-center py-3">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">{error}</p>
          <button
            onClick={fetchRankings}
            className="mt-3 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 mb-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            Rankings Ultimos 14 dias
          </h2>
          <p className="text-gray-400 text-xs">
            {lastUpdated
              ? `Atualizado: ${lastUpdated.toLocaleTimeString("pt-BR")}`
              : "Carregando..."}
          </p>
        </div>

        <button
          onClick={fetchRankings}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Atualizar
        </button>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden mb-4">
        <div className="flex gap-1 mb-4 bg-gray-800/60 backdrop-blur-sm p-1 rounded-lg border border-gray-700/50">
          <button
            onClick={() => setActiveTab("top5")}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md font-medium text-xs transition-all ${
              activeTab === "top5"
                ? "bg-red-500/20 text-red-300"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Top 5
          </button>
          <button
            onClick={() => setActiveTab("rising")}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md font-medium text-xs transition-all ${
              activeTab === "rising"
                ? "bg-emerald-500/20 text-emerald-300"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Em Alta
          </button>
          <button
            onClick={() => setActiveTab("attention")}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md font-medium text-xs transition-all ${
              activeTab === "attention"
                ? "bg-yellow-500/20 text-yellow-300"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Atenção
          </button>
        </div>

        <div className="space-y-3">
          {activeTab === "top5" &&
            top5.map((item, i) => <RankCard key={i} item={item} type="top5" />)}

          {activeTab === "rising" &&
            risingFast.map((item, i) => (
              <RankCard key={i} item={item} type="rising" />
            ))}

          {activeTab === "attention" &&
            needsAttention.map((item, i) => (
              <RankCard key={i} item={item} type="attention" />
            ))}
        </div>
      </div>

      {/* Desktop - Grid horizontal */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {/* Top 5 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-red-400" />
            <h3 className="text-white font-bold text-sm">Top 5 Vídeos</h3>
          </div>
          <div className="space-y-2">
            {top5.map((item, i) => (
              <RankCard key={i} item={item} type="top5" />
            ))}
          </div>
        </div>

        {/* Em Alta */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5 text-emerald-400" />
            <h3 className="text-white font-bold text-sm">Em Alta</h3>
          </div>
          <div className="space-y-2">
            {risingFast.map((item, i) => (
              <RankCard key={i} item={item} type="rising" />
            ))}
          </div>
        </div>

        {/* Precisa Atenção */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-white font-bold text-sm">Precisa Atenção</h3>
          </div>
          <div className="space-y-2">
            {needsAttention.length > 0 ? (
              needsAttention.map((item, i) => (
                <RankCard key={i} item={item} type="attention" />
              ))
            ) : (
              <div className="bg-gray-800/30 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-400 text-xs">Tudo está bem!</p>
                <p className="text-gray-500 text-xs mt-1">
                  Nenhum vídeo com problemas
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="mt-4 pt-3 border-t border-gray-700/30">
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 justify-center">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-red-500/60 rounded-full"></div>
            <span>VIRAL: &gt;10%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500/60 rounded-full"></div>
            <span>FORTE: &gt;5%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-cyan-500/60 rounded-full"></div>
            <span>BOM: &gt;2%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-yellow-500/60 rounded-full"></div>
            <span>BAIXO: &lt;2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
