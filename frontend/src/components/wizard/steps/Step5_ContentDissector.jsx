// src/components/compare/ContentDissector.jsx
import {
  Film,
  Zap,
  AlertTriangle,
  Clock,
  PlayCircle,
  TrendingUp,
} from "lucide-react";

export default function ContentDissector() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 mb-16">
      {/* Título principal */}
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
        Dissector de Conteúdo
      </h2>

      {/* Área de upload/link do vídeo */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="border-2 border-dashed border-gray-600 rounded-3xl p-12 text-center hover:border-purple-500/50 transition-all cursor-pointer">
          <PlayCircle className="w-20 h-20 text-gray-500 mx-auto mb-6" />
          <p className="text-2xl text-gray-300 mb-6 font-medium">
            Cole o link do seu vídeo aqui
          </p>
          <input
            type="text"
            placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="w-full max-w-3xl mx-auto px-8 py-5 bg-gray-700/70 border border-gray-600 rounded-2xl text-white text-lg text-center focus:border-purple-500 focus:outline-none transition-all"
          />
          <p className="text-gray-500 text-sm mt-6">
            A IA analisará hook, pacing, estrutura e momentos de retenção
          </p>
        </div>
      </div>

      {/* Momentos chave detectados pela IA */}
      <div className="mb-16">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-5">
          <Zap className="w-10 h-10 text-purple-400" />
          Momentos Chave Detectados pela IA
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Hook inicial */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900 border border-emerald-500/40 rounded-3xl p-8 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold text-emerald-400">00:12</span>
            </div>
            <p className="text-xl font-bold text-white mb-3">Hook Perfeito</p>
            <p className="text-gray-200 leading-relaxed">
              Pergunta direta + promessa clara nos primeiros segundos → pico
              inicial de retenção
            </p>
          </div>

          {/* Transição suave */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-gray-900 border border-cyan-500/40 rounded-3xl p-8 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold text-cyan-400">03:42</span>
            </div>
            <p className="text-xl font-bold text-white mb-3">
              Transição Inteligente
            </p>
            <p className="text-gray-200 leading-relaxed">
              Teaser do próximo tópico mantém 85% da audiência engajada
            </p>
          </div>

          {/* Ponto crítico */}
          <div className="bg-gradient-to-br from-red-900/30 to-gray-900 border border-red-500/40 rounded-3xl p-8 hover:shadow-2xl hover:shadow-red-500/20 transition-all">
            <div className="flex items-center gap-4 mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <span className="text-2xl font-bold text-red-400">08:15</span>
            </div>
            <p className="text-xl font-bold text-white mb-3">
              Queda Crítica Detectada
            </p>
            <p className="text-gray-200 leading-relaxed">
              Parte técnica longa sem elementos visuais → perda de 35% da
              audiência
            </p>
          </div>
        </div>
      </div>

      {/* Recomendações da IA */}
      <div>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 text-center flex items-center justify-center gap-5">
          <TrendingUp className="w-10 h-10 text-emerald-400" />
          Recomendações da IA para Maximizar Retenção
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Recomendação 1 */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900 border border-emerald-500/40 rounded-3xl p-8 text-center hover:-translate-y-2 transition-all">
            <Zap className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <p className="text-2xl font-bold text-emerald-300 mb-4">
              Cortes Rápidos + B-Roll
            </p>
            <p className="text-gray-300 leading-relaxed">
              No ponto crítico (8:15), insira animações, demonstrações na tela e
              cortes dinâmicos para recuperar atenção
            </p>
          </div>

          {/* Recomendação 2 */}
          <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 border border-purple-500/40 rounded-3xl p-8 text-center hover:-translate-y-2 transition-all">
            <Film className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <p className="text-2xl font-bold text-purple-300 mb-4">
              Capítulos Claros
            </p>
            <p className="text-gray-300 leading-relaxed">
              Divida o vídeo em seções com timestamps na descrição — aumenta
              watch time em até 42%
            </p>
          </div>

          {/* Recomendação 3 */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-gray-900 border border-cyan-500/40 rounded-3xl p-8 text-center hover:-translate-y-2 transition-all">
            <TrendingUp className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <p className="text-2xl font-bold text-cyan-300 mb-4">
              Final Impactante
            </p>
            <p className="text-gray-300 leading-relaxed">
              Termine com CTA visual forte + teaser do próximo vídeo para
              incentivar binge watching
            </p>
          </div>
        </div>

        {/* Insight final */}
        <div className="mt-12 text-center">
          <p className="text-2xl text-emerald-400 font-bold">
            Potencial de melhoria: +65% em retenção média
          </p>
          <p className="text-gray-400 mt-4">
            Implementando essas mudanças, seu vídeo pode manter a audiência até
            o final
          </p>
        </div>
      </div>
    </div>
  );
}
