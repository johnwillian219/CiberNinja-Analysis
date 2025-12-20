// src/components/compare/TitleOptimizer.jsx - Versão híbrida
import {
  Zap,
  TrendingUp,
  AlertTriangle,
  Copy,
  CheckCircle,
  Sparkles,
  Target,
  Info,
} from "lucide-react";
import { useState } from "react";

export default function TitleOptimizer() {
  const [userTitle, setUserTitle] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Dados da análise
  const analysis = {
    score: 6.8,
    ctrEstimate: "6.8%",
    strengths: [
      "Contém palavra-chave 'hackear'",
      "Usa número '2025' (atrai curiosidade)",
      "Comprimento ideal (58 caracteres)",
    ],
    improvements: [
      "Falta elemento de urgência",
      "Não usa palavras de poder",
      "Poderia ter hook mais impactante",
    ],
    keywords: [
      { word: "algoritmo", score: 9.2 },
      { word: "YouTube", score: 8.7 },
      { word: "hackear", score: 7.5 },
      { word: "2025", score: 9.0 },
    ],
  };

  const viralTitles = [
    { title: "O Algoritmo do YouTube Foi EXPLOIDO em 2025", ctr: "19.2%" },
    { title: "Como Eu Hackeei o YouTube em 24h", ctr: "17.8%" },
    { title: "NUNCA Poste Assim no YouTube em 2025", ctr: "16.5%" },
    { title: "O Segredo que o YouTube Não Quer que Você Saiba", ctr: "15.9%" },
  ];

  const aiSuggestions = [
    "🔴 O Algoritmo do YouTube Foi HACKEADO em 2025",
    "⚠️ Como Hackear o Algoritmo do YouTube em 2025",
    "🚨 Eu Hackeei o YouTube e Ganhei 200K Views",
    "O Maior Segredo do Algoritmo do YouTube (Exposto)",
    "NUNCA Mais Poste no YouTube Sem Saber Isso",
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-8">
      {/* Cabeçalho responsivo */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="p-1.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
            <Zap className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base md:text-2xl font-bold text-white">
              <span className="md:hidden">Otimizador</span>
              <span className="hidden md:inline">Otimizador de Títulos</span>
            </h2>
            <p className="text-gray-400 text-xs md:text-base">
              <span className="md:hidden">Análise de CTR</span>
              <span className="hidden md:inline">
                Análise de IA para aumentar CTR
              </span>
            </p>
          </div>
        </div>

        {userTitle && (
          <button
            onClick={() => setUserTitle("")}
            className="text-gray-400 hover:text-gray-300 text-xs md:text-base font-medium"
          >
            <span className="md:hidden">Limpar</span>
            <span className="hidden md:inline">Limpar Título</span>
          </button>
        )}
      </div>

      {/* Input do título */}
      <div className="mb-4 md:mb-8">
        <label className="text-xs md:text-lg text-gray-300 mb-1 md:mb-3 block">
          <span className="md:hidden">Cole seu título</span>
          <span className="hidden md:inline">Cole seu título atual</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
            placeholder="Ex: Como hackear o algoritmo do YouTube em 2025"
            className="w-full px-3 md:px-6 py-2 md:py-4 bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl text-sm md:text-base text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all pr-16 md:pr-32"
          />
          {userTitle.length > 0 && (
            <span className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs md:text-sm">
              <span className="md:hidden">{userTitle.length}</span>
              <span className="hidden md:inline">
                {userTitle.length} caracteres
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Análise da IA */}
      {userTitle ? (
        <>
          {/* Score e CTR */}
          <div className="grid grid-cols-2 gap-2 md:gap-6 mb-4 md:mb-8">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg md:rounded-xl p-3 md:p-6 text-center">
              <p className="text-lg md:text-4xl font-bold text-purple-400">
                {analysis.score}/10
              </p>
              <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">
                Score IA
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg md:rounded-xl p-3 md:p-6 text-center">
              <p className="text-lg md:text-4xl font-bold text-emerald-400">
                {analysis.ctrEstimate}
              </p>
              <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">
                CTR Estimado
              </p>
            </div>
          </div>

          {/* Análise de palavras-chave (apenas desktop) */}
          <div className="hidden md:block mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                Análise de Palavras-chave
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {analysis.keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 rounded-lg p-3 text-center"
                >
                  <p className="text-white font-medium mb-1">{keyword.word}</p>
                  <p className="text-emerald-400 text-sm font-bold">
                    {keyword.score}/10
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Análise detalhada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-8">
            {/* Pontos fortes */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg md:rounded-xl p-3 md:p-6">
              <div className="flex items-center gap-1.5 md:gap-3 mb-2 md:mb-4">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <h3 className="text-xs md:text-lg font-semibold text-emerald-400">
                  Pontos Fortes
                </h3>
              </div>
              <ul className="space-y-1.5 md:space-y-3">
                {analysis.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-1.5 md:gap-3">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-xs md:text-base">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Melhorias */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg md:rounded-xl p-3 md:p-6">
              <div className="flex items-center gap-1.5 md:gap-3 mb-2 md:mb-4">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                <h3 className="text-xs md:text-lg font-semibold text-red-400">
                  Melhorias
                </h3>
              </div>
              <ul className="space-y-1.5 md:space-y-3">
                {analysis.improvements.map((item, index) => (
                  <li key={index} className="flex items-start gap-1.5 md:gap-3">
                    <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-xs md:text-base">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Títulos virais */}
          <div className="mb-4 md:mb-8">
            <div className="flex items-center gap-1.5 md:gap-3 mb-2 md:mb-4">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
              <h3 className="text-xs md:text-lg font-semibold text-white">
                Títulos Virais do Nicho
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {viralTitles.map((viral, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 rounded-lg md:rounded-xl p-2 md:p-4 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex justify-between items-start gap-1.5 md:gap-3">
                    <p className="text-gray-200 text-xs md:text-base flex-1 line-clamp-2">
                      {viral.title}
                    </p>
                    <span className="px-2 py-1 md:px-3 md:py-2 bg-emerald-500/20 text-emerald-400 rounded text-xs md:text-sm font-bold whitespace-nowrap">
                      {viral.ctr} CTR
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sugestões da IA */}
          <div>
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="flex items-center gap-1.5 md:gap-3">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                <h3 className="text-xs md:text-lg font-semibold text-white">
                  Sugestões da IA
                </h3>
              </div>
              <span className="text-xs md:text-base text-emerald-400 font-bold">
                +120% a +280% CTR
              </span>
            </div>

            <div className="space-y-1.5 md:space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg md:rounded-xl p-2 md:p-4 hover:border-purple-500/40 transition-all cursor-pointer"
                  onClick={() => handleCopy(suggestion, index)}
                >
                  <div className="flex items-start justify-between gap-1.5 md:gap-3">
                    <p className="text-gray-200 text-xs md:text-base flex-1 line-clamp-2">
                      {suggestion}
                    </p>
                    <button className="p-1 md:p-2 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors flex-shrink-0">
                      {copiedIndex === index ? (
                        <CheckCircle className="w-3 h-3 md:w-5 md:h-5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 md:w-5 md:h-5 text-gray-400 group-hover:text-purple-400" />
                      )}
                    </button>
                  </div>
                  {copiedIndex === index && (
                    <p className="text-emerald-400 text-xs md:text-sm mt-1 md:mt-2 text-center">
                      Copiado para a área de transferência!
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Estado vazio */
        <div className="text-center py-6 md:py-16 border-2 border-dashed border-gray-600 rounded-lg md:rounded-xl">
          <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-2 md:mb-4">
            <Target className="w-4 h-4 md:w-8 md:h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 text-xs md:text-xl px-2 md:px-4">
            Digite um título para ativar a análise da IA
          </p>
          <p className="text-gray-500 text-xs md:text-base mt-0.5 md:mt-2">
            Receba sugestões para aumentar seu CTR em até 280%
          </p>
        </div>
      )}
    </div>
  );
}
