// src/components/insights/instagram/InstagramAlerts.jsx
import {
  AlertTriangle,
  Zap,
  TrendingUp,
  BarChart3,
  MessageCircle,
  Image,
} from "lucide-react";
import { useState } from "react";

const alerts = [
  {
    type: "success",
    text: "Reel viral detectado: +215% alcance em 24h",
    metric: "+215%",
    icon: TrendingUp,
    color: "purple",
    platform: "Reels",
    time: "há 2h",
  },
  {
    type: "success",
    text: "Stories com polls +45% engajamento",
    metric: "+45%",
    icon: MessageCircle,
    color: "purple",
    platform: "Stories",
    time: "hoje",
  },
  {
    type: "warning",
    text: "Alcance orgânico caiu 28%",
    metric: "-28%",
    icon: BarChart3,
    color: "orange",
    platform: "Posts",
    time: "há 1d",
  },
  {
    type: "success",
    text: "Carrossel no Explore — alto potencial",
    metric: "Explore",
    icon: Image,
    color: "purple",
    platform: "Posts",
    time: "há 4h",
  },
];

export default function InstagramAlerts() {
  const [selectedFilter, setSelectedFilter] = useState("todos");

  const filteredAlerts =
    selectedFilter === "todos"
      ? alerts
      : alerts.filter((alert) => alert.platform === selectedFilter);

  return (
    <div className="pb-16 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Insights Instagram
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Performance por formato • {alerts.length} alertas
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-sm text-gray-400">IA Ativa</span>
            <div className="flex items-center gap-1 justify-end">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-emerald-400">Analisando</p>
            </div>
          </div>
        </div>

        {/* Platform Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {["todos", "Reels", "Stories", "Posts"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedFilter === filter
                  ? filter === "todos"
                    ? "bg-gray-700 text-white"
                    : filter === "Reels"
                    ? "bg-purple-500/20 text-purple-400"
                    : filter === "Stories"
                    ? "bg-pink-500/20 text-pink-400"
                    : "bg-blue-500/20 text-blue-400"
                  : "bg-gray-800/50 text-gray-400 hover:text-white"
              }`}
            >
              {filter === "todos" ? "Todos" : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3 sm:space-y-4">
        {filteredAlerts.map((alert, i) => {
          const Icon = alert.icon;
          const isSuccess = alert.type === "success";

          return (
            <div
              key={i}
              className={`relative rounded-xl sm:rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 ${
                isSuccess
                  ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30"
                  : "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30"
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Platform Badge */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    className={`p-2.5 rounded-lg ${
                      alert.platform === "Reels"
                        ? "bg-purple-500/20"
                        : alert.platform === "Stories"
                        ? "bg-pink-500/20"
                        : "bg-blue-500/20"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isSuccess ? "text-purple-400" : "text-orange-400"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800/60 text-gray-300">
                    {alert.platform}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          isSuccess
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {isSuccess ? "OPORTUNIDADE" : "ATENÇÃO"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {alert.time}
                      </span>
                    </div>

                    {/* Metric */}
                    <span
                      className={`text-lg sm:text-xl font-bold ${
                        isSuccess ? "text-purple-400" : "text-orange-400"
                      }`}
                    >
                      {alert.metric}
                    </span>
                  </div>

                  {/* Alert Text */}
                  <p
                    className={`text-sm sm:text-base font-medium mb-3 ${
                      isSuccess ? "text-purple-100" : "text-orange-100"
                    }`}
                  >
                    {alert.text}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-gray-400">Impacto:</span>
                      <span className="text-gray-300 font-medium">Alto</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-gray-400">Formato:</span>
                      <span className="text-gray-300 font-medium">
                        {alert.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-700/30">
                <button className="flex-1 py-2 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg text-gray-300 text-sm font-medium transition-colors">
                  Ver análise
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isSuccess
                      ? "bg-purple-500/20 hover:bg-purple-500/30 text-purple-400"
                      : "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
                  }`}
                >
                  {isSuccess ? "Repetir formato" : "Otimizar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-4 rounded-xl border border-purple-500/20">
          <p className="text-xs text-gray-400 mb-1">Reels viral</p>
          <p className="text-lg font-bold text-purple-400">+215% alcance</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-xl border border-blue-500/20">
          <p className="text-xs text-gray-400 mb-1">Stories ativos</p>
          <p className="text-lg font-bold text-blue-400">+45% engajamento</p>
        </div>
      </div>
    </div>
  );
}
