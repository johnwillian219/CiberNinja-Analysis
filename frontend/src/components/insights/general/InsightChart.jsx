// src/components/insights/general/InsightChart.jsx
import { useState } from "react";
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
import { ChevronDown } from "lucide-react";

// Importar dados reais de cada plataforma
import { viewsData as youtubeViews } from "../../youtube/data/viewsData";
import { subscribersData as youtubeSubs } from "../../youtube/data/subscribersData";
import { watchTimeData as youtubeWatch } from "../../youtube/data/watchTimeData";

import { viewsData as tiktokViews } from "../../tiktok/data/viewsData";
import { likesData as tiktokLikes } from "../../tiktok/data/likesData"; // usando likes como proxy de engajamento
import { sharesData as tiktokShares } from "../../tiktok/data/sharesData"; // usando shares como proxy de tempo de exibição

import { reachData as instagramReach } from "../../instagram/data/reachData";
import { impressionsData as instagramImpressions } from "../../instagram/data/impressionsData"; // usando como proxy de watch time
import { savesData as instagramSaves } from "../../instagram/data/savesData"; // usando como proxy de seguidores

import { reachData as facebookReach } from "../../facebook/data/reachData";
import { reactionsData as facebookReactions } from "../../facebook/data/reactionsData";
import { sharesData as facebookShares } from "../../facebook/data/sharesData";

// Métricas disponíveis
const metrics = [
  {
    key: "reach",
    label: "Alcance",
    color: "#8b5cf6",
    data: {
      YouTube: youtubeViews,
      TikTok: tiktokViews,
      Instagram: instagramReach,
      Facebook: facebookReach,
    },
    format: (v) => `${(v / 1000).toFixed(0)}K`,
  },
  {
    key: "followers",
    label: "Seguidores Ganhos",
    color: "#10b981",
    data: {
      YouTube: youtubeSubs,
      TikTok: tiktokLikes, // proxy (TikTok não tem "seguidores" da mesma forma)
      Instagram: instagramSaves, // proxy
      Facebook: facebookReactions, // proxy
    },
    format: (v) => `${(v / 1000).toFixed(1)}K`,
  },
  {
    key: "watchTime",
    label: "Tempo de Visualização",
    color: "#f59e0b",
    data: {
      YouTube: youtubeWatch,
      TikTok: tiktokShares, // proxy (shares indicam atenção)
      Instagram: instagramImpressions, // proxy
      Facebook: facebookShares, // proxy
    },
    format: (v) => `${(v / 1000).toFixed(1)}K h`,
  },
];

const periods = [
  { label: "Últimos 7 dias", value: "7d" },
  { label: "Últimos 30 dias", value: "30d" },
  { label: "Todos os tempos", value: "all" },
];

export default function InsightChart() {
  const [selectedMetric, setSelectedMetric] = useState("reach");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isMetricOpen, setIsMetricOpen] = useState(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const currentMetric = metrics.find((m) => m.key === selectedMetric);
  const currentPeriodLabel = periods.find(
    (p) => p.value === selectedPeriod
  )?.label;

  // Filtrar dados por período
  const getFilteredData = (platformData) => {
    if (selectedPeriod === "7d") return platformData.slice(-7);
    if (selectedPeriod === "30d") return platformData.slice(-30);
    return platformData;
  };

  // Montar dados combinados
  const combinedData = [];
  const maxLength = Math.max(
    ...Object.values(currentMetric.data).map((arr) => arr.length)
  );

  for (let i = 0; i < maxLength; i++) {
    const entry = { date: `Dia ${i + 1}` };
    Object.keys(currentMetric.data).forEach((platform) => {
      const platformArray = getFilteredData(currentMetric.data[platform]);
      entry[platform] = platformArray[i]?.value || 0;
    });
    combinedData.push(entry);
  }

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 mb-16">
      {/* Cabeçalho do gráfico */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-white">
          {currentMetric.label}
        </h2>

        <div className="flex gap-4">
          {/* Seletor de métrica */}
          <div className="relative">
            <button
              onClick={() => setIsMetricOpen(!isMetricOpen)}
              className="flex items-center gap-3 px-6 py-3.5 bg-gray-700/80 rounded-2xl text-white font-medium hover:bg-gray-600 transition-all"
            >
              {currentMetric.label}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isMetricOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isMetricOpen && (
              <div className="absolute top-full mt-3 right-0 w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-10">
                {metrics.map((metric) => (
                  <button
                    key={metric.key}
                    onClick={() => {
                      setSelectedMetric(metric.key);
                      setIsMetricOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3.5 text-white hover:bg-gray-700 transition-all ${
                      selectedMetric === metric.key ? "bg-gray-700" : ""
                    }`}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Seletor de período */}
          <div className="relative">
            <button
              onClick={() => setIsPeriodOpen(!isPeriodOpen)}
              className="flex items-center gap-3 px-6 py-3.5 bg-gray-700/80 rounded-2xl text-white font-medium hover:bg-gray-600 transition-all"
            >
              {currentPeriodLabel}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isPeriodOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isPeriodOpen && (
              <div className="absolute top-full mt-3 right-0 w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl z-10">
                {periods.map((period) => (
                  <button
                    key={period.value}
                    onClick={() => {
                      setSelectedPeriod(period.value);
                      setIsPeriodOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3.5 text-white hover:bg-gray-700 transition-all ${
                      selectedPeriod === period.value ? "bg-gray-700" : ""
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="4 4" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" tickFormatter={currentMetric.format} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "12px",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={currentMetric.format}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="YouTube"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="TikTok"
            stroke="#ff0050"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Instagram"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Facebook"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
