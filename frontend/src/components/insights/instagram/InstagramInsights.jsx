// src/components/insights/instagram/InstagramInsights.jsx
import {
  TrendingUp,
  Zap,
  Clock,
  AlertTriangle,
  Image,
  Film,
} from "lucide-react";

export default function InstagramInsights() {
  const insights = [
    {
      type: "success",
      icon: TrendingUp,
      text: "Reels estão com 3.8x mais alcance que posts estáticos esta semana",
    },
    {
      type: "success",
      icon: Film,
      text: "Reels de 15-30 segundos têm a maior taxa de conclusão (72%)",
    },
    {
      type: "info",
      icon: Clock,
      text: "Melhor horário de postagem: 19h às 21h (pico de atividade)",
    },
    {
      type: "success",
      icon: Zap,
      text: "Stories com polls e questions aumentam engajamento em 45%",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      text: "Carrosséis com mais de 10 slides têm retenção 35% menor",
    },
    {
      type: "success",
      icon: Image,
      text: "Posts com carrossel geram 28% mais salvamentos que imagens únicas",
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Insights Específicos - Instagram
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div
              key={i}
              className={`group bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/60 transition-all hover:shadow-2xl hover:shadow-purple-500/20`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${
                    insight.type === "success"
                      ? "bg-emerald-500/20"
                      : insight.type === "warning"
                      ? "bg-orange-500/20"
                      : "bg-purple-500/20"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      insight.type === "success"
                        ? "text-emerald-400"
                        : insight.type === "warning"
                        ? "text-orange-400"
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
