// src/components/instagram/InstagramInsights.jsx
import { TrendingUp, AlertTriangle, Zap, Clock } from "lucide-react";

const insights = [
  {
    type: "success",
    icon: TrendingUp,
    text: "Reels estão com 3.8x mais alcance que posts estáticos",
  },
  {
    type: "success",
    icon: Zap,
    text: "Postar às 19h aumenta o engajamento em 52%",
  },
  {
    type: "info",
    icon: Clock,
    text: "Stories com polls mantêm atenção por 28% mais tempo",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    text: "Carrosséis com mais de 10 slides têm retenção 35% menor",
  },
];

export default function InstagramInsights() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
        Insights da IA para Instagram
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
