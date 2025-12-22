// src/components/youtube/YouTubeChart.jsx

import { useState, useEffect, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Clock,
  RefreshCw,
  Calendar,
  Filter,
  ChevronDown,
  Zap,
  BarChart3,
  PlayCircle,
  MessageSquare,
  Heart,
  DollarSign,
  Info,
} from "lucide-react";

import { useYouTubeData } from "../../hooks/useYouTubeData";

// Configurações das métricas disponíveis
const metricConfigs = {
  views: {
    label: "Visualizações",
    icon: Eye,
    color: "#ef4444",
    gradientStart: "#ef4444",
    gradientEnd: "#f87171",
    formatValue: (value) => {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
      return value.toLocaleString("pt-BR");
    },
    unit: "",
  },
  subscribersGained: {
    label: "Inscritos Ganhos",
    icon: Users,
    color: "#10b981",
    gradientStart: "#10b981",
    gradientEnd: "#34d399",
    formatValue: (value) => {
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toLocaleString("pt-BR");
    },
    unit: "",
  },
  watchTime: {
    label: "Tempo de Exibição",
    icon: Clock,
    color: "#8b5cf6",
    gradientStart: "#8b5cf6",
    gradientEnd: "#a78bfa",
    formatValue: (value) => {
      const hours = Math.round(value / 60);
      if (hours >= 1000) return `${(hours / 1000).toFixed(1)}K`;
      return hours.toLocaleString("pt-BR");
    },
    unit: "h",
  },
  likes: {
    label: "Curtidas",
    icon: Heart,
    color: "#f59e0b",
    gradientStart: "#f59e0b",
    gradientEnd: "#fbbf24",
    formatValue: (value) => {
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toLocaleString("pt-BR");
    },
    unit: "",
  },
  comments: {
    label: "Comentários",
    icon: MessageSquare,
    color: "#06b6d4",
    gradientStart: "#06b6d4",
    gradientEnd: "#22d3ee",
    formatValue: (value) => {
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toLocaleString("pt-BR");
    },
    unit: "",
  },
  estimatedRevenue: {
    label: "Receita Estimada",
    icon: DollarSign,
    color: "#84cc16",
    gradientStart: "#84cc16",
    gradientEnd: "#a3e635",
    formatValue: (value) => {
      if (!value) return "R$ 0";
      if (value >= 1000) return `R$ ${(value / 1000).toFixed(1)}K`;
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    },
    unit: "",
  },
};

// Períodos disponíveis
const periods = [
  { id: 7, label: "7 dias" },
  { id: 14, label: "14 dias" },
  { id: 30, label: "30 dias" },
  { id: 90, label: "90 dias" },
];

