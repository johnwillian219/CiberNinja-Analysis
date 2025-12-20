// src/components/insights/youtube/YouTubeAlerts.jsx
import {
  AlertTriangle,
  TrendingUp,
  Zap,
  ChevronRight,
  Clock,
  Eye,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

const alerts = [
  {
    type: "success",
    text: "YouTube cresceu 28% em watch time esta semana",
    metric: "+28%",
    icon: TrendingUp,
    color: "emerald",
    priority: "high",
  },
  {
    type: "warning",
    text: "Retenção média caiu para 42% nos vídeos longos",
    metric: "42%",
    icon: Clock,
    color: "red",
    priority: "medium",
  },
  {
    type: "success",
    text: "Shorts viral detectado: +215% views em 24h",
    metric: "+215%",
    icon: Eye,
    color: "emerald",
    priority: "high",
  },
  {
    type: "warning",
    text: "Queda de 18% no CTR das thumbnails esta semana",
    metric: "-18%",
    icon: BarChart3,
    color: "red",
    priority: "low",
  },
];

export default function YouTubeAlerts() {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const getColorClasses = (color, type) => {
    const base = {
      emerald: {
        bg: type === "success" ? "bg-emerald-500/15" : "bg-emerald-500/10",
        border:
          type === "success"
            ? "border-emerald-500/40"
            : "border-emerald-500/30",
        text: type === "success" ? "text-emerald-400" : "text-emerald-300",
        icon: type === "success" ? "text-emerald-400" : "text-emerald-400",
        metric: type === "success" ? "text-emerald-400" : "text-emerald-400",
      },
      red: {
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        text: "text-red-300",
        icon: "text-red-400",
        metric: "text-red-400",
      },
    };
    return base[color] || base.emerald;
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "Alta Prioridade";
      case "medium":
        return "Atenção";
      default:
        return "Monitorar";
    }
  };

  return (
    <div className="pb-16 sm:p-6">
      {/* Header Mobile Optimized */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-red-500/20 rounded-lg">
              <Zap className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              Alertas IA
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Análises em tempo real • {alerts.length} alertas
          </p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800/60 rounded-full">
            <span className="text-xs font-medium text-gray-300">YouTube</span>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Alert Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {alerts.map((alert, i) => {
          const colors = getColorClasses(alert.color, alert.type);
          const Icon = alert.icon;

          return (
            <div
              key={i}
              className={`relative rounded-xl sm:rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] group cursor-pointer ${colors.bg} ${colors.border}`}
              onClick={() => setExpandedAlert(expandedAlert === i ? null : i)}
            >
              {/* Alert Header */}
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Icon Container */}
                <div
                  className={`p-2.5 sm:p-3 rounded-lg ${colors.bg} border ${colors.border} flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.icon}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* First Row: Type + Priority + Metric */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}
                      >
                        {alert.type === "success" ? "OPORTUNIDADE" : "ATENÇÃO"}
                      </span>
                      <span className="text-xs text-gray-400 px-2 py-1 bg-gray-800/60 rounded-full">
                        {getPriorityBadge(alert.priority)}
                      </span>
                    </div>

                    {/* Metric Badge */}
                    <div className="hidden sm:flex items-center gap-1.5">
                      <span className={`text-lg font-bold ${colors.metric}`}>
                        {alert.metric}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 ${colors.icon} transform group-hover:translate-x-1 transition-transform`}
                      />
                    </div>
                  </div>

                  {/* Alert Text */}
                  <p
                    className={`text-sm sm:text-base font-medium ${colors.text} mb-3 line-clamp-2`}
                  >
                    {alert.text}
                  </p>

                  {/* Action Button - Mobile Only */}
                  <button
                    className="sm:hidden w-full mt-2 py-2 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg text-gray-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add action here
                    }}
                  >
                    <span>Ver detalhes</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>

                  {/* Metric Badge - Mobile Only */}
                  <div className="sm:hidden flex items-center justify-between mt-3">
                    <span className={`text-lg font-bold ${colors.metric}`}>
                      {alert.metric}
                    </span>
                    <div className="text-xs text-gray-400">
                      {alert.priority === "high"
                        ? "⚠️ Ação recomendada"
                        : "Monitorando"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedAlert === i && (
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="text-sm text-gray-400 space-y-2">
                    <p>
                      📊 <span className="text-gray-300">Detalhamento:</span>{" "}
                      Esta métrica foi analisada pela IA de performance.
                    </p>
                    <p>
                      ⏱️ <span className="text-gray-300">Período:</span> Últimos
                      7 dias
                    </p>
                    <p>
                      🎯 <span className="text-gray-300">Recomendação:</span>{" "}
                      {alert.type === "success"
                        ? "Continue com essa estratégia"
                        : "Ajuste necessário"}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 bg-gray-800/60 hover:bg-gray-800 rounded-lg text-gray-300 text-sm transition-colors">
                      Ignorar
                    </button>
                    <button className="flex-1 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-sm font-medium transition-colors">
                      Aplicar sugestão
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-6 sm:mt-8 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Alertas hoje</p>
            <p className="text-lg font-bold text-white">4</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Resolvidos</p>
            <p className="text-lg font-bold text-emerald-400">1</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Pendentes</p>
            <p className="text-lg font-bold text-yellow-400">3</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">IA Ativa</p>
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-emerald-400">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
