// src/components/facebook/FacebookChart.jsx
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown, Eye, Heart, Share2, TrendingUp } from "lucide-react";

import { reachData } from "./data/reachData";
import { reactionsData } from "./data/reactionsData";
import { sharesData } from "./data/sharesData";

const chartConfigs = [
  {
    type: "reach",
    label: "Alcance",
    fullLabel: "Alcance",
    color: "#3b82f6",
    icon: Eye,
    data: reachData,
    formatValue: (v) => `${(v / 1000).toFixed(1)}K`,
    shortFormat: (v) => `${(v / 1000).toFixed(1)}K`,
  },
  {
    type: "reactions",
    label: "Reações",
    fullLabel: "Reações",
    color: "#1d4ed8",
    icon: Heart,
    data: reactionsData,
    formatValue: (v) => `${(v / 1000).toFixed(1)}K`,
    shortFormat: (v) => `${(v / 1000).toFixed(1)}K`,
  },
  {
    type: "shares",
    label: "Shares",
    fullLabel: "Shares",
    color: "#2563eb",
    icon: Share2,
    data: sharesData,
    formatValue: (v) => `${(v / 1000).toFixed(1)}K`,
    shortFormat: (v) => `${(v / 1000).toFixed(1)}K`,
  },
];

const filters = [
  { label: "7d", value: "7d", days: 7 },
  { label: "30d", value: "30d", days: 30 },
  { label: "Tudo", value: "all", days: 90 },
];

export default function FacebookChart() {
  const [selectedChart, setSelectedChart] = useState("reach");
  const [selectedFilter, setSelectedFilter] = useState("30d");
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setIsChartOpen(false);
      setIsFilterOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const currentConfig = chartConfigs.find((c) => c.type === selectedChart);
  const CurrentIcon = currentConfig?.icon || Eye;

  const getFilteredData = () => {
    let data = currentConfig.data;
    if (selectedFilter === "7d") return data.slice(-7);
    if (selectedFilter === "30d") return data.slice(-30);
    return data.slice(-90); // Máximo 90 dias para performance
  };

  const data = getFilteredData();

  // Calcular variação percentual
  const calculateChange = () => {
    if (data.length < 2) return 0;
    const first = data[0]?.value || 0;
    const last = data[data.length - 1]?.value || 0;
    if (first === 0) return 100;
    return ((last - first) / first) * 100;
  };

  const change = calculateChange();
  const isPositive = change >= 0;

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 mb-6 sm:mb-8 lg:mb-10">
      {/* Header compacto para mobile */}
      <div className="mb-4 sm:mb-6">
        {/* Linha 1: Título e status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-gray-700/50">
              <CurrentIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white">
              {currentConfig.fullLabel}
            </h2>
          </div>

          {/* Status de variação */}
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              isPositive
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {isPositive ? "↑" : "↓"}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        </div>

        {/* Linha 2: Valor atual e seletor de período */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {data.length > 0
                ? currentConfig.shortFormat(data[data.length - 1]?.value || 0)
                : "0"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Atual</p>
          </div>

          {/* Seletor de período - Tabs para mobile */}
          <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg p-0.5">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-2 sm:px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedFilter === filter.value
                    ? "bg-gray-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gráfico principal */}
      <div className="h-48 sm:h-56 lg:h-72 xl:h-80 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id={`color${selectedChart}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={currentConfig.color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={currentConfig.color}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="2 2"
              stroke="#374151"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fontSize: 10 }}
              tickMargin={5}
              axisLine={false}
              tickLine={false}
              minTickGap={20}
            />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={currentConfig.shortFormat}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={35}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "6px",
                fontSize: "12px",
                padding: "8px",
              }}
              labelStyle={{
                color: "#9ca3af",
                fontSize: "11px",
                marginBottom: "4px",
              }}
              formatter={(value) => [
                currentConfig.formatValue(value),
                currentConfig.fullLabel,
              ]}
              separator=": "
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={currentConfig.color}
              strokeWidth={1.5}
              fillOpacity={1}
              fill={`url(#color${selectedChart})`}
              dot={false}
              activeDot={{
                r: 4,
                fill: currentConfig.color,
                stroke: "#fff",
                strokeWidth: 1,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Seletor de tipo de gráfico - Mobile friendly */}
      <div className="flex items-center justify-between">
        {/* Botões de tipo de gráfico */}
        <div className="flex items-center gap-1 bg-gray-700/50 rounded-lg p-0.5 w-full">
          {chartConfigs.map((config) => {
            const Icon = config.icon;
            const isActive = selectedChart === config.type;
            return (
              <button
                key={config.type}
                onClick={() => setSelectedChart(config.type)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gray-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Botão detalhes (opcional) */}
        <button className="ml-2 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-all flex-shrink-0">
          <TrendingUp className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      {/* Legenda e informações extras (opcional) */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>
            Período:{" "}
            {filters.find((f) => f.value === selectedFilter)?.days || 30} dias
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{data.length} pontos</span>
        </div>
        <span className="text-blue-400 font-medium">
          {isPositive ? "Crescendo" : "Decaindo"}
        </span>
      </div>
    </div>
  );
}
