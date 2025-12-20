// src/components/tiktok/TikTokInsights.jsx
import { TrendingUp, AlertTriangle, Zap } from "lucide-react";

const insights = [
  {
    type: "success",
    icon: TrendingUp,
    text: "Vídeos com som trending têm 3.2x mais alcance",
  },
  {
    type: "info",
    icon: Zap,
    text: "Melhor horário: 21h (alcance 45% acima da média)",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    text: "Vídeos >60s com retenção <40% nos primeiros 10s",
  },
  {
    type: "success",
    icon: TrendingUp,
    text: "Hook nos primeiros 3s aumenta views em 2.5x",
  },
];

export default function TikTokInsights() {
  return (
    <div className="mb-8 sm:mb-10 lg:mb-12">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center lg:text-left">
        Insights da IA para TikTok
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              className={`group bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-${
                insight.type === "warning" ? "yellow" : "pink"
              }-500/50 transition-all hover:shadow-xl lg:hover:shadow-2xl hover:shadow-${
                insight.type === "warning" ? "yellow" : "pink"
              }-500/20`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div
                  className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl ${
                    insight.type === "success"
                      ? "bg-emerald-500/20"
                      : insight.type === "warning"
                      ? "bg-yellow-500/20"
                      : "bg-pink-500/20"
                  } flex-shrink-0`}
                >
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      insight.type === "success"
                        ? "text-emerald-400"
                        : insight.type === "warning"
                        ? "text-yellow-400"
                        : "text-pink-400"
                    }`}
                  />
                </div>
                <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
                  {insight.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
