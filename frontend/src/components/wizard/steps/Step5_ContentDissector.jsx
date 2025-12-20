// src/components/compare/ContentDissector.jsx - Versão avançada
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
  BarChart3,
  Users,
  Timer,
  MessageSquare,
  ThumbsUp,
  Share2,
  Eye,
  SkipForward,
} from "lucide-react";
import { useState } from "react";

export default function ContentDissector() {
  const [videoUrl, setVideoUrl] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const keyMoments = [
    {
      time: "00:12",
      title: "Hook Impactante",
      description: "Pergunta direta + promessa clara captura atenção",
      color: "emerald",
      icon: Zap,
      impact: "+45%",
      viewers: "95%",
    },
    {
      time: "03:42",
      title: "Transição Inteligente",
      description: "Teaser mantém 85% da audiência engajada",
      color: "cyan",
      icon: Clock,
      impact: "+20%",
      viewers: "85%",
    },
    {
      time: "08:15",
      title: "Queda de Retenção",
      description: "Parte técnica longa afasta espectadores",
      color: "red",
      icon: AlertTriangle,
      impact: "-35%",
      viewers: "50%",
    },
    {
      time: "12:30",
      title: "Recuperação",
      description: "Demonstração prática recupera engajamento",
      color: "purple",
      icon: TrendingUp,
      impact: "+60%",
      viewers: "80%",
    },
    {
      time: "16:45",
      title: "CTA Eficaz",
      description: "Chamada para ação gera engajamento",
      color: "blue",
      icon: MessageSquare,
      impact: "+25%",
      viewers: "45%",
    },
    {
      time: "20:10",
      title: "Final Forte",
      description: "Resumo e teaser para próximo vídeo",
      color: "amber",
      icon: SkipForward,
      impact: "+15%",
      viewers: "30%",
    },
  ];

  const recommendations = [
    {
      icon: Film,
      title: "Edição Dinâmica",
      description: "Mais cortes rápidos e B-roll para manter ritmo",
      color: "emerald",
      impact: "+40%",
    },
    {
      icon: Sparkles,
      title: "Capítulos Estruturados",
      description: "Timestamps claros para navegação fácil",
      color: "purple",
      impact: "+42%",
    },
    {
      icon: TrendingUp,
      title: "Micro-Hooks",
      description: "Perguntas e teasers a cada 2-3 minutos",
      color: "cyan",
      impact: "+55%",
    },
    {
      icon: Timer,
      title: "Pacing Otimizado",
      description: "Reduzir partes técnicas, aumentar demonstrações",
      color: "blue",
      impact: "+35%",
    },
  ];

  const engagementData = [
    { metric: "Retenção 30s", value: 85, ideal: 90, color: "text-emerald-400" },
    { metric: "Retenção 60s", value: 72, ideal: 80, color: "text-cyan-400" },
    { metric: "Watch Time", value: 45, ideal: 60, color: "text-yellow-400" },
    { metric: "Completude", value: 58, ideal: 70, color: "text-orange-400" },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-8">
      {/* Cabeçalho responsivo */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="p-1.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
            <PlayCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base md:text-2xl font-bold text-white">
              Content Dissector
            </h2>
            <p className="text-gray-400 text-xs md:text-base">
              Análise avançada de retenção e engajamento
            </p>
          </div>
        </div>

        {videoUrl && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVideoUrl("")}
              className="text-gray-400 hover:text-gray-300 text-xs md:text-base font-medium"
            >
              Limpar
            </button>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="hidden md:inline-flex items-center gap-1 px-3 py-1 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 text-sm transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              {showAdvanced ? "Básico" : "Avançado"}
            </button>
          </div>
        )}
      </div>

      {/* Input principal */}
      <div className="mb-4 md:mb-8">
        <div className="border-2 border-dashed border-gray-600 rounded-lg md:rounded-xl p-3 md:p-6 hover:border-purple-500/50 transition-colors">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-3">
              <LinkIcon className="w-5 h-5 md:w-8 md:h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-300 text-sm md:text-lg mb-1 md:mb-2">
              Analise seu vídeo do YouTube
            </h3>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full max-w-lg px-4 md:px-6 py-2 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm md:text-base text-center placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
            />
            <p className="text-gray-500 text-xs md:text-sm mt-2 md:mt-3">
              Análise completa de retenção, pacing e momentos-chave
            </p>
          </div>
        </div>
      </div>

      {/* Análise da IA */}
      {videoUrl ? (
        <>
          {/* Score geral */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-8">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center">
              <p className="text-lg md:text-3xl font-bold text-emerald-400">
                7.2
              </p>
              <p className="text-gray-300 text-xs md:text-sm mt-0.5 md:mt-1">
                Score Geral
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center">
              <p className="text-lg md:text-3xl font-bold text-cyan-400">45%</p>
              <p className="text-gray-300 text-xs md:text-sm mt-0.5 md:mt-1">
                Retenção Final
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center">
              <p className="text-lg md:text-3xl font-bold text-purple-400">
                65%
              </p>
              <p className="text-gray-300 text-xs md:text-sm mt-0.5 md:mt-1">
                Potencial
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-lg md:rounded-xl p-2 md:p-4 text-center">
              <p className="text-lg md:text-3xl font-bold text-amber-400">
                3:42
              </p>
              <p className="text-gray-300 text-xs md:text-sm mt-0.5 md:mt-1">
                Pico de Engajamento
              </p>
            </div>
          </div>

          {/* Dados de engajamento (desktop) */}
          {showAdvanced && (
            <div className="hidden md:block mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">
                  Métricas de Engajamento
                </h3>
                <span className="text-gray-400 text-sm">vs. Ideal</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {engagementData.map((data, index) => (
                  <div key={index} className="bg-gray-700/30 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">
                        {data.metric}
                      </span>
                      <span className={`text-sm font-bold ${data.color}`}>
                        {data.value}%
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className={`absolute h-full ${
                          data.color.includes("emerald")
                            ? "bg-emerald-500"
                            : data.color.includes("cyan")
                            ? "bg-cyan-500"
                            : data.color.includes("yellow")
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${(data.value / 100) * 100}%` }}
                      ></div>
                      <div
                        className="absolute h-full border-r-2 border-white"
                        style={{ width: `${data.ideal}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400 text-xs">Atual</span>
                      <span className="text-gray-400 text-xs">
                        Ideal: {data.ideal}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Momentos chave */}
          <div className="mb-4 md:mb-8">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="flex items-center gap-1.5 md:gap-3">
                <Target className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                <h3 className="text-xs md:text-lg font-semibold text-white">
                  Momentos Chave da Retenção
                </h3>
              </div>
              <span className="text-gray-400 text-xs md:text-sm">
                {keyMoments.length} momentos
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {keyMoments
                .slice(0, showAdvanced ? 6 : 4)
                .map((moment, index) => {
                  const Icon = moment.icon;
                  const colorClass = `text-${moment.color}-400`;
                  const bgClass = `bg-${moment.color}-500/10 border-${moment.color}-500/20`;

                  return (
                    <div
                      key={index}
                      className={`${bgClass} border rounded-lg md:rounded-xl p-3 hover:opacity-90 transition-opacity`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Icon
                            className={`w-4 h-4 md:w-5 md:h-5 ${colorClass}`}
                          />
                          <span
                            className={`text-sm md:text-base font-bold ${colorClass}`}
                          >
                            {moment.time}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span
                            className={`text-xs md:text-sm font-bold ${colorClass}`}
                          >
                            {moment.impact}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {moment.viewers} viewers
                          </span>
                        </div>
                      </div>
                      <h4
                        className={`text-xs md:text-sm font-semibold ${colorClass} mb-1`}
                      >
                        {moment.title}
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm">
                        {moment.description}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Recomendações */}
          <div className="mb-4 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 md:mb-4">
              <div className="flex items-center gap-1.5 md:gap-3">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <h3 className="text-xs md:text-lg font-semibold text-white">
                  Recomendações da IA
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-xs md:text-base font-bold">
                  +65% retenção potencial
                </span>
                {showAdvanced && (
                  <span className="text-cyan-400 text-sm">4 estratégias</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mb-3 md:mb-4">
              {recommendations.map((rec, index) => {
                const Icon = rec.icon;
                const colorClass = `text-${rec.color}-400`;
                const bgClass = `bg-${rec.color}-500/10 border-${rec.color}-500/20`;

                return (
                  <div
                    key={index}
                    className={`${bgClass} border rounded-lg md:rounded-xl p-3 hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-2">
                        <Icon
                          className={`w-5 h-5 md:w-6 md:h-6 ${colorClass}`}
                        />
                        <span
                          className={`text-xs md:text-sm font-bold ${colorClass}`}
                        >
                          {rec.impact}
                        </span>
                      </div>
                      <h4
                        className={`text-xs md:text-sm font-bold ${colorClass} mb-1 md:mb-2`}
                      >
                        {rec.title}
                      </h4>
                      <p className="text-gray-300 text-xs md:text-sm flex-grow">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Insight final */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-lg md:rounded-xl p-3 md:p-4 text-center">
              <p className="text-emerald-400 text-sm md:text-lg font-bold mb-1">
                Potencial de melhoria: +65% em retenção média
              </p>
              <p className="text-gray-300 text-xs md:text-sm">
                Foque nos minutos 8-12 para maior impacto no watch time
              </p>
            </div>
          </div>

          {/* Pontuação final (apenas desktop) */}
          {showAdvanced && (
            <div className="hidden md:grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-semibold text-white">
                    Comportamento da Audiência
                  </h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-300 text-sm">Replay Rate</span>
                    <span className="text-emerald-400 font-medium">12%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300 text-sm">Drop-off Rate</span>
                    <span className="text-red-400 font-medium">55%</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300 text-sm">
                      Engagement Rate
                    </span>
                    <span className="text-cyan-400 font-medium">8.5%</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Timer className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-white">
                    Análise de Pacing
                  </h3>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  O vídeo começa forte, mas perde ritmo na metade:
                </p>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>• 0-3m: Excelente pacing (95% retenção)</li>
                  <li>• 3-8m: Bom ritmo (85% retenção)</li>
                  <li>• 8-12m: Pacing lento (50% retenção)</li>
                  <li>• 12-20m: Recuperação (80% retenção)</li>
                </ul>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Film className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white">
                    Potencial de Viralização
                  </h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  Este vídeo tem alto potencial com ajustes:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Hook Score</span>
                    <span className="text-emerald-400 font-medium">9/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Shareability</span>
                    <span className="text-cyan-400 font-medium">7/10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">
                      Binge Potential
                    </span>
                    <span className="text-purple-400 font-medium">8/10</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Estado vazio */
        <div className="text-center py-8 md:py-16 border-2 border-dashed border-gray-600 rounded-lg md:rounded-xl">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <PlayCircle className="w-6 h-6 md:w-8 md:h-8 text-gray-500" />
          </div>
          <h3 className="text-gray-300 text-base md:text-xl mb-1 md:mb-2">
            Cole o link do seu vídeo
          </h3>
          <p className="text-gray-500 text-xs md:text-sm px-4">
            A IA analisa retenção, pacing e sugere melhorias personalizadas
          </p>
        </div>
      )}
    </div>
  );
}
