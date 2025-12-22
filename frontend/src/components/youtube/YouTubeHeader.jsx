// src/components/youtube/YouTubeHeader.jsx

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Youtube,
  Users,
  Eye,
  PlayCircle,
  Calendar,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Zap,
  Shield,
  Crown,
  Rocket,
  DollarSign,
  ExternalLink,
  BarChart3,
  MessageSquare,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";

import { useYouTubeData } from "../../hooks/useYouTubeData";
import { useAuth } from "../../context/AuthContext";

// Configurações de status simplificadas
const statusConfigs = {
  excelente: {
    icon: Crown,
    title: "Excelente",
    color: "text-yellow-300",
    gradient: "from-yellow-500/20 to-amber-600/10",
    border: "border-yellow-500/30",
    level: 5,
  },
  bom: {
    icon: TrendingUp,
    title: "Bom",
    color: "text-emerald-300",
    gradient: "from-emerald-500/20 to-teal-600/10",
    border: "border-emerald-500/30",
    level: 4,
  },
  regular: {
    icon: CheckCircle,
    title: "Regular",
    color: "text-cyan-300",
    gradient: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-500/30",
    level: 3,
  },
  "precisa-melhorar": {
    icon: AlertCircle,
    title: "Precisa Melhorar",
    color: "text-orange-300",
    gradient: "from-orange-500/20 to-red-600/10",
    border: "border-orange-500/30",
    level: 2,
  },
  iniciante: {
    icon: Rocket,
    title: "Em Ascensão",
    color: "text-purple-300",
    gradient: "from-purple-500/20 to-fuchsia-600/10",
    border: "border-purple-500/30",
    level: 1,
  },
};

