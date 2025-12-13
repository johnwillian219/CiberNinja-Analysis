// src/components/compare/OptimizationReport.jsx
import { Award, Target, Zap, TrendingUp, Star } from "lucide-react";

export default function OptimizationReport() {
  const overallScore = 8.4;
  const potentialScore = 9.8;

  return (
    <div className="bg-gradient-to-br from-purple-900/40 via-gray-900 to-cyan-900/40 border border-purple-500/50 rounded-3xl p-12">
      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
        Relatório Final de Otimização
      </h2>

      {/* Score geral */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 p-4 shadow-2xl shadow-purple-500/50">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <p className="text-8xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
                    {overallScore}
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-emerald-500/20 border-4 border-emerald-500 flex items-center justify-center">
                <Award className="w-12 h-12 text-emerald-400" />
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-4">
            Score Atual de Otimização
          </p>
          <p className="text-gray-300 text-xl">
            Seu vídeo está{" "}
            <span className="text-emerald-400 font-bold">
              bem acima da média
            </span>{" "}
            do nicho
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-gradient-to-br from-emerald-600 to-cyan-600 p-4 shadow-2xl shadow-emerald-500/50">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <p className="text-8xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text">
                    {potentialScore}
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-purple-500/20 border-4 border-purple-500 flex items-center justify-center">
                <Star className="w-12 h-12 text-purple-400" />
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-4">
            Potencial Máximo Estimado
          </p>
          <p className="text-gray-300 text-xl">
            Com as otimizações sugeridas, seu vídeo pode alcançar{" "}
            <span className="text-purple-400 font-bold">nível viral</span>
          </p>
        </div>
      </div>

      {/* Resumo final da IA */}
      <div className="max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-r from-purple-500/20 to-emerald-500/20 border border-purple-500/50 rounded-3xl p-10">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center gap-6">
            <Zap className="w-12 h-12 text-purple-400" />
            Diagnóstico Final da IA
          </h3>
          <p className="text-2xl text-gray-200 leading-relaxed mb-8">
            Seu conteúdo tem{" "}
            <span className="text-emerald-400 font-bold">
              alto potencial de viralidade
            </span>
            . Os pontos fortes são hook sólido, tema relevante e boa estrutura.
            As principais oportunidades estão em thumbnails mais impactantes e
            títulos com maior urgência emocional.
          </p>
          <p className="text-3xl font-bold text-emerald-400">
            Implemente as sugestões prioritárias para alcançar +280% em
            performance geral
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-emerald-400" />
            <p className="text-xl text-emerald-400 font-bold">
              Potencial Viral Alto
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Target className="w-10 h-10 text-purple-400" />
            <p className="text-xl text-purple-400 font-bold">
              Nicho em Crescimento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
