// src/components/facebook/FacebookInsights.jsx
import { TrendingUp, AlertTriangle, Zap, Clock } from "lucide-react";

const insights = [
  {
    type: "success",
    icon: TrendingUp,
    text: "Vídeos nativos têm 2.8x mais alcance que links externos",
  },
  {
    type: "success",
    icon: Zap,
    text: "Postar entre 13h e 15h aumenta engajamento em 38%",
  },
  {
    type: "info",
    icon: Clock,
    text: "Publicações com 80-100 palavras têm melhor retenção",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    text: "Posts com mais de 3 hashtags têm queda de 22% no alcance",
  },
];

export default function FacebookInsights() {
  return (
    <div className="mb-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
        Insights da IA para Facebook
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              className={`group bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/60 transition-all hover:shadow-2xl hover:shadow-blue-500/20`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    insight.type === "success"
                      ? "bg-emerald-500/20"
                      : insight.type === "warning"
                      ? "bg-yellow-500/20"
                      : "bg-blue-500/20"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      insight.type === "success"
                        ? "text-emerald-400"
                        : insight.type === "warning"
                        ? "text-yellow-400"
                        : "text-blue-400"
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
