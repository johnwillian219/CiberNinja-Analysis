// src/components/youtube/YouTubeInsights.jsx
import { TrendingUp, AlertTriangle, Zap } from "lucide-react";

const insights = [
  {
    type: "success",
    icon: TrendingUp,
    text: "Shorts estão com 42% mais engajamento que vídeos longos esta semana",
  },
  {
    type: "info",
    icon: Zap,
    text: "Seu melhor horário de postagem é às 18h (CTR 38% acima da média)",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    text: "Vídeos com mais de 15 minutos estão com retenção abaixo de 45%",
  },
  {
    type: "success",
    icon: TrendingUp,
    text: "Thumbnails com rosto + texto têm 2.8x mais CTR",
  },
];

export default function YouTubeInsights() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-8">
        Insights da IA para YouTube
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              className={`group bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-${
                insight.type === "warning" ? "yellow" : "cyan"
              }-500/50 transition-all hover:shadow-2xl hover:shadow-${
                insight.type === "warning" ? "yellow" : "cyan"
              }-500/20`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    insight.type === "success"
                      ? "bg-emerald-500/20"
                      : insight.type === "warning"
                      ? "bg-yellow-500/20"
                      : "bg-cyan-500/20"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      insight.type === "success"
                        ? "text-emerald-400"
                        : insight.type === "warning"
                        ? "text-yellow-400"
                        : "text-cyan-400"
                    }`}
                  />
                </div>
                <p className="text-white text-lg leading-relaxed">
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
