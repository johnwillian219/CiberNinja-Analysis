// src/components/insights/tiktok/TikTokInsights.jsx
import { TrendingUp, Zap, Clock, AlertTriangle, Music } from "lucide-react";

export default function TikTokInsights() {
  const insights = [
    {
      type: "success",
      icon: TrendingUp,
      text: "Vídeos com música trending têm 3.8x mais shares e duets",
    },
    {
      type: "success",
      icon: Music,
      text: "Uso de áudio original aumentou o tempo de visualização em 42%",
    },
    {
      type: "info",
      icon: Clock,
      text: "Melhor horário de postagem: 20h às 22h (pico de atividade)",
    },
    {
      type: "success",
      icon: Zap,
      text: "Vídeos de 15-21 segundos têm a maior taxa de conclusão (68%)",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      text: "Vídeos com texto na tela reduzem o tempo de visualização em 31%",
    },
    {
      type: "success",
      icon: TrendingUp,
      text: "Hashtags com 3-5 termos performam 28% melhor que mais hashtags",
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Insights Específicos - TikTok
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      ? "bg-pink-500/20"
                      : "bg-purple-500/20"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      insight.type === "success"
                        ? "text-emerald-400"
                        : insight.type === "warning"
                        ? "text-pink-400"
                        : "text-purple-400"
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
