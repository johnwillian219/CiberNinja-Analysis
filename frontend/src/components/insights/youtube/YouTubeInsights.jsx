// src/components/insights/youtube/YouTubeInsights.jsx
import { TrendingUp, Zap, Clock, AlertTriangle } from "lucide-react";

export default function YouTubeInsights() {
  const insights = [
    {
      type: "success",
      icon: TrendingUp,
      text: "Vídeos com hook nos primeiros 3 segundos têm 3.1x mais retenção",
    },
    {
      type: "success",
      icon: Zap,
      text: "Thumbnails com rosto humano + texto aumentam CTR em 51%",
    },
    {
      type: "info",
      icon: Clock,
      text: "Melhor horário de postagem: terças e quintas às 19h",
    },
    {
      type: "success",
      icon: TrendingUp,
      text: "Shorts estão convertendo 28% melhor em inscritos que vídeos longos",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      text: "Vídeos com mais de 15 minutos estão com retenção abaixo de 45%",
    },
    {
      type: "info",
      icon: Zap,
      text: "End screens com 'inscreva-se' geram +18% de novos inscritos",
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Insights Específicos - YouTube
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              className={`group bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-red-500/60 transition-all hover:shadow-2xl hover:shadow-red-500/20`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    insight.type === "success"
                      ? "bg-emerald-500/20"
                      : insight.type === "warning"
                      ? "bg-red-500/20"
                      : "bg-red-500/20"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      insight.type === "success"
                        ? "text-emerald-400"
                        : insight.type === "warning"
                        ? "text-red-400"
                        : "text-red-400"
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
