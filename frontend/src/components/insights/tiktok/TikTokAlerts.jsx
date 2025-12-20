// src/components/insights/tiktok/TikTokAlerts.jsx
import {
  AlertTriangle,
  Flame,
  Zap,
  ChevronRight,
  TrendingUp,
  Eye,
  Users,
} from "lucide-react";
import { useState } from "react";

const alerts = [
  {
    type: "success",
    text: "Vídeo viral detectado: +215% views em 24h",
    metric: "+215%",
    icon: Flame,
    color: "pink",
    priority: "high",
    time: "há 3h",
  },
  {
    type: "success",
    text: "TikTok cresceu 48% em alcance esta semana",
    metric: "+48%",
    icon: TrendingUp,
    color: "pink",
    priority: "medium",
    time: "hoje",
  },
  {
    type: "warning",
    text: "Queda de 31% no tempo de visualização médio",
    metric: "-31%",
    icon: Eye,
    color: "orange",
    priority: "medium",
    time: "há 1d",
  },
  {
    type: "success",
    text: "Áudio original entrou no trending",
    metric: "Trending",
    icon: Users,
    color: "pink",
    priority: "high",
    time: "há 2h",
  },
];

export default function TikTokAlerts() {
  const [expandedAlert, setExpandedAlert] = useState(null);

  return (
    <div className=" pb-16 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-pink-500/20 rounded-lg">
              <Zap className="w-4 h-4 text-pink-400 animate-pulse" />
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              Alertas TikTok
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">
            Análises em tempo real • Viralidade monitorada
          </p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800/60 rounded-full">
            <Flame className="w-3 h-3 text-pink-400 animate-pulse" />
            <span className="text-xs font-medium text-gray-300">TikTok</span>
          </div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3 sm:space-y-4">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          const isSuccess = alert.type === "success";

          return (
            <div
              key={i}
              className={`relative rounded-xl sm:rounded-2xl p-4 border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] group cursor-pointer ${
                isSuccess
                  ? "bg-pink-500/10 border-pink-500/30 hover:border-pink-500/50"
                  : "bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50"
              }`}
              onClick={() => setExpandedAlert(expandedAlert === i ? null : i)}
            >
              {/* Main Content */}
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Icon with Glow Effect */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`p-2.5 sm:p-3 rounded-lg ${
                      isSuccess ? "bg-pink-500/20" : "bg-orange-500/20"
                    } border ${
                      isSuccess ? "border-pink-500/40" : "border-orange-500/40"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        isSuccess ? "text-pink-400" : "text-orange-400"
                      }`}
                    />
                  </div>
                  {alert.priority === "high" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Alert Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          isSuccess
                            ? "bg-pink-500/20 text-pink-400"
                            : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {isSuccess ? "VIRAL" : "ATENÇÃO"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {alert.time}
                      </span>
                    </div>

                    {/* Metric Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg font-bold ${
                          isSuccess ? "text-pink-400" : "text-orange-400"
                        }`}
                      >
                        {alert.metric}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isSuccess ? "text-pink-400" : "text-orange-400"
                        } transform group-hover:translate-x-1 transition-transform`}
                      />
                    </div>
                  </div>

                  {/* Alert Text */}
                  <p
                    className={`text-sm sm:text-base font-medium mb-3 ${
                      isSuccess ? "text-pink-200" : "text-orange-200"
                    }`}
                  >
                    {alert.text}
                  </p>

                  {/* Action Buttons - Mobile */}
                  <div className="sm:hidden flex gap-2 mt-3">
                    <button className="flex-1 py-2 bg-gray-800/40 hover:bg-gray-800/60 rounded-lg text-gray-300 text-xs font-medium transition-colors">
                      Ver detalhes
                    </button>
                    {alert.priority === "high" && (
                      <button className="flex-1 py-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded-lg text-xs font-medium transition-colors">
                        Ação urgente
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedAlert === i && (
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="text-sm text-gray-400 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-300">Impacto estimado:</span>
                      <span className="text-pink-300 font-medium">Alto</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <span className="text-gray-300">Recomendação:</span>
                      <span className="text-gray-300">
                        Criar conteúdo similar
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 bg-gray-800/60 hover:bg-gray-800 rounded-lg text-gray-300 text-sm transition-colors">
                      Ignorar
                    </button>
                    <button className="flex-1 py-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded-lg text-sm font-medium transition-colors">
                      Criar conteúdo
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 sm:mt-8">
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
          <div className="bg-gray-800/40 p-3 rounded-xl border border-gray-700/30">
            <p className="text-xs text-gray-400 mb-1">Conteúdo viral</p>
            <p className="text-lg font-bold text-pink-400">2</p>
          </div>
          <div className="bg-gray-800/40 p-3 rounded-xl border border-gray-700/30">
            <p className="text-xs text-gray-400 mb-1">Tendências</p>
            <p className="text-lg font-bold text-emerald-400">3</p>
          </div>
          <div className="bg-gray-800/40 p-3 rounded-xl border border-gray-700/30">
            <p className="text-xs text-gray-400 mb-1">Alerta IA</p>
            <div className="flex items-center gap-1">
              <Flame className="w-4 h-4 text-pink-400 animate-pulse" />
              <p className="text-sm font-medium text-pink-400">Ativa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
