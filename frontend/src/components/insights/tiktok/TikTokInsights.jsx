// src/components/insights/tiktok/TikTokInsights.jsx
import { useState } from "react";
import {
  TrendingUp,
  Zap,
  Clock,
  AlertTriangle,
  Music,
  Hash,
  ChevronRight,
  Target,
} from "lucide-react";

export default function TikTokInsights() {
  const [expandedInsight, setExpandedInsight] = useState(null);

  const insights = [
    {
      id: 1,
      type: "success",
      icon: TrendingUp,
      title: "Músicas Trending Impulsionam",
      text: "Vídeos com música trending têm 3.8x mais shares e duets",
      metric: "+380% compartilhamentos",
      action: "Usar áudios trending do momento",
      priority: "high",
    },
    {
      id: 2,
      type: "success",
      icon: Music,
      title: "Áudio Original Faz Diferença",
      text: "Uso de áudio original aumentou o tempo de visualização em 42%",
      metric: "+42% tempo de visualização",
      action: "Criar áudio original para 50% dos vídeos",
      priority: "medium",
    },
    {
      id: 3,
      type: "info",
      icon: Clock,
      title: "Horário de Maior Atividade",
      text: "Melhor horário de postagem: 20h às 22h (pico de atividade)",
      metric: "+55% atividade",
      action: "Postar entre 20h-22h",
      priority: "high",
    },
    {
      id: 4,
      type: "success",
      icon: Zap,
      title: "Duração Ideal de Vídeo",
      text: "Vídeos de 15-21 segundos têm a maior taxa de conclusão (68%)",
      metric: "68% conclusão",
      action: "Manter vídeos em 15-21s",
      priority: "medium",
    },
    {
      id: 5,
      type: "warning",
      icon: AlertTriangle,
      title: "Texto na Tela Reduz Retenção",
      text: "Vídeos com texto na tela reduzem o tempo de visualização em 31%",
      metric: "-31% retenção",
      action: "Minimizar texto em vídeos",
      priority: "high",
    },
    {
      id: 6,
      type: "success",
      icon: Hash,
      title: "Quantidade Ideal de Hashtags",
      text: "Hashtags com 3-5 termos performam 28% melhor que mais hashtags",
      metric: "+28% desempenho",
      action: "Usar 3-5 hashtags relevantes",
      priority: "medium",
    },
  ];

  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
          icon: "text-emerald-400",
          title: "text-emerald-300",
          badge: "bg-emerald-500/20 text-emerald-300",
        };
      case "warning":
        return {
          bg: "bg-pink-500/10",
          border: "border-pink-500/30",
          icon: "text-pink-400",
          title: "text-pink-300",
          badge: "bg-pink-500/20 text-pink-300",
        };
      default:
        return {
          bg: "bg-purple-500/10",
          border: "border-purple-500/30",
          icon: "text-purple-400",
          title: "text-purple-300",
          badge: "bg-purple-500/20 text-purple-300",
        };
    }
  };

  return (
    <div className="mb-10 sm:mb-12 lg:mb-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left">
            Insights do TikTok
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1 text-center sm:text-left">
            Análises específicas da sua performance no TikTok
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-gray-300">Sucesso</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            <span className="text-gray-300">Atenção</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-gray-300">Informação</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {insights.map((insight) => {
          const styles = getTypeStyles(insight.type);
          const Icon = insight.icon;
          const isExpanded = expandedInsight === insight.id;

          return (
            <div
              key={insight.id}
              className={`${styles.bg} ${styles.border} rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-pink-500/50`}
            >
              {/* Cabeçalho */}
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 bg-white/5 rounded-lg flex-shrink-0">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${styles.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className={`font-bold text-base sm:text-lg ${styles.title}`}
                    >
                      {insight.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}
                    >
                      {insight.metric}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base mt-1">
                    {insight.text}
                  </p>
                </div>
              </div>

              {/* Rodapé com ação */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10">
                <div className="text-sm font-medium text-white">
                  {insight.action}
                </div>
                <button
                  onClick={() =>
                    setExpandedInsight(isExpanded ? null : insight.id)
                  }
                  className="flex items-center gap-1 text-sm text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <span>Detalhes</span>
                  <ChevronRight
                    className={`w-3 h-3 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Conteúdo expandido */}
              {isExpanded && (
                <div className="mt-4 pt-3 border-t border-white/10 animate-fadeIn">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Prioridade:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        insight.priority === "high"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {insight.priority === "high" ? "Alta" : "Média"}{" "}
                      Prioridade
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 rounded-lg text-sm transition-all">
                      <Target className="w-3 h-3" />
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
