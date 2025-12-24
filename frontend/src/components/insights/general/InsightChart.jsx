// src/components/insights/general/InsightChart.jsx
import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChevronDown,
  BarChart3,
  Users,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";

import { likesData as tiktokLikes } from "../../tiktok/data/likesData";
import { sharesData as tiktokShares } from "../../tiktok/data/sharesData";

import { reachData as instagramReach } from "../../instagram/data/reachData";
import { impressionsData as instagramImpressions } from "../../instagram/data/impressionsData";
import { savesData as instagramSaves } from "../../instagram/data/savesData";

import { reachData as facebookReach } from "../../facebook/data/reachData";
import { reactionsData as facebookReactions } from "../../facebook/data/reactionsData";
import { sharesData as facebookShares } from "../../facebook/data/sharesData";

// Função para gerar datas reais
const generateRealDates = (days) => {
  const dates = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const day = date.getDate();
    const month = date
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "");

    dates.push({
      fullDate: date.toISOString().split("T")[0],
      displayDate: `${day} ${month}`,
      dayMonth: `${day}/${date.getMonth() + 1}`,
    });
  }

  return dates;
};

// Métricas disponíveis com ícones
const metrics = [
  {
    key: "reach",
    label: "Alcance",
    shortLabel: "Alcance",
    description: "Pessoas que viram seu conteúdo",
    icon: BarChart3,
    color: "#8b5cf6",
    data: {
      Instagram: instagramReach,
      Facebook: facebookReach,
    },
    format: (v) => `${(v / 1000).toFixed(0)}K`,
    youtubeMetric: "views",
  },
  {
    key: "followers",
    label: "Novos Seguidores",
    shortLabel: "Seguidores",
    description: "Novas pessoas seguindo suas contas",
    icon: Users,
    color: "#10b981",
    data: {
      TikTok: tiktokLikes,
      Instagram: instagramSaves,
      Facebook: facebookReactions,
    },
    format: (v) => `${v}`,
    youtubeMetric: "subscribersGained",
  },
  {
    key: "watchTime",
    label: "Tempo Assistido",
    shortLabel: "Tempo",
    description: "Tempo total gasto no seu conteúdo",
    icon: Clock,
    color: "#f59e0b",
    data: {
      TikTok: tiktokShares,
      Instagram: instagramImpressions,
      Facebook: facebookShares,
    },
    format: (v) => {
      // YouTube retorna minutos, converter para horas
      const hours = v / 60;
      if (hours >= 1000) return `${(hours / 1000).toFixed(1)}K h`;
      if (hours >= 100) return `${hours.toFixed(0)} h`;
      return `${hours.toFixed(1)} h`;
    },
    youtubeMetric: "estimatedMinutesWatched",
  },
];

const periods = [
  { label: "7 dias", value: "7d", description: "Última semana" },
  { label: "30 dias", value: "30d", description: "Último mês" },
  { label: "90 dias", value: "all", description: "Últimos 3 meses" },
];

// Função para processar dados reais do YouTube Analytics
const processYouTubeAnalyticsData = (
  analyticsData,
  selectedMetric,
  selectedPeriod
) => {
  if (!analyticsData || !analyticsData.data || !analyticsData.headers) {
    return [];
  }

  const { data: rows, headers } = analyticsData;

  // Encontrar o índice da métrica desejada
  const metricIndex = headers.findIndex(
    (header) =>
      header.name ===
      metrics.find((m) => m.key === selectedMetric)?.youtubeMetric
  );

  if (metricIndex === -1) {
    return [];
  }

  // Processar os dados
  const processedData = rows.map((row, index) => {
    const dateStr = row[0]; // Primeira coluna é a data
    const value = parseFloat(row[metricIndex]) || 0;

    // Converter data para formato legível
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "");

    return {
      date: `${day} ${month}`,
      fullDate: dateStr,
      value: value,
    };
  });

  // Filtrar por período
  const periodDays =
    selectedPeriod === "7d" ? 7 : selectedPeriod === "30d" ? 30 : 90;
  return processedData.slice(-periodDays);
};

