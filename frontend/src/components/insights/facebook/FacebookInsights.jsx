// src/components/insights/facebook/FacebookInsights.jsx
import {
  TrendingUp,
  Zap,
  Clock,
  AlertTriangle,
  Video,
  Share2,
} from "lucide-react";

export default function FacebookInsights() {
  const insights = [
    {
      type: "success",
      icon: TrendingUp,
      text: "Vídeos nativos têm 2.8x mais alcance que links externos",
    },
    {
      type: "success",
      icon: Video,
      text: "Vídeos de 1-3 minutos geram maior tempo de visualização",
    },
    {
      type: "info",
      icon: Clock,
      text: "Melhor horário de postagem: 13h às 15h (maior atividade orgânica)",
    },
    {
      type: "success",
      icon: Share2,
      text: "Posts com chamadas para compartilhar aumentam shares em 38%",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      text: "Alcance orgânico caiu 22% nos últimos 30 dias",
    },
    {
      type: "info",
      icon: Zap,
      text: "Publicações com 80-100 palavras têm melhor engajamento",
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Insights Específicos - Facebook
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      ? "bg-blue-500/20"
                      : "bg-blue-500/20"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      insight.type === "success"
                        ? "text-emerald-400"
                        : insight.type === "warning"
                        ? "text-blue-400"
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
