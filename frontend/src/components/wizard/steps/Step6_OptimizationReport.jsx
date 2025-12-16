// src/components/compare/OptimizationReport.jsx
import {
  Award,
  Target,
  Zap,
  TrendingUp,
  Star,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function OptimizationReport() {
  const overallScore = 8.4;
  const potentialScore = 9.8;

  const improvements = [
    { label: "CTR", value: "+220%", icon: TrendingUp, color: "emerald" },
    { label: "Retenção", value: "+65%", icon: Target, color: "cyan" },
    { label: "Alcance", value: "+85%", icon: Sparkles, color: "purple" },
  ];

  const getColorClass = (color) => {
    const colors = {
      emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/30 via-gray-900/50 to-cyan-900/30 border border-purple-500/30 rounded-2xl p-6">
      {/* Cabeçalho compacto */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
          <Award className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-white">Relatório Final</h2>
      </div>

      {/* Scores principais */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Score atual */}
        <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-4 h-4 text-purple-400" />
            <p className="text-xs text-gray-300">Score Atual</p>
          </div>
          <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
            {overallScore}
          </p>
          <p className="text-emerald-400 text-xs font-medium mt-1">
            Bem acima da média
          </p>
        </div>

        {/* Score potencial */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-4 h-4 text-emerald-400" />
            <p className="text-xs text-gray-300">Potencial</p>
          </div>
          <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
            {potentialScore}
          </p>
          <p className="text-purple-400 text-xs font-medium mt-1">
            Nível viral
          </p>
        </div>
      </div>

      {/* Melhorias estimadas */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">
            Potencial de Melhoria
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {improvements.map((imp, index) => {
            const Icon = imp.icon;
            return (
              <div
                key={index}
                className={`${getColorClass(
                  imp.color
                )} border rounded-lg p-3 text-center`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <p className="text-lg font-bold">{imp.value}</p>
                <p className="text-xs opacity-80">{imp.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diagnóstico final */}
      <div className="bg-gradient-to-r from-purple-500/10 to-emerald-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white">Diagnóstico IA</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">
          Seu conteúdo tem{" "}
          <span className="text-emerald-400 font-medium">
            alto potencial viral
          </span>
          . Hook sólido e tema relevante. Foque em thumbnails impactantes e
          títulos com urgência.
        </p>
        <p className="text-emerald-400 text-sm font-bold">
          +280% performance com otimizações
        </p>
      </div>

      {/* Status final */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-xs font-medium">
            Potencial Viral
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" />
          <span className="text-purple-400 text-xs font-medium">
            Nicho em Crescimento
          </span>
        </div>
      </div>
    </div>
  );
}
