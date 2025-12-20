// src/components/dashboard/AIInsights.jsx
import { Link } from "react-router-dom";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Zap,
} from "lucide-react";

const insights = [
  {
    type: "positive",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-emerald-600/10",
    borderHover: "hover:border-emerald-500/50",
    title: "TikTok em alta velocidade",
    description:
      "Seu TikTok está crescendo 38% mais rápido que o YouTube este mês.",
    highlight: "+38%",
  },
  {
    type: "opportunity",
    icon: Zap,
    color: "text-yellow-400",
    bg: "from-yellow-500/20 to-orange-600/10",
    borderHover: "hover:border-yellow-500/50",
    title: "Potencial de viralização",
    description:
      "4 vídeos têm alta probabilidade de viralizar nas próximas 48h.",
    highlight: "4 vídeos",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "from-red-500/20 to-red-600/10",
    borderHover: "hover:border-red-500/50",
    title: "Atenção no Instagram",
    description: "3 Reels com retenção abaixo de 40% nos primeiros 3 segundos.",
    highlight: "3 vídeos",
  },
  {
    type: "insight",
    icon: Lightbulb,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-600/10",
    borderHover: "hover:border-cyan-500/50",
    title: "Padrão de sucesso",
    description: "Hook nos primeiros 1.5s = 3.2x mais engajamento.",
    highlight: "3.2x",
  },
];

export default function AIInsights() {
  return (
    <section className="mt-10 sm:mt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left">
            Insights da IA
          </h3>
          <div className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/40 rounded-full w-fit mx-auto sm:mx-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-purple-300">
              IA Ativa
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium">
            Análise em tempo real
          </span>
        </div>
      </div>

      {/* Grid de Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;

          return (
            <div
              key={index}
              className={`group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6
                          ${insight.borderHover}
                          hover:shadow-xl sm:hover:shadow-2xl hover:shadow-cyan-500/20
                          transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden`}
            >
              {/* Fundo com gradiente */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${insight.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Ícone + Highlight */}
              <div className="relative z-10 flex items-center justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gray-900/70 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-5 h-5 sm:w-7 sm:h-7 ${insight.color}`} />
                </div>
                <span
                  className={`text-lg sm:text-2xl font-bold ${insight.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                >
                  {insight.highlight}
                </span>
              </div>

              {/* Texto */}
              <div className="relative z-10">
                <h4 className="font-bold text-white text-base sm:text-lg mb-1.5 sm:mb-2 group-hover:text-cyan-300 transition-colors">
                  {insight.title}
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Botão */}
      <div className="mt-8 sm:mt-10 text-center">
        <Link
          to="/ai-insights"
          className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/40 rounded-xl sm:rounded-2xl text-purple-300 font-semibold text-sm sm:text-lg hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 group hover:shadow-xl sm:hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105"
        >
          <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 group-hover:rotate-12 group-hover:scale-110 transition-all" />
          <span className="hidden xs:inline">Ver todos os insights da IA</span>
          <span className="xs:hidden">Todos os insights</span>
        </Link>
      </div>
    </section>
  );
}
