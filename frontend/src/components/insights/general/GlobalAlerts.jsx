// src/components/insights/general/GlobalAlerts.jsx
import {
  AlertTriangle,
  TrendingUp,
  Zap,
  Flame,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const alerts = [
  {
    type: "success",
    icon: Flame,
    title: "Viral Cruzado Detectado",
    text: "Mesmo tema performando bem em TikTok, Instagram e YouTube simultaneamente",
    platforms: ["TikTok", "Instagram", "YouTube"],
    action: "Amplificar conteúdo",
    priority: "high",
  },
  {
    type: "success",
    icon: TrendingUp,
    title: "Crescimento Acelerado",
    text: "+32K seguidores em 30 dias em todas as plataformas",
    platforms: ["Todas"],
    action: "Manter estratégia atual",
    priority: "medium",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Queda no Alcance",
    text: "Redução de -22% no alcance orgânico do Facebook",
    platforms: ["Facebook"],
    action: "Ajustar estratégia",
    priority: "high",
  },
  {
    type: "success",
    icon: Zap,
    title: "Oportunidade Identificada",
    text: "Tema 'hacking ético' em alta em 3 plataformas",
    platforms: ["YouTube", "Instagram", "TikTok"],
    action: "Criar série integrada",
    priority: "high",
  },
  {
    type: "info",
    icon: Zap,
    title: "Padrão Consistente",
    text: "Horário 19h-21h é pico de engajamento em 3 plataformas",
    platforms: ["YouTube", "TikTok", "Instagram"],
    action: "Otimizar agendamento",
    priority: "medium",
  },
];

export default function GlobalAlerts() {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const getTypeStyles = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
          icon: "text-emerald-400",
          title: "text-emerald-300",
          text: "text-emerald-200",
          badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
        };
      case "warning":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          icon: "text-red-400",
          title: "text-red-300",
          text: "text-red-200",
          badge: "bg-red-500/20 text-red-300 border-red-500/40",
        };
      default:
        return {
          bg: "bg-cyan-500/10",
          border: "border-cyan-500/30",
          icon: "text-cyan-400",
          title: "text-cyan-300",
          text: "text-cyan-200",
          badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
        };
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return { label: "Alta Prioridade", color: "text-red-400" };
      case "medium":
        return { label: "Média Prioridade", color: "text-yellow-400" };
      default:
        return { label: "Baixa Prioridade", color: "text-gray-400" };
    }
  };

  return (
    <div className="pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left">
          Alertas Globais
        </h2>
        <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span>Sucesso</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span>Atenção</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span>Informação</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {alerts.map((alert, i) => {
          const styles = getTypeStyles(alert.type);
          const priority = getPriorityLabel(alert.priority);
          const isExpanded = expandedAlert === i;

          return (
            <div
              key={i}
              className={`${styles.bg} ${
                styles.border
              } rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isExpanded ? "shadow-lg" : ""
              }`}
            >
              {/* Cabeçalho do alerta */}
              <div
                className="p-3 sm:p-4 cursor-pointer"
                onClick={() => setExpandedAlert(isExpanded ? null : i)}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Ícone */}
                  <div className="p-2 bg-white/5 rounded-lg flex-shrink-0">
                    <alert.icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${styles.icon}`}
                    />
                  </div>

                  {/* Conteúdo principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1.5 sm:mb-2">
                      <h3
                        className={`font-bold text-base sm:text-lg ${styles.title}`}
                      >
                        {alert.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}
                        >
                          {priority.label}
                        </span>
                        {alert.platforms.length > 0 && (
                          <span className="text-xs text-gray-400">
                            {alert.platforms.length === 1
                              ? alert.platforms[0]
                              : `${alert.platforms.length} plataformas`}
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      className={`text-sm sm:text-base ${styles.text} line-clamp-2`}
                    >
                      {alert.text}
                    </p>
                  </div>

                  {/* Ícone de expandir */}
                  <ChevronRight
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform flex-shrink-0 mt-1 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Conteúdo expandido */}
              {isExpanded && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t border-white/10 animate-fadeIn">
                  <div className="pl-11 sm:pl-14">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {/* Plataformas envolvidas */}
                      <div>
                        <p className="text-xs text-gray-400 mb-1.5">
                          Plataformas envolvidas:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {alert.platforms.map((platform, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-md border border-gray-700"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Ação recomendada */}
                      <div>
                        <p className="text-xs text-gray-400 mb-1.5">
                          Ação recomendada:
                        </p>
                        <p className="text-sm font-medium text-white">
                          {alert.action}
                        </p>
                      </div>
                    </div>

                    {/* Botão de ação */}
                    <div className="flex justify-end">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-all">
                        <span>Executar ação</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rodapé com estatísticas */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-sm">
              <span className="text-emerald-400 font-bold">
                {alerts.filter((a) => a.type === "success").length}
              </span>{" "}
              oportunidades •{" "}
              <span className="text-red-400 font-bold">
                {alerts.filter((a) => a.type === "warning").length}
              </span>{" "}
              alertas
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span>Atualizado há poucos segundos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
