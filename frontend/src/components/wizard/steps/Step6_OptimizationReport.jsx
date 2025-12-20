// src/components/compare/OptimizationReport.jsx - Versão completa
import {
  Award,
  Target,
  Zap,
  TrendingUp,
  Star,
  CheckCircle,
  Sparkles,
  Download,
  Share2,
  BarChart3,
  Clock,
  Users,
  Shield,
  TrendingDown,
  DollarSign,
  PieChart,
  Activity,
} from "lucide-react";
import { useState } from "react";

export default function OptimizationReport() {
  const [activeTab, setActiveTab] = useState("summary");

  const overallScore = 8.4;
  const potentialScore = 9.8;

  const categoryScores = [
    { category: "Thumbnail", score: 6.8, weight: 30, color: "purple" },
    { category: "Título", score: 8.2, weight: 25, color: "cyan" },
    { category: "Descrição", score: 7.5, weight: 15, color: "emerald" },
    { category: "Tags", score: 7.4, weight: 10, color: "amber" },
    { category: "Conteúdo", score: 8.6, weight: 20, color: "blue" },
  ];

  const improvements = [
    { label: "CTR", value: "+220%", icon: TrendingUp, color: "emerald" },
    { label: "Retenção", value: "+65%", icon: Target, color: "cyan" },
    { label: "Alcance", value: "+85%", icon: Sparkles, color: "purple" },
    { label: "Revenue", value: "+150%", icon: DollarSign, color: "amber" },
  ];

  const recommendations = [
    {
      title: "Thumbnail Impactante",
      priority: "Alta",
      time: "1-2 horas",
      description: "Redesign com elementos de urgência e contraste",
    },
    {
      title: "Título Otimizado",
      priority: "Alta",
      time: "30 minutos",
      description: "Incluir números, emojis e palavras de poder",
    },
    {
      title: "Descrição Estruturada",
      priority: "Média",
      time: "1 hora",
      description: "Timestamps, links e hashtags otimizadas",
    },
    {
      title: "Estrutura de Vídeo",
      priority: "Média",
      time: "2-3 horas",
      description: "Micro-hooks a cada 3 minutos para retenção",
    },
  ];

  const getColorClass = (color) => {
    const colors = {
      emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    };
    return colors[color] || colors.emerald;
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      Alta: "bg-red-500/20 text-red-400 border-red-500/30",
      Média: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      Baixa: "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return `px-2 py-0.5 rounded-full text-xs font-medium border ${styles[priority]}`;
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/20 via-gray-900/40 to-cyan-900/20 border border-purple-500/30 rounded-xl md:rounded-2xl p-4 md:p-8">
      {/* Cabeçalho responsivo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-0">
          <div className="p-1.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500">
            <Award className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base md:text-2xl font-bold text-white">
              Relatório de Otimização
            </h2>
            <p className="text-gray-400 text-xs md:text-base">
              Análise completa e plano de ação
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 text-xs md:text-sm transition-colors">
            <Download className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden md:inline">Exportar PDF</span>
          </button>
          <button className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-purple-400 text-xs md:text-sm transition-colors">
            <Share2 className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden md:inline">Compartilhar</span>
          </button>
        </div>
      </div>

      {/* Tabs de navegação (apenas desktop) */}
      <div className="hidden md:flex mb-6">
        <div className="flex bg-gray-800/50 rounded-lg p-1">
          {["summary", "analysis", "recommendations", "timeline"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-purple-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              {tab === "summary" && "Resumo"}
              {tab === "analysis" && "Análise"}
              {tab === "recommendations" && "Recomendações"}
              {tab === "timeline" && "Timeline"}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="space-y-4 md:space-y-8">
        {/* Scores principais */}
        <div className="grid grid-cols-2 gap-2 md:gap-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg md:rounded-xl p-3 md:p-6 text-center">
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-1 md:mb-2">
              <Award className="w-3.5 h-3.5 md:w-5 md:h-5 text-purple-400" />
              <p className="text-xs md:text-sm text-gray-300">Score Atual</p>
            </div>
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              {overallScore}
            </p>
            <p className="text-emerald-400 text-xs md:text-sm font-medium mt-0.5 md:mt-1">
              Bem acima da média
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-lg md:rounded-xl p-3 md:p-6 text-center">
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-1 md:mb-2">
              <Star className="w-3.5 h-3.5 md:w-5 md:h-5 text-emerald-400" />
              <p className="text-xs md:text-sm text-gray-300">Potencial</p>
            </div>
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
              {potentialScore}
            </p>
            <p className="text-purple-400 text-xs md:text-sm font-medium mt-0.5 md:mt-1">
              Nível viral alcançável
            </p>
          </div>
        </div>

        {/* Melhorias estimadas */}
        <div>
          <div className="flex items-center gap-1.5 md:gap-3 mb-2 md:mb-4">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
            <h3 className="text-xs md:text-lg font-semibold text-white">
              Potencial de Melhoria
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3">
            {improvements.map((imp, index) => {
              const Icon = imp.icon;
              return (
                <div
                  key={index}
                  className={`${getColorClass(
                    imp.color
                  )} border rounded-lg md:rounded-xl p-2 md:p-3 text-center`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 md:mb-2" />
                  <p className="text-base md:text-xl font-bold">{imp.value}</p>
                  <p className="text-xs opacity-80">{imp.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Análise por categoria (apenas desktop quando análise ativa) */}
        {(activeTab === "analysis" || window.innerWidth >= 768) && (
          <div className="hidden md:block">
            <div className="flex items-center gap-2 mb-3">
              <PieChart className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">
                Análise por Categoria
              </h3>
            </div>
            <div className="space-y-3">
              {categoryScores.map((cat, index) => (
                <div key={index} className="bg-gray-800/30 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">
                        {cat.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getColorClass(
                          cat.color
                        )}`}
                      >
                        {cat.score}/10
                      </span>
                    </div>
                    <span className="text-gray-400 text-sm">
                      Peso: {cat.weight}%
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full ${
                        cat.color === "purple"
                          ? "bg-purple-500"
                          : cat.color === "cyan"
                          ? "bg-cyan-500"
                          : cat.color === "emerald"
                          ? "bg-emerald-500"
                          : cat.color === "amber"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${cat.score * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Diagnóstico final */}
        <div className="bg-gradient-to-r from-purple-500/10 to-emerald-500/10 border border-purple-500/20 rounded-lg md:rounded-xl p-3 md:p-6">
          <div className="flex items-center gap-1.5 md:gap-3 mb-2 md:mb-4">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
            <h3 className="text-xs md:text-lg font-semibold text-white">
              Diagnóstico da IA
            </h3>
          </div>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-2 md:mb-3">
            Seu conteúdo tem{" "}
            <span className="text-emerald-400 font-medium">
              alto potencial viral
            </span>
            . Hook sólido e tema relevante. Foque em thumbnails impactantes e
            títulos com urgência para alcançar performance máxima.
          </p>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
            <p className="text-emerald-400 text-xs md:text-sm font-bold">
              +280% performance com otimizações aplicadas
            </p>
          </div>
        </div>

        {/* Recomendações detalhadas (apenas desktop quando recomendações ativa) */}
        {(activeTab === "recommendations" || window.innerWidth >= 768) && (
          <div className="hidden md:block">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                Recomendações Prioritárias
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-800/30 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{rec.title}</h4>
                    <span className={getPriorityBadge(rec.priority)}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">
                    {rec.description}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{rec.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status final */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 md:pt-6 border-t border-gray-700/50">
          <div className="flex items-center gap-1.5 md:gap-2">
            <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs md:text-sm font-medium">
              Potencial Viral Alto
            </span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
            <span className="text-purple-400 text-xs md:text-sm font-medium">
              Nicho em Crescimento Rápido
            </span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <DollarSign className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
            <span className="text-amber-400 text-xs md:text-sm font-medium">
              ROI Estimado: 320%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
