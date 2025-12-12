// src/components/facebook/FacebookChart.jsx
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

import { reachData } from "./data/reachData";
import { reactionsData } from "./data/reactionsData";
import { sharesData } from "./data/sharesData";

const chartConfigs = [
  {
    type: "reach",
    label: "Alcance",
    color: "#3b82f6",
    data: reachData,
    format: (v) => `${(v / 1000).toFixed(1)}K`,
  },
  {
    type: "reactions",
    label: "Reações",
    color: "#1d4ed8",
    data: reactionsData,
    format: (v) => `${(v / 1000).toFixed(1)}K`,
  },
  {
    type: "shares",
    label: "Shares",
    color: "#2563eb",
    data: sharesData,
    format: (v) => `${(v / 1000).toFixed(1)}K`,
  },
];

const filters = [
  { label: "Últimos 7 dias", value: "7d" },
  { label: "Últimos 30 dias", value: "30d" },
  { label: "Todos os tempos", value: "all" },
];

export default function FacebookChart() {
  const [selectedChart, setSelectedChart] = useState("reach");
  const [selectedFilter, setSelectedFilter] = useState("30d");
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const currentConfig = chartConfigs.find((c) => c.type === selectedChart);
  const currentData = currentConfig.data;

  const getFilteredData = () => {
    if (selectedFilter === "7d") return currentData.slice(-7);
    if (selectedFilter === "30d") return currentData.slice(-30);
    return currentData;
  };

  const data = getFilteredData();

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 mb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-white">
          {currentConfig.label}
        </h2>

        <div className="flex gap-4">
          {/* Seletor de gráfico */}
          <div className="relative">
            <button
              onClick={() => setIsChartOpen(!isChartOpen)}
              className="flex items-center gap-3 px-6 py-3.5 bg-gray-700/80 rounded-2xl text-white font-medium hover:bg-gray-600 transition-all"
            >
              {currentConfig.label}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isChartOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isChartOpen && (
              <div className="absolute top-full mt-2 right-0 w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-10">
                {chartConfigs.map((config) => (
                  <button
                    key={config.type}
                    onClick={() => {
                      setSelectedChart(config.type);
                      setIsChartOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3.5 text-white hover:bg-blue-500/20 transition-all ${
                      selectedChart === config.type ? "bg-blue-500/20" : ""
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filtro de período */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-3 px-6 py-3.5 bg-gray-700/80 rounded-2xl text-white font-medium hover:bg-gray-600 transition-all"
            >
              {filters.find((f) => f.value === selectedFilter)?.label}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isFilterOpen && (
              <div className="absolute top-full mt-2 right-0 w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-10">
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setSelectedFilter(filter.value);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3.5 text-white hover:bg-blue-500/20 transition-all ${
                      selectedFilter === filter.value ? "bg-blue-500/20" : ""
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={440}>
        <AreaChart data={data}>
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
          <CartesianGrid strokeDasharray="4 4" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" tickFormatter={currentConfig.format} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "12px",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={currentConfig.format}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={currentConfig.color}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#color${selectedChart})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