export default function YouTubeHeader() {
  const { youtubeConnected, user } = useAuth();
  const { data, loading, error, lastUpdated, refetch, hasData } =
    useYouTubeData();

  const [healthStatus, setHealthStatus] = useState("iniciante");
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
  const [performanceScore, setPerformanceScore] = useState(0);
  const [channelName, setChannelName] = useState("Seu Canal");
  const [subscriberCount, setSubscriberCount] = useState(0);
  const refreshIntervalRef = useRef(null);

  // Formatar números de forma limpa
  const formatNumber = (num) => {
    if (!num && num !== 0) return "0";
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  // Formatar tempo de exibição em horas
  const formatWatchTimeHours = (minutes) => {
    if (!minutes) return "0h";
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  // Formatar moeda
  const formatCurrency = (value) => {
    if (!value) return "R$ 0";
    const formatted = value.toFixed(2).replace(".", ",");
    return `R$ ${formatted}`;
  };

  // Calcular métricas principais
  const calculateMetrics = useMemo(() => {
    if (!data || data.length === 0) return null;

    const last30Days = data.slice(-30);
    const previous30Days = data.slice(-60, -30);

    // Totais dos últimos 30 dias
    const totals = last30Days.reduce(
      (acc, day) => ({
        views: acc.views + (day.views || 0),
        watchTime: acc.watchTime + (day.watchTime || 0),
        subscribersGained: acc.subscribersGained + (day.subscribersGained || 0),
        subscribersLost: acc.subscribersLost + (day.subscribersLost || 0),
        likes: acc.likes + (day.likes || 0),
        comments: acc.comments + (day.comments || 0),
        shares: acc.shares + (day.shares || 0),
        estimatedRevenue: acc.estimatedRevenue + (day.estimatedRevenue || 0),
      }),
      {
        views: 0,
        watchTime: 0,
        subscribersGained: 0,
        subscribersLost: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        estimatedRevenue: 0,
      }
    );

    // Totais dos 30 dias anteriores
    const previousTotals = previous30Days.reduce(
      (acc, day) => ({
        views: acc.views + (day.views || 0),
        subscribersGained: acc.subscribersGained + (day.subscribersGained || 0),
      }),
      { views: 0, subscribersGained: 0 }
    );

    // Calcular variações
    const viewsChange =
      previousTotals.views > 0
        ? ((totals.views - previousTotals.views) / previousTotals.views) * 100
        : totals.views > 0
        ? 100
        : 0;

    const subsChange =
      previousTotals.subscribersGained > 0
        ? ((totals.subscribersGained - previousTotals.subscribersGained) /
            previousTotals.subscribersGained) *
          100
        : totals.subscribersGained > 0
        ? 100
        : 0;

    // Métricas calculadas
    const netSubscribers = totals.subscribersGained - totals.subscribersLost;
    const engagement = totals.likes + totals.comments + totals.shares;
    const avgViewsPerDay = totals.views / 30;
    const avgSubsPerDay = totals.subscribersGained / 30;

    return {
      ...totals,
      netSubscribers,
      engagement,
      avgViewsPerDay,
      avgSubsPerDay,
      viewsChange,
      subsChange,
    };
  }, [data]);

  // Determinar status do canal
  useEffect(() => {
    if (!calculateMetrics) return;

    const { avgViewsPerDay, avgSubsPerDay } = calculateMetrics;

    let score = 0;

    // Pontuação base simplificada
    if (avgViewsPerDay > 10000) score = 95;
    else if (avgViewsPerDay > 5000) score = 85;
    else if (avgViewsPerDay > 1000) score = 75;
    else if (avgViewsPerDay > 500) score = 65;
    else if (avgViewsPerDay > 100) score = 55;
    else if (avgViewsPerDay > 50) score = 45;
    else if (avgViewsPerDay > 10) score = 35;
    else score = 25;

    // Ajustar por inscritos
    if (avgSubsPerDay > 100) score += 15;
    else if (avgSubsPerDay > 50) score += 10;
    else if (avgSubsPerDay > 10) score += 5;

    score = Math.min(100, Math.max(0, score));
    setPerformanceScore(Math.round(score));

    // Determinar status baseado na pontuação
    let status = "iniciante";
    if (score >= 85) status = "excelente";
    else if (score >= 70) status = "bom";
    else if (score >= 55) status = "regular";
    else if (score >= 40) status = "precisa-melhorar";

    setHealthStatus(status);

    // Dados do canal
    if (user?.name) {
      setChannelName(user.name);
    }

    // Estimativa de inscritos
    const estimatedSubs = Math.max(100, Math.round(avgSubsPerDay * 180));
    setSubscriberCount(estimatedSubs);
  }, [calculateMetrics, user]);

  // Auto-refresh
  useEffect(() => {
    if (autoRefreshEnabled && youtubeConnected) {
      refreshIntervalRef.current = setInterval(() => {
        refetch();
      }, 5 * 60 * 1000);
    }

    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, [autoRefreshEnabled, youtubeConnected, refetch]);

  const statusConfig = statusConfigs[healthStatus];

  // Loading state limpo
  if (loading && !data) {
    return (
      <div className="space-y-4">
        {/* Barra de status loading */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-3 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-700" />
              <div>
                <div className="h-4 w-32 bg-gray-700 rounded mb-1" />
                <div className="h-3 w-24 bg-gray-700 rounded" />
              </div>
            </div>
            <div className="h-9 w-28 bg-gray-700 rounded-lg" />
          </div>
        </div>

        {/* Header principal loading */}
        <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-700" />
              <div>
                <div className="h-5 w-40 bg-gray-700 rounded mb-1" />
                <div className="h-4 w-28 bg-gray-700 rounded" />
              </div>
            </div>
            <div className="h-10 w-32 bg-gray-700 rounded-lg" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state limpo
  if (error || !hasData || !youtubeConnected) {
    return (
      <div className="bg-gray-900/50 border border-red-500/30 rounded-xl p-5 md:p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-full mb-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            {error ? "Erro ao carregar" : "Canal não conectado"}
          </h3>
          <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
            {error?.message ||
              "Conecte sua conta do YouTube para acessar estatísticas detalhadas do seu canal."}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={refetch}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </button>
            <a
              href="/auth/youtube"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Youtube className="w-4 h-4" />
              Conectar YouTube
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Barra de status superior - Layout melhorado */}
      <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-3">
        <div className="flex items-center justify-between">
          {/* Status do canal */}
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${statusConfig.gradient} border ${statusConfig.border}`}
            >
              <statusConfig.icon className={`w-4 h-4 ${statusConfig.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${statusConfig.color}`}>
                  {statusConfig.title}
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i < statusConfig.level
                          ? statusConfig.color.replace("text-", "bg-")
                          : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Score:{" "}
                <span className="text-white font-medium">
                  {performanceScore}
                </span>
                /100
              </p>
            </div>
          </div>

          {/* Controles de refresh - Layout compacto */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
              className={`p-2 rounded-lg border transition-all ${
                autoRefreshEnabled
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-gray-700/50 text-gray-400 border-gray-600"
              }`}
              title={
                autoRefreshEnabled
                  ? "Auto-refresh ativado"
                  : "Auto-refresh desativado"
              }
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  autoRefreshEnabled ? "animate-spin-slow" : ""
                }`}
              />
            </button>

            <button
              onClick={refetch}
              className="p-2 bg-gray-700/50 hover:bg-gray-600 border border-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors"
              title="Atualizar dados agora"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <div className="hidden sm:block ml-2 text-right">
              <p className="text-xs text-gray-400">Última atualização</p>
              <p className="text-xs text-white">
                {lastUpdated
                  ? new Date(lastUpdated).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Agora"}
              </p>
            </div>
          </div>
        </div>

        {/* Timestamp mobile - aparece apenas em telas pequenas */}
        <div className="sm:hidden mt-2 pt-2 border-t border-gray-700/30">
          <p className="text-xs text-gray-400 text-center">
            Atualizado{" "}
            {lastUpdated
              ? new Date(lastUpdated).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "agora"}
          </p>
        </div>
      </div>

      {/* Header principal */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 rounded-xl p-4 md:p-5">
        {/* Cabeçalho do canal */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <Youtube className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-red-600 p-1.5 rounded-full">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {channelName}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-base md:text-lg font-semibold text-white">
                    {formatNumber(subscriberCount)}
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="flex items-center gap-1.5 text-sm text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>30 dias</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botão YouTube Studio - Tamanho consistente */}
          <a
            href="https://studio.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm md:text-base"
          >
            <span className="hidden sm:inline">YouTube Studio</span>
            <span className="sm:hidden">Studio</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {/* Visualizações */}
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-5 h-5 text-emerald-400" />
              {calculateMetrics?.viewsChange !== undefined &&
                calculateMetrics.viewsChange > 0 && (
                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>
                      {Math.abs(calculateMetrics.viewsChange).toFixed(0)}%
                    </span>
                  </div>
                )}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {formatNumber(calculateMetrics?.views || 0)}
            </div>
            <div className="text-xs text-gray-400">Visualizações</div>
          </div>

          {/* Inscritos */}
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-cyan-400" />
              {calculateMetrics?.subsChange !== undefined &&
                calculateMetrics.subsChange > 0 && (
                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="w-3 h-3" />
                    <span>
                      {Math.abs(calculateMetrics.subsChange).toFixed(0)}%
                    </span>
                  </div>
                )}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              +{formatNumber(calculateMetrics?.netSubscribers || 0)}
            </div>
            <div className="text-xs text-gray-400">Inscritos</div>
          </div>

          {/* Tempo de exibição */}
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {formatWatchTimeHours(calculateMetrics?.watchTime || 0)}
            </div>
            <div className="text-xs text-gray-400">Tempo exibição</div>
          </div>

          {/* Receita estimada */}
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">
              {formatCurrency(calculateMetrics?.estimatedRevenue || 0)}
            </div>
            <div className="text-xs text-gray-400">Receita</div>
          </div>
        </div>

        {/* Métricas secundárias */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-800/20 border border-gray-700/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <PlayCircle className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-gray-300">Média/dia</span>
            </div>
            <div className="text-base md:text-lg font-semibold text-white">
              {formatNumber(Math.round(calculateMetrics?.avgViewsPerDay || 0))}
            </div>
          </div>

          <div className="bg-gray-800/20 border border-gray-700/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-300">Novos/dia</span>
            </div>
            <div className="text-base md:text-lg font-semibold text-white">
              +{Math.round(calculateMetrics?.avgSubsPerDay || 0)}
            </div>
          </div>

          <div className="bg-gray-800/20 border border-gray-700/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-pink-400" />
              <span className="text-xs text-gray-300">Engajamento</span>
            </div>
            <div className="text-base md:text-lg font-semibold text-white">
              {formatNumber(calculateMetrics?.engagement || 0)}
            </div>
          </div>
        </div>

        {/* Detalhes do engajamento */}
        <div className="mt-4 pt-4 border-t border-gray-700/30">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-300">
                {formatNumber(calculateMetrics?.likes || 0)}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">
                {formatNumber(calculateMetrics?.comments || 0)}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">
                {formatNumber(calculateMetrics?.shares || 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status da conexão */}
      <div className="bg-gray-900/30 border border-gray-700/30 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400">YouTube API conectada</span>
          </div>
          <div className="text-gray-400">Atualização automática</div>
        </div>
      </div>
    </div>
  );
}
