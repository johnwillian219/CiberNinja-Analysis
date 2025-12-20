// src/components/insights/facebook/FacebookAlerts.jsx
import {
  AlertTriangle,
  Zap,
  Users,
  TrendingUp,
  Link,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

const alerts = [
  {
    type: "success",
    text: "Live com alta interação: +215% alcance",
    metric: "+215%",
    icon: TrendingUp,
    format: "Live",
    priority: "high",
  },
  {
    type: "success",
    text: "Post educativo no feed recomendado",
    metric: "Feed",
    icon: Users,
    format: "Post",
    priority: "medium",
  },
  {
    type: "warning",
    text: "Alcance orgânico caiu 22%",
    metric: "-22%",
    icon: BarChart3,
    format: "Geral",
    priority: "medium",
  },
  {
    type: "warning",
    text: "Links externos penalizados pelo algoritmo",
    metric: "Alerta",
    icon: Link,
    format: "Links",
    priority: "high",
  },
];

export default function FacebookAlerts() {
  const [sortBy, setSortBy] = useState("priority");

  const sortedAlerts = [...alerts].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className="pb-16 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Monitor Facebook
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              Análise de algoritmo • {alerts.length} alertas
            </p>
          </div>

          {/* Sort Button */}
          <button
            onClick={() =>
              setSortBy(sortBy === "priority" ? "time" : "priority")
            }
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 hover:bg-gray-800/80 rounded-lg text-gray-300 text-sm transition-colors"
          >
            <span>
              Ordenar por: {sortBy === "priority" ? "Prioridade" : "Tempo"}
            </span>
            <AlertTriangle className="w-3 h-3" />
          </button>
        </div>

        {/* Mobile Sort */}
        <div className="sm:hidden flex gap-2 overflow-x-auto pb-2">
          {["Todos", "Prioridade", "Sucesso", "Atenção"].map((filter) => (
            <button
              key={filter}
              className="px-3 py-1.5 bg-gray-800/50 hover:bg-gray-800/70 rounded-lg text-gray-300 text-xs font-medium transition-colors whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3 sm:space-y-4">
        {sortedAlerts.map((alert, i) => {
          const Icon = alert.icon;
          const isSuccess = alert.type === "success";

          return (
            <div
              key={i}
              className={`relative rounded-xl sm:rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 ${
                isSuccess
                  ? "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/50"
                  : "bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50"
              } ${
                alert.priority === "high"
                  ? "ring-1 ring-offset-2 ring-offset-gray-900"
                  : ""
              }`}
            >
              {/* Priority Indicator */}
              {alert.priority === "high" && (
                <div className="absolute -top-2 -left-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                </div>
              )}

              <div className="flex items-start gap-3 sm:gap-4">
                {/* Format Badge */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    className={`p-2.5 rounded-lg ${
                      isSuccess ? "bg-blue-500/20" : "bg-orange-500/20"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isSuccess ? "text-blue-400" : "text-orange-400"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800/60 text-gray-300">
                    {alert.format}
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
                        {isSuccess ? "PERFORMANCE" : "ALERTA"}
                      </span>
                      {alert.priority === "high" && (
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                          URGENTE
                        </span>
                      )}
                    </div>

                    {/* Metric */}
                    <span
                      className={`text-lg sm:text-xl font-bold ${
                        isSuccess ? "text-blue-400" : "text-orange-400"
                      }`}
                    >
                      {alert.metric}
                    </span>
                  </div>

                  {/* Alert Text */}
                  <p
                    className={`text-sm sm:text-base font-medium mb-3 ${
                      isSuccess ? "text-blue-100" : "text-orange-100"
                    }`}
                  >
                    {alert.text}
                  </p>

                  {/* Details Row */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            alert.priority === "high"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                        <span className="text-gray-400">Prioridade:</span>
                        <span
                          className={`font-medium ${
                            alert.priority === "high"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {alert.priority === "high" ? "Alta" : "Média"}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                        <span className="text-gray-400">Formato:</span>
                        <span className="text-gray-300 font-medium">
                          {alert.format}
                        </span>
                      </div>
                    </div>

                    {/* Time Indicator */}
                    <div className="flex items-center gap-1 text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-xs">Em tempo real</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-700/30">
                <button className="flex-1 py-2 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg text-gray-300 text-sm font-medium transition-colors">
                  Detalhes
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isSuccess
                      ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400"
                      : "bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
                  }`}
                >
                  {isSuccess ? "Repetir" : "Corrigir"}
                </button>
                {alert.priority === "high" && (
                  <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                    🔔
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Footer */}
      <div className="mt-6 sm:mt-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-xl border border-blue-500/20">
            <p className="text-xs text-gray-400 mb-1">Alcance total</p>
            <p className="text-base font-bold text-blue-400">+215%</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-3 rounded-xl border border-emerald-500/20">
            <p className="text-xs text-gray-400 mb-1">Interação</p>
            <p className="text-base font-bold text-emerald-400">Alta</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-3 rounded-xl border border-orange-500/20">
            <p className="text-xs text-gray-400 mb-1">Alertas</p>
            <p className="text-base font-bold text-orange-400">2 urgentes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
