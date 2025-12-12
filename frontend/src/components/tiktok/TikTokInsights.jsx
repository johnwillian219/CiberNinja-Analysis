// src/components/tiktok/TikTokInsights.jsx
import { TrendingUp, AlertTriangle, Zap, Clock } from "lucide-react";

const insights = [
  {
    type: "success",
    icon: TrendingUp,
    text: "Vídeos com música trending têm 3.2x mais shares",
  },
  {
    type: "success",
    icon: Zap,
    text: "Shorts postados às 20h têm 48% mais visualizações",
  },
  {
    type: "info",
    icon: Clock,
    text: "Duração ideal: vídeos de 15-21s têm maior retenção",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    text: "Vídeos com texto na tela têm 28% menos tempo de visualização",
  },
];

export default function TikTokInsights() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
        Insights da IA para TikTok
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              className={`group bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-pink-500/60 transition-all hover:shadow-2xl hover:shadow-pink-500/20`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    insight.type === "success"
                      ? "bg-emerald-500/20"
                      : insight.type === "warning"
                      ? "bg-yellow-500/20"
                      : "bg-pink-500/20"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      insight.type === "success"
                        ? "text-emerald-400"
                        : insight.type === "warning"
                        ? "text-yellow-400"
                        : "text-pink-400"
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
