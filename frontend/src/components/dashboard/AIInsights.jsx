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
    shadowColor: "emerald",
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
    shadowColor: "yellow",
    title: "Potencial de viralização detectado",
    description:
      "4 vídeos (2 Shorts + 2 Reels) têm alta probabilidade de viralizar nas próximas 48h.",
    highlight: "4 vídeos",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "from-red-500/20 to-red-600/10",
    borderHover: "hover:border-red-500/50",
    shadowColor: "red",
    title: "Atenção na retenção do Instagram",
    description:
      "3 Reels recentes estão com retenção abaixo de 40% nos primeiros 3 segundos.",
    highlight: "3 vídeos",
  },
  {
    type: "insight",
    icon: Lightbulb,
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-cyan-600/10",
    borderHover: "hover:border-cyan-500/50",
    shadowColor: "cyan",
    title: "Padrão de sucesso identificado",
    description:
      "Vídeos com hook nos primeiros 1.5s têm 3.2x mais engajamento.",
    highlight: "Hook = 3.2x",
  },
];

export default function AIInsights() {
  return (
    <section className="mt-16">
      {/* Título + Badge IA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl lg:text-3xl font-bold text-white">
            Insights da Inteligência Artificial
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/40 rounded-full">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-sm font-bold text-purple-300">IA Ativa</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Análise em tempo real</span>
        </div>
      </div>

      {/* Grid de Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;

          return (
            <div
              key={index}
              className={`group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6
                          ${insight.borderHover}
                          hover:shadow-2xl hover:shadow-${insight.shadowColor}-500/20
                          transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Fundo com gradiente sutil */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${insight.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Ícone + Highlight */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gray-900/70 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-7 h-7 ${insight.color}`} />
                </div>
                <span
                  className={`text-2xl font-bold ${insight.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                >
                  {insight.highlight}
                </span>
              </div>

              {/* Texto */}
              <div className="relative z-10">
                <h4 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                  {insight.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {insight.description}
                </p>
              </div>

              {/* Glow extra no fundo */}
              <div
                className={`absolute inset-0 blur-3xl ${insight.bg} opacity-0 group-hover:opacity-30 transition-opacity duration-700 -z-10`}
              />
            </div>
          );
        })}
      </div>

      {/* Botão para a página completa */}
      <div className="mt-10 text-center">
        <Link
          to="/ai-insights"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/40 rounded-2xl text-purple-300 font-semibold text-lg hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 group-hover:scale-110 transition-all" />
          Ver todos os insights da IA
        </Link>
      </div>
    </section>
  );
}
