// src/components/compare/ContentDissector.jsx
import {
  Film,
  Zap,
  AlertTriangle,
  Clock,
  PlayCircle,
  TrendingUp,
  Sparkles,
  Target,
  Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";

export default function ContentDissector() {
  const [videoUrl, setVideoUrl] = useState("");

  const keyMoments = [
    {
      time: "00:12",
      title: "Hook Perfeito",
      description:
        "Pergunta direta + promessa clara → pico inicial de retenção",
      color: "emerald",
      icon: Zap,
    },
    {
      time: "03:42",
      title: "Transição Inteligente",
      description: "Teaser do próximo tópico mantém 85% da audiência",
      color: "cyan",
      icon: Clock,
    },
    {
      time: "08:15",
      title: "Queda Crítica",
      description: "Parte técnica longa → perda de 35% da audiência",
      color: "red",
      icon: AlertTriangle,
    },
  ];

  const recommendations = [
    {
      icon: Film,
      title: "Cortes Rápidos + B-Roll",
      description: "Insira animações e demonstrações para recuperar atenção",
      color: "emerald",
    },
    {
      icon: Sparkles,
      title: "Capítulos Claros",
      description: "Timestamps aumentam watch time em até 42%",
      color: "purple",
    },
    {
      icon: TrendingUp,
      title: "Final Impactante",
      description: "CTA visual forte + teaser para binge watching",
      color: "cyan",
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
      {/* Cabeçalho compacto */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Dissector de Conteúdo
            </h2>
            <p className="text-gray-400 text-sm">
              Análise de retenção e pacing
            </p>
          </div>
        </div>

        {videoUrl && (
          <button
            onClick={() => setVideoUrl("")}
            className="text-gray-400 hover:text-gray-300 text-sm font-medium"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Input do link do vídeo */}
      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mb-3">
              <LinkIcon className="w-5 h-5 text-gray-400" />
            </div>
            <label className="text-sm text-gray-300 mb-2 block">
              Cole o link do seu vídeo
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded text-white text-sm text-center placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            />
            <p className="text-gray-500 text-xs mt-2">
              IA analisa hook, pacing e momentos de retenção
            </p>
          </div>
        </div>
      </div>

      {/* Análise da IA */}
      {videoUrl ? (
        <>
          {/* Momentos chave */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">
                Momentos Chave
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {keyMoments.map((moment, index) => {
                const Icon = moment.icon;
                const colorClass = `text-${moment.color}-400`;
                const bgClass = `bg-${moment.color}-500/10 border-${moment.color}-500/20`;

                return (
                  <div
                    key={index}
                    className={`${bgClass} border rounded-lg p-3 hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${colorClass}`} />
                        <span className={`text-sm font-bold ${colorClass}`}>
                          {moment.time}
                        </span>
                      </div>
                      <span className={`text-xs font-medium ${colorClass}`}>
                        {moment.title}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs">
                      {moment.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recomendações */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">
                  Recomendações
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold">
                +65% retenção
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon;
                const colorClass = `text-${rec.color}-400`;
                const bgClass = `bg-${rec.color}-500/10 border-${rec.color}-500/20`;

                return (
                  <div
                    key={index}
                    className={`${bgClass} border rounded-lg p-3 hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <Icon className={`w-6 h-6 ${colorClass} mb-2`} />
                      <h4 className={`text-xs font-bold ${colorClass} mb-1`}>
                        {rec.title}
                      </h4>
                      <p className="text-gray-300 text-xs">{rec.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insight final */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3 text-center">
              <p className="text-emerald-400 text-sm font-bold">
                Potencial de melhoria: +65% em retenção média
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Implemente essas mudanças para manter audiência até o final
              </p>
            </div>
          </div>
        </>
      ) : (
        /* Estado vazio */
        <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-4">
            <PlayCircle className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-gray-400 text-sm">
            Cole um link do YouTube para análise
          </p>
          <p className="text-gray-500 text-xs mt-1">
            IA detecta pontos críticos e sugere melhorias em tempo real
          </p>
        </div>
      )}
    </div>
  );
}
