// src/components/insights/general/CombinedRecommendations.jsx
import {
  CheckCircle,
  TrendingUp,
  Clock,
  Target,
  Zap,
  ChevronRight,
  Play,
  Calendar,
  Hash,
} from "lucide-react";
import { useState } from "react";

const recommendations = [
  {
    id: 1,
    title: "Conteúdos Curtos Performam Melhor",
    description:
      "Reels, Shorts e TikTok representam 68% do crescimento recente em alcance e engajamento",
    icon: Play,
    platforms: ["Instagram", "TikTok"],
    impact: "Alto",
    metrics: "+42% alcance | +68% engajamento",
    action: "Criar 3 conteúdos curtos por semana",
    timeframe: "Imediato",
    priority: "high",
  },
  {
    id: 2,
    title: "Otimização de Horário de Postagem",
    description:
      "Período entre 19h e 21h tem maior atividade em YouTube, TikTok e Instagram",
    icon: Clock,
    platforms: ["YouTube", "Instagram"],
    impact: "Médio",
    metrics: "+35% visualizações | +28% interações",
    action: "Agendar posts principais neste horário",
    timeframe: "Esta semana",
    priority: "medium",
  },
  {
    id: 3,
    title: "Explorar Tema 'Hacking Ético'",
    description:
      "Alto desempenho em salvamentos e shares no YouTube, Instagram e TikTok",
    icon: Target,
    platforms: ["YouTube", "Instagram"],
    impact: "Alto",
    metrics: "+58% salvamentos | +73% shares",
    action: "Desenvolver série de 5 episódios",
    timeframe: "Próximos 15 dias",
    priority: "high",
  },
  {
    id: 4,
    title: "Cross-Promotion entre Plataformas",
    description:
      "Conteúdos que mencionam outras plataformas têm maior retenção",
    icon: TrendingUp,
    platforms: ["Todas"],
    impact: "Médio",
    metrics: "+31% retenção | +45% cross-traffic",
    action: "Incluir CTAs cruzados em todos os posts",
    timeframe: "Contínuo",
    priority: "medium",
  },
];

export default function CombinedRecommendations() {
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "Alto":
        return "text-emerald-400";
      case "Médio":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const toggleComplete = (id) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter((item) => item !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  return (
    <div className="mb-8 mt-10 sm:mb-10 lg:mb-12 xl:mb-14">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left">
            Recomendações Estratégicas
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1 text-center sm:text-left">
            Ações priorizadas baseadas em dados multi-plataforma
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500/40 rounded"></div>
            <span className="text-gray-300">Alto Impacto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500/20 border border-yellow-500/40 rounded"></div>
            <span className="text-gray-300">Médio Impacto</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {recommendations.map((rec) => {
          const isCompleted = completed.includes(rec.id);
          const isExpanded = expanded === rec.id;
          const Icon = rec.icon;

          return (
            <div
              key={rec.id}
              className={`bg-gray-800/50 border ${
                isCompleted
                  ? "border-emerald-500/40 bg-emerald-500/5"
                  : "border-gray-700/50"
              } rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg`}
            >
              {/* Cabeçalho */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Ícone e Checkbox */}
                  <div className="flex flex-col items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => toggleComplete(rec.id)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center border transition-all ${
                        isCompleted
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                          : "bg-gray-700/50 border-gray-600 hover:border-cyan-400"
                      }`}
                    >
                      {isCompleted && <CheckCircle className="w-4 h-4" />}
                    </button>
                    <div className="p-2 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-lg">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                    </div>
                  </div>

                  {/* Conteúdo principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                      <div>
                        <h3
                          className={`font-bold text-base sm:text-lg ${
                            isCompleted
                              ? "text-gray-400 line-through"
                              : "text-white"
                          }`}
                        >
                          {rec.title}
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base mt-1">
                          {rec.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium ${getImpactColor(
                            rec.impact
                          )} bg-white/5`}
                        >
                          Impacto: {rec.impact}
                        </span>
                        <span className="px-2 py-1 rounded-md text-xs font-medium text-cyan-300 bg-cyan-500/10">
                          {rec.timeframe}
                        </span>
                      </div>
                    </div>

                    {/* Plataformas e métricas */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          Plataformas:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {rec.platforms.map((platform, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600"
                            >
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-emerald-300 font-medium">
                        {rec.metrics}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botão expandir/colapsar */}
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm font-medium text-white">
                    {rec.action}
                  </div>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : rec.id)}
                    className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Detalhes</span>
                    <ChevronRight
                      className={`w-3 h-3 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Conteúdo expandido */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 border-t border-gray-700/50 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Plano de ação */}
                    <div className="bg-gray-900/30 rounded-lg p-3 sm:p-4">
                      <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-cyan-400" />
                        Plano de Ação
                      </h4>
                      <ul className="space-y-2">
                        {rec.action.split(" | ").map((step, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Métricas detalhadas */}
                    <div className="bg-gray-900/30 rounded-lg p-3 sm:p-4">
                      <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        Impacto Esperado
                      </h4>
                      <div className="space-y-3">
                        {rec.metrics.split(" | ").map((metric, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-gray-300">
                              {metric.split("+")[1]?.split(" ")[1] || metric}
                            </span>
                            <span className="font-bold text-emerald-400">
                              {metric.split("+")[1]?.split(" ")[0] || ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
                      <Zap className="w-3 h-3" />
                      Iniciar
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/40 text-purple-300 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2">
                      <Calendar className="w-3 h-3" />
                      Agendar
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 text-gray-300 rounded-lg text-sm font-medium transition-all">
                      Depois
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Resumo e progresso */}
      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                {completed.length}/{recommendations.length}
              </div>
              <div className="text-xs text-gray-400">Concluídas</div>
            </div>
            <div className="w-32 sm:w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
                style={{
                  width: `${
                    (completed.length / recommendations.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-emerald-400 font-bold">
              {recommendations.filter((r) => r.priority === "high").length}
            </span>{" "}
            prioridades altas •{" "}
            <span className="text-cyan-400 font-bold">
              {
                recommendations.filter((r) => r.platforms.includes("Todas"))
                  .length
              }
            </span>{" "}
            multi-plataforma
          </div>
        </div>
      </div>
    </div>
  );
}