export default function YouTubeChart() {
  const { data, loading, error, lastUpdated, refetch, hasData } =
    useYouTubeData();

  const [selectedMetric, setSelectedMetric] = useState("views");
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showMetricSelector, setShowMetricSelector] = useState(false);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);

  // Formatar data para exibição
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })
      .replace(/ de /g, "/");
  };

  // Processar dados para o gráfico
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Filtrar pelo período selecionado
    const filteredData = data.slice(-selectedPeriod);

    // Processar cada dia
    return filteredData.map((item) => {
      const date = formatDate(item.day);
      const value = item[selectedMetric] || 0;

      return {
        date,
        value,
        rawDate: item.day,
        fullDate: new Date(item.day).toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }),
      };
    });
  }, [data, selectedMetric, selectedPeriod]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    if (!chartData || chartData.length === 0) return null;

    const values = chartData.map((d) => d.value);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    // Encontrar dia com valor máximo
    const maxDay = chartData.find((d) => d.value === maxValue);

    // Calcular variação (último vs primeiro)
    const firstValue = chartData[0]?.value || 0;
    const lastValue = chartData[chartData.length - 1]?.value || 0;
    const change =
      firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

    return {
      total,
      average,
      maxValue,
      minValue,
      maxDay,
      change,
    };
  }, [chartData]);

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    const dataPoint = payload[0].payload;
    const config = metricConfigs[selectedMetric];

    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-sm font-medium text-gray-300 mb-2">
          {dataPoint.fullDate}
        </p>
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <span className="text-sm text-gray-400">{config.label}:</span>
        </div>
        <p className="text-xl font-bold text-white">
          {config.formatValue(dataPoint.value)} {config.unit}
        </p>
      </div>
    );
  };

  // Auto-refresh
  useEffect(() => {
    let interval;
    if (autoRefresh && hasData) {
      interval = setInterval(() => {
        refetch();
      }, 5 * 60 * 1000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh, hasData, refetch]);

  // Loading
  if (loading && !hasData) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6 animate-pulse">
        <div className="h-7 w-48 bg-gray-700 rounded mb-4" />
        <div className="h-64 bg-gray-700 rounded-xl mb-4" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Erro
  if (error || !hasData) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6">
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">
            {error ? "Erro ao carregar" : "Sem dados"}
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            {error?.message || "Conecte sua conta para ver os gráficos."}
          </p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const config = metricConfigs[selectedMetric];

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 md:p-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <config.icon className="w-5 h-5" style={{ color: config.color }} />
            <h2 className="text-xl font-bold text-white">{config.label}</h2>
          </div>
          <p className="text-sm text-gray-400">
            Evolução ao longo do tempo •{" "}
            {periods.find((p) => p.id === selectedPeriod)?.label}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ${
              autoRefresh
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-gray-700/50 text-gray-400 border border-gray-600"
            }`}
            title="Atualização automática"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                autoRefresh ? "animate-spin-slow" : ""
              }`}
            />
            <span className="hidden sm:inline">Auto</span>
          </button>

          <button
            onClick={refetch}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600 border border-gray-600 text-gray-300 hover:text-white rounded-lg text-xs transition-colors"
            title="Atualizar dados"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Seletor de métrica */}
        <div className="relative flex-1">
          <button
            onClick={() => setShowMetricSelector(!showMetricSelector)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors w-full"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">{config.label}</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </button>

          {showMetricSelector && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMetricSelector(false)}
              />
              <div className="absolute top-full mt-2 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20">
                <div className="p-2">
                  <p className="text-xs text-gray-400 px-2 py-1">
                    Selecione uma métrica:
                  </p>
                  {Object.entries(metricConfigs).map(([key, metric]) => {
                    const Icon = metric.icon;
                    const isActive = key === selectedMetric;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedMetric(key);
                          setShowMetricSelector(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm w-full hover:bg-gray-700 transition-colors rounded ${
                          isActive ? "text-white" : "text-gray-300"
                        }`}
                        style={
                          isActive
                            ? {
                                backgroundColor: `${metric.color}20`,
                                borderLeft: `3px solid ${metric.color}`,
                              }
                            : {}
                        }
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: metric.color }}
                        />
                        <span className="text-left flex-1">{metric.label}</span>
                        {isActive && (
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: metric.color }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Seletor de período */}
        <div className="relative flex-1">
          <button
            onClick={() => setShowPeriodSelector(!showPeriodSelector)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors w-full"
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              {periods.find((p) => p.id === selectedPeriod)?.label}
            </span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </button>

          {showPeriodSelector && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowPeriodSelector(false)}
              />
              <div className="absolute top-full mt-2 left-0 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20">
                <div className="p-2">
                  <p className="text-xs text-gray-400 px-2 py-1">
                    Período de análise:
                  </p>
                  {periods.map((period) => {
                    const isActive = period.id === selectedPeriod;
                    return (
                      <button
                        key={period.id}
                        onClick={() => {
                          setSelectedPeriod(period.id);
                          setShowPeriodSelector(false);
                        }}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm w-full hover:bg-gray-700 transition-colors rounded ${
                          isActive ? "text-white bg-gray-700" : "text-gray-300"
                        }`}
                      >
                        <span className="flex-1 text-left">{period.label}</span>
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Gráfico */}
      <div className="h-64 md:h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={config.color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              horizontal={true}
              vertical={false}
            />

            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              minTickGap={20}
            />

            <YAxis
              stroke="#9ca3af"
              fontSize={11}
              axisLine={false}
              tickLine={false}
              width={35}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value;
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: config.color,
                strokeWidth: 1,
                strokeOpacity: 0.3,
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={config.color}
              strokeWidth={2}
              fill="url(#gradient)"
              fillOpacity={0.3}
              dot={{
                r: 3,
                fill: config.color,
                strokeWidth: 2,
                stroke: "#1f2937",
              }}
              activeDot={{
                r: 5,
                fill: config.color,
                stroke: "#1f2937",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Estatísticas */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Total */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <PlayCircle
                  className="w-4 h-4"
                  style={{ color: config.color }}
                />
              </div>
              <span className="text-sm text-gray-400">Total</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {config.formatValue(stats.total)} {config.unit}
            </p>
          </div>

          {/* Média */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <BarChart3
                  className="w-4 h-4"
                  style={{ color: config.color }}
                />
              </div>
              <span className="text-sm text-gray-400">Média/dia</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {config.formatValue(stats.average)} {config.unit}
            </p>
          </div>

          {/* Pico */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <Zap className="w-4 h-4" style={{ color: config.color }} />
              </div>
              <span className="text-sm text-gray-400">Pico</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {config.formatValue(stats.maxValue)} {config.unit}
            </p>
            {stats.maxDay && (
              <p className="text-xs text-gray-500 mt-1">
                {stats.maxDay.fullDate}
              </p>
            )}
          </div>

          {/* Variação */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="p-1.5 rounded-lg"
                style={{ backgroundColor: `${config.color}20` }}
              >
                {stats.change >= 0 ? (
                  <TrendingUp
                    className="w-4 h-4"
                    style={{ color: config.color }}
                  />
                ) : (
                  <TrendingDown
                    className="w-4 h-4"
                    style={{ color: "#ef4444" }}
                  />
                )}
              </div>
              <span className="text-sm text-gray-400">Variação</span>
            </div>
            <p
              className={`text-2xl font-bold ${
                stats.change >= 0 ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {stats.change >= 0 ? "+" : ""}
              {stats.change.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">do início ao fim</p>
          </div>
        </div>
      )}

      {/* Informações adicionais */}
      <div className="mt-6 pt-6 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Info className="w-4 h-4" />
            <span>Geração automática de gráficos</span>
          </div>
          <div className="text-gray-500">Dados em tempo real • API YouTube</div>
        </div>
      </div>
    </div>
  );
}
