// src/components/insights/general/InsightChart.jsx
import { useState, useEffect } from "react";
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
import { ChevronDown, BarChart3, Users, Clock } from "lucide-react";

/* Importar dados reais de cada plataforma
import { viewsData as youtubeViews } from "../../youtube/data/viewsData";
import { subscribersData as youtubeSubs } from "../../youtube/data/subscribersData";
import { watchTimeData as youtubeWatch } from "../../youtube/data/watchTimeData";*/

import { likesData as tiktokLikes } from "../../tiktok/data/likesData";
import { sharesData as tiktokShares } from "../../tiktok/data/sharesData";

import { reachData as instagramReach } from "../../instagram/data/reachData";
import { impressionsData as instagramImpressions } from "../../instagram/data/impressionsData";
import { savesData as instagramSaves } from "../../instagram/data/savesData";

import { reachData as facebookReach } from "../../facebook/data/reachData";
import { reactionsData as facebookReactions } from "../../facebook/data/reactionsData";
import { sharesData as facebookShares } from "../../facebook/data/sharesData";

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
      // YouTube: youtubeViews,
      //TikTok: tiktokViews,
      Instagram: instagramReach,
      Facebook: facebookReach,
    },
    format: (v) => `${(v / 1000).toFixed(0)}K`,
  },
  {
    key: "followers",
    label: "Novos Seguidores",
    shortLabel: "Seguidores",
    description: "Novas pessoas seguindo suas contas",
    icon: Users,
    color: "#10b981",
    data: {
      // YouTube: youtubeSubs,
      TikTok: tiktokLikes,
      Instagram: instagramSaves,
      Facebook: facebookReactions,
    },
    format: (v) => `${(v / 1000).toFixed(1)}K`,
  },
  {
    key: "watchTime",
    label: "Tempo Assistido",
    shortLabel: "Tempo",
    description: "Tempo total gasto no seu conteúdo",
    icon: Clock,
    color: "#f59e0b",
    data: {
      // YouTube: youtubeWatch,
      TikTok: tiktokShares,
      Instagram: instagramImpressions,
      Facebook: facebookShares,
    },
    format: (v) => `${(v / 1000).toFixed(1)}K h`,
  },
];

const periods = [
  { label: "7 dias", value: "7d", description: "Última semana" },
  { label: "30 dias", value: "30d", description: "Último mês" },
  { label: "90 dias", value: "all", description: "Últimos 3 meses" },
];

export default function InsightChart() {
  const [selectedMetric, setSelectedMetric] = useState("reach");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isMetricOpen, setIsMetricOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMetricOpen(false);
      setIsPeriodOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const currentMetric = metrics.find((m) => m.key === selectedMetric);
  const CurrentIcon = currentMetric?.icon || BarChart3;
  const currentPeriod = periods.find((p) => p.value === selectedPeriod);

  // Filtrar dados por período
  const getFilteredData = (platformData) => {
    if (selectedPeriod === "7d") return platformData.slice(-7);
    if (selectedPeriod === "30d") return platformData.slice(-30);
    return platformData.slice(-90);
  };

  // Montar dados combinados
  const combinedData = [];
  const maxLength = Math.max(
    ...Object.values(currentMetric.data).map(
      (arr) => getFilteredData(arr).length
    )
  );

  for (let i = 0; i < maxLength; i++) {
    const entry = { date: `Dia ${i + 1}` };
    Object.keys(currentMetric.data).forEach((platform) => {
      const platformArray = getFilteredData(currentMetric.data[platform]);
      entry[platform] = platformArray[i]?.value || 0;
    });
    combinedData.push(entry);
  }

  // Calcular totais por plataforma
  const platformTotals = {};
  Object.keys(currentMetric.data).forEach((platform) => {
    const platformArray = getFilteredData(currentMetric.data[platform]);
    const total = platformArray.reduce(
      (sum, item) => sum + (item?.value || 0),
      0
    );
    platformTotals[platform] = total;
  });

  // Encontrar a plataforma líder
  const leadingPlatform = Object.keys(platformTotals).reduce((a, b) =>
    platformTotals[a] > platformTotals[b] ? a : b
  );

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
                {currentMetric.description}
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
              itemStyle={{
                padding: "2px 0",
              }}
              formatter={(value, name) => [
                <span key={value} className="font-bold">
                  {currentMetric.format(value)}
                </span>,
                <span key={name} className="text-gray-300">
                  {name}
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
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
