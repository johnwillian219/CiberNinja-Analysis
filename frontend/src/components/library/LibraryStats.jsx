// src/components/library/LibraryStats.jsx - Versão com gráficos
import {
  PlayCircle,
  Eye,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
  Zap,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

export default function LibraryStats() {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showChart, setShowChart] = useState(false);

  const metrics = [
    {
      id: "content",
      label: "Conteúdos",
      value: "428",
      secondaryValue: "+12 esta semana",
      icon: PlayCircle,
      gradient: "from-purple-500 to-pink-500",
      trend: "up",
      trendValue: "+8%",
      data: [40, 45, 42, 48, 50, 52, 55],
    },
    {
      id: "views",
      label: "Visualizações",
      value: "8.5M",
      secondaryValue: "+1.2M mês passado",
      icon: Eye,
      gradient: "from-cyan-500 to-blue-500",
      trend: "up",
      trendValue: "+28%",
      data: [65, 70, 68, 75, 80, 85, 90],
    },
    {
      id: "likes",
      label: "Likes",
      value: "485K",
      secondaryValue: "+32K esta semana",
      icon: ThumbsUp,
      gradient: "from-emerald-500 to-teal-500",
      trend: "up",
      trendValue: "+15%",
      data: [30, 35, 38, 42, 45, 48, 52],
    },
    {
      id: "comments",
      label: "Comentários",
      value: "24.8K",
      secondaryValue: "+1.8K esta semana",
      icon: MessageCircle,
      gradient: "from-orange-500 to-red-500",
      trend: "up",
      trendValue: "+8%",
      data: [20, 22, 25, 28, 30, 32, 35],
    },
    {
      id: "growth",
      label: "Crescimento",
      value: "+28%",
      secondaryValue: "vs mês anterior",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      trend: "up",
      trendValue: "+5%",
      data: [15, 18, 20, 22, 25, 28, 30],
    },
  ];

  const selectedMetricData = metrics.find((m) => m.id === selectedMetric);

  return (
    <div className="mb-6 md:mb-10">
      {/* Grid de métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.id;

          return (
            <button
              key={metric.id}
              onClick={() => {
                setSelectedMetric(isSelected ? null : metric.id);
                setShowChart(true);
              }}
              className={`text-left rounded-lg md:rounded-xl p-3 md:p-4 transition-all duration-200 ${
                isSelected
                  ? `bg-gradient-to-br ${metric.gradient}/20 border ${
                      metric.gradient.split(" ")[0]
                    }/30`
                  : "bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>

                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <ChevronUp className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                  ) : (
                    <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                  )}
                  <span
                    className={`text-xs md:text-sm font-medium ${
                      metric.trend === "up"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {metric.trendValue}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xl md:text-2xl font-bold text-white mb-0.5">
                  {metric.value}
                </p>
                <p className="text-gray-300 text-xs md:text-sm font-medium truncate">
                  {metric.label}
                </p>
              </div>

              {/* Mini gráfico (apenas desktop) */}
              <div className="hidden md:block mt-2 h-12">
                <div className="flex items-end h-full gap-px">
                  {metric.data.map((value, index) => {
                    const height = (value / 100) * 100;
                    return (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-current/30 to-current/10 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                    );
                  })}
                </div>
              </div>

              {/* Valor secundário (apenas desktop) */}
              <p className="hidden md:block text-gray-400 text-xs mt-1">
                {metric.secondaryValue}
              </p>
            </button>
          );
        })}
      </div>

      {/* Painel de detalhes expandido (apenas desktop quando selecionado) */}
      {selectedMetric && showChart && (
        <div className="hidden md:block mt-4 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedMetricData.gradient} flex items-center justify-center`}
              >
                <selectedMetricData.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {selectedMetricData.label}
                </h3>
                <p className="text-gray-400 text-sm">
                  {selectedMetricData.secondaryValue}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowChart(false)}
              className="text-gray-400 hover:text-white"
            >
              Fechar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-2">Tendência semanal</p>
              <div className="flex items-end h-24 gap-1">
                {selectedMetricData.data.map((value, index) => {
                  const height = (value / 100) * 100;
                  const days = [
                    "Dom",
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sáb",
                  ];
                  return (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div
                        className={`w-full bg-gradient-to-t ${selectedMetricData.gradient} rounded-t-lg`}
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-gray-400 text-xs mt-1">
                        {days[index]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-sm">Média diária</p>
                <p className="text-white text-xl font-bold">
                  {Math.round(
                    selectedMetricData.data.reduce((a, b) => a + b, 0) /
                      selectedMetricData.data.length
                  )}
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-3">
                <p className="text-gray-400 text-sm">Pico semanal</p>
                <p className="text-white text-xl font-bold">
                  {Math.max(...selectedMetricData.data)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