export default function InsightChart() {
  const [selectedMetric, setSelectedMetric] = useState("reach");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isMetricOpen, setIsMetricOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [youtubeData, setYoutubeData] = useState({
    analytics: null,
    loading: true,
    error: null,
  });
  const { youtubeConnected } = useAuth();
  const [currentDates, setCurrentDates] = useState([]);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMetricOpen(false);
      setIsPeriodOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Carregar dados reais do YouTube
  const loadYouTubeAnalytics = useCallback(async () => {
    if (!youtubeConnected) {
      setYoutubeData({
        analytics: null,
        loading: false,
        error: "Conecte sua conta do YouTube para ver dados reais",
      });
      return;
    }

    setYoutubeData((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const analyticsData = await api.getYouTubeData();
      console.log("📊 Dados reais do YouTube Analytics:", analyticsData);

      setYoutubeData({
        analytics: analyticsData,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("❌ Erro ao carregar dados do YouTube Analytics:", err);
      setYoutubeData({
        analytics: null,
        loading: false,
        error: err.message || "Falha ao carregar dados do YouTube",
      });
    }
  }, [youtubeConnected]);

  // Efeito inicial: carregar dados
  useEffect(() => {
    loadYouTubeAnalytics();
  }, [loadYouTubeAnalytics]);

  // Gerar datas reais para o período selecionado
  useEffect(() => {
    const periodDays =
      selectedPeriod === "7d" ? 7 : selectedPeriod === "30d" ? 30 : 90;
    const dates = generateRealDates(periodDays);
    setCurrentDates(dates);
  }, [selectedPeriod]);

  const currentMetric = metrics.find((m) => m.key === selectedMetric);
  const CurrentIcon = currentMetric?.icon || BarChart3;
  const currentPeriod = periods.find((p) => p.value === selectedPeriod);

  // Filtrar dados por período
  const getFilteredData = useCallback(
    (platformData, platformName) => {
      if (platformName === "YouTube" && youtubeData.analytics) {
        // Dados reais do YouTube
        const realData = processYouTubeAnalyticsData(
          youtubeData.analytics,
          selectedMetric,
          selectedPeriod
        );

        // Combinar com as datas atuais
        return currentDates.map((date, index) => {
          const dataItem = realData[index] || { value: 0 };
          return {
            date: date.displayDate,
            value: dataItem.value,
            fullDate: date.fullDate,
          };
        });
      } else if (platformName === "YouTube") {
        // Sem dados do YouTube, retornar array vazio
        return currentDates.map((date) => ({
          date: date.displayDate,
          value: 0,
          fullDate: date.fullDate,
        }));
      }

      // Para outras plataformas, usar dados locais
      const periodDays =
        selectedPeriod === "7d" ? 7 : selectedPeriod === "30d" ? 30 : 90;
      const slicedData = platformData.slice(-periodDays);

      return currentDates.map((date, index) => {
        const dataItem = slicedData[index] || { value: 0 };
        return {
          date: date.displayDate,
          value: dataItem.value,
          fullDate: date.fullDate,
        };
      });
    },
    [youtubeData.analytics, selectedMetric, selectedPeriod, currentDates]
  );

  // Montar dados combinados
  const getCombinedData = useCallback(() => {
    if (youtubeData.loading) {
      return { combinedData: [], platformTotals: {} };
    }

    const combinedData = [];
    const platformTotals = {};

    // Preparar todos os dados das plataformas
    const allPlatforms = {
      ...currentMetric.data,
    };

    // Adicionar YouTube apenas se estiver conectado
    if (youtubeConnected) {
      allPlatforms.YouTube = []; // Será preenchido pelo getFilteredData
    }

    // Obter arrays filtrados para cada plataforma
    const platformArrays = {};
    Object.keys(allPlatforms).forEach((platform) => {
      const platformData = allPlatforms[platform];
      platformArrays[platform] = getFilteredData(platformData, platform);

      // Calcular total
      platformTotals[platform] = platformArrays[platform].reduce(
        (sum, item) => sum + (item?.value || 0),
        0
      );
    });

    // Combinar dados usando as datas atuais
    currentDates.forEach((dateInfo, index) => {
      const entry = {
        date: dateInfo.displayDate,
        fullDate: dateInfo.fullDate,
      };

      Object.keys(platformArrays).forEach((platform) => {
        const platformArray = platformArrays[platform];
        entry[platform] = platformArray[index]?.value || 0;
      });

      combinedData.push(entry);
    });

    return { combinedData, platformTotals };
  }, [
    youtubeData.loading,
    currentMetric,
    youtubeConnected,
    getFilteredData,
    currentDates,
  ]);

  const { combinedData, platformTotals } = getCombinedData();

  // Encontrar a plataforma líder
  const leadingPlatform =
    Object.keys(platformTotals).length > 0
      ? Object.keys(platformTotals).reduce((a, b) =>
          platformTotals[a] > platformTotals[b] ? a : b
        )
      : "Nenhuma";

  // Função para formatar tooltip
  const formatTooltipDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // Estado de loading
  if (youtubeData.loading) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 xl:p-7 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-gray-400">Carregando dados reais do YouTube...</p>
          <p className="text-gray-500 text-sm mt-1">
            Acessando YouTube Analytics API
          </p>
        </div>
      </div>
    );
  }

  // Erro ao carregar
  if (youtubeData.error) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-red-500/30 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 xl:p-7 mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-full mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Erro ao carregar dados
          </h3>
          <p className="text-red-400 text-sm mb-4">{youtubeData.error}</p>
          <p className="text-gray-400 text-sm">
            {!youtubeConnected
              ? "Conecte sua conta do YouTube para ver dados reais."
              : "Verifique sua conexão com o YouTube e tente novamente."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 xl:p-7 mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
      {/* Cabeçalho informativo */}
      <div className="mb-4 sm:mb-5 lg:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-lg">
              <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                {currentMetric.label}
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                {currentMetric.description} • {currentPeriod?.label}
                {youtubeConnected && (
                  <span className="ml-2 text-emerald-400">
                    ✓ Dados reais do YouTube
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Líder atual */}
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <p className="text-xs sm:text-sm text-emerald-300">
              <span className="font-medium">Líder:</span> {leadingPlatform}
            </p>
          </div>
        </div>

        {/* Status da conexão */}
        <div className="mb-4 p-3 rounded-lg border flex items-center justify-between bg-gray-800/50">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                youtubeConnected
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-gray-500"
              }`}
            />
            <span className="text-sm text-gray-300">
              YouTube:{" "}
              {youtubeConnected ? "Conectado com dados reais" : "Não conectado"}
            </span>
          </div>
          {youtubeConnected && (
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span>Live</span>
            </div>
          )}
        </div>

        {/* Filtros lado a lado */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Seletor de métrica */}
          <div className="flex-1">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMetricOpen(!isMetricOpen);
                }}
                className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-gray-700/60 backdrop-blur-sm border border-gray-600/50 rounded-lg sm:rounded-xl w-full hover:bg-gray-600/60 transition-all"
              >
                <div className="flex items-center gap-2">
                  <CurrentIcon className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-200 text-sm font-medium">
                    {currentMetric.shortLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform ${
                    isMetricOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMetricOpen && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-xl shadow-2xl z-10 overflow-hidden">
                  {metrics.map((metric) => {
                    const MetricIcon = metric.icon;
                    return (
                      <button
                        key={metric.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMetric(metric.key);
                          setIsMetricOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 text-left hover:bg-gray-700 transition-all ${
                          selectedMetric === metric.key ? "bg-gray-700" : ""
                        }`}
                      >
                        <MetricIcon className="w-4 h-4 text-gray-300" />
                        <div className="flex-1">
                          <p className="text-gray-200 text-sm font-medium">
                            {metric.label}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {metric.description}
                            {metric.youtubeMetric && youtubeConnected && (
                              <span className="text-emerald-400 ml-1">
                                (Dados reais)
                              </span>
                            )}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Seletor de período */}
          <div className="flex-1">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPeriodOpen(!isPeriodOpen);
                }}
                className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-gray-700/60 backdrop-blur-sm border border-gray-600/50 rounded-lg sm:rounded-xl w-full hover:bg-gray-600/60 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-200 text-sm font-medium">
                    {currentPeriod?.label}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform ${
                    isPeriodOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isPeriodOpen && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-xl shadow-2xl z-10 overflow-hidden">
                  {periods.map((period) => (
                    <button
                      key={period.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPeriod(period.value);
                        setIsPeriodOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 text-left hover:bg-gray-700 transition-all ${
                        selectedPeriod === period.value ? "bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex-1">
                        <p className="text-gray-200 text-sm font-medium">
                          {period.label}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {period.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico principal */}
      <div className="h-60 sm:h-72 lg:h-80 xl:h-96 mb-4 sm:mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={combinedData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fontSize: 11 }}
              tickMargin={8}
              axisLine={false}
              tickLine={false}
              interval={
                selectedPeriod === "7d" ? 0 : selectedPeriod === "30d" ? 3 : 6
              }
            />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={currentMetric.format}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={45}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                fontSize: "12px",
                padding: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{
                color: "#9ca3af",
                fontSize: "11px",
                marginBottom: "6px",
                fontWeight: "500",
              }}
              labelFormatter={(label, payload) => {
                if (payload && payload[0] && payload[0].payload.fullDate) {
                  return formatTooltipDate(payload[0].payload.fullDate);
                }
                return label;
              }}
              formatter={(value, name) => [
                <span key={value} className="font-bold">
                  {currentMetric.format(value)}
                </span>,
                <span key={name} className="text-gray-300">
                  {name}
                  {name === "YouTube" && youtubeConnected && (
                    <span className="text-emerald-400 text-xs ml-1">✓</span>
                  )}
                </span>,
              ]}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "15px",
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}
            />
            {youtubeConnected && (
              <Line
                type="monotone"
                dataKey="YouTube"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ r: 0 }}
                activeDot={{
                  r: 6,
                  fill: "#ef4444",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            )}
            <Line
              type="monotone"
              dataKey="TikTok"
              stroke="#ff0050"
              strokeWidth={2.5}
              dot={{ r: 0 }}
              activeDot={{
                r: 6,
                fill: "#ff0050",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="Instagram"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={{ r: 0 }}
              activeDot={{
                r: 6,
                fill: "#8b5cf6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="Facebook"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ r: 0 }}
              activeDot={{
                r: 6,
                fill: "#3b82f6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Resumo por plataforma */}
      <div className="border-t border-gray-700/50 pt-4 sm:pt-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {Object.entries(platformTotals).map(([platform, total]) => (
            <div
              key={platform}
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border ${
                platform === leadingPlatform
                  ? "bg-emerald-500/5 border-emerald-500/30"
                  : "bg-gray-700/20 border-gray-600/30"
              } ${
                platform === "YouTube" && youtubeConnected
                  ? "border-l-4 border-l-red-500"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    platform === leadingPlatform
                      ? "text-emerald-300"
                      : "text-gray-300"
                  }`}
                >
                  {platform}
                  {platform === "YouTube" && youtubeConnected && (
                    <span className="text-red-400 text-xs ml-1">✓</span>
                  )}
                </span>
                {platform === leadingPlatform && (
                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-medium rounded">
                    Líder
                  </span>
                )}
              </div>
              <p className="text-lg sm:text-xl font-bold text-white">
                {currentMetric.format(total)}
              </p>
              <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5">
                Total no período
                {platform === "YouTube" && youtubeConnected && (
                  <span className="text-red-400 ml-1">• Dados reais</span>
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Nota sobre dados */}
        <div className="mt-4 pt-4 border-t border-gray-700/30">
          <p className="text-xs text-gray-500 text-center">
            {youtubeConnected
              ? "📊 Dados do YouTube: YouTube Analytics API (dados reais) • Período: 30 dias"
              : "📊 Dados do YouTube: Conecte sua conta para ver dados reais"}
          </p>
          <p className="text-xs text-gray-400 text-center mt-1">
            {currentDates.length > 0 &&
              `${currentDates[0]?.displayDate} - ${
                currentDates[currentDates.length - 1]?.displayDate
              }`}
          </p>
        </div>
      </div>
    </div>
  );
}
