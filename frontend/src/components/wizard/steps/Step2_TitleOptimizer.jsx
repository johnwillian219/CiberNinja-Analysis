// src/components/compare/TitleOptimizer.jsx
import {
  Zap,
  TrendingUp,
  AlertTriangle,
  Copy,
  CheckCircle,
  Sparkles,
  Target,
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
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
      {/* Cabeçalho compacto */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Otimizador de Títulos
            </h2>
            <p className="text-gray-400 text-sm">
              Análise de IA para aumentar CTR
            </p>
          </div>
        </div>

        {userTitle && (
          <button
            onClick={() => setUserTitle("")}
            className="text-gray-400 hover:text-gray-300 text-sm font-medium"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Input do título */}
      <div className="mb-6">
        <label className="text-sm text-gray-300 mb-2 block">
          Cole seu título atual
        </label>
        <div className="relative">
          <input
            type="text"
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
            placeholder="Ex: Como hackear o algoritmo do YouTube em 2025"
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all pr-24"
          />
          {userTitle.length > 0 && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              {userTitle.length} caracteres
            </span>
          )}
        </div>
      </div>

      {/* Análise da IA */}
      {userTitle ? (
        <>
          {/* Score e CTR */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">
                {analysis.score}/10
              </p>
              <p className="text-gray-300 text-xs mt-1">Score IA</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">
                {analysis.ctrEstimate}
              </p>
              <p className="text-gray-300 text-xs mt-1">CTR Estimado</p>
            </div>
          </div>

          {/* Análise detalhada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Pontos fortes */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-emerald-400">
                  Pontos Fortes
                </h3>
              </div>
              <ul className="space-y-2">
                {analysis.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Melhorias */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-semibold text-red-400">
                  Melhorias
                </h3>
              </div>
              <ul className="space-y-2">
                {analysis.improvements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertTriangle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Títulos virais */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">
                Títulos Virais do Nicho
              </h3>
            </div>
            <div className="space-y-2">
              {viralTitles.map((viral, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-gray-200 text-sm flex-1 line-clamp-2">
                      {viral.title}
                    </p>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs font-bold whitespace-nowrap">
                      {viral.ctr} CTR
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sugestões da IA */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-semibold text-white">
                  Sugestões da IA
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-bold">
                +120% a +280% CTR
              </span>
            </div>

            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-3 hover:border-purple-500/40 transition-all cursor-pointer"
                  onClick={() => handleCopy(suggestion, index)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-gray-200 text-sm flex-1 line-clamp-2">
                      {suggestion}
                    </p>
                    <button className="p-1.5 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors flex-shrink-0">
                      {copiedIndex === index ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-400" />
                      )}
                    </button>
                  </div>
                  {copiedIndex === index && (
                    <p className="text-emerald-400 text-xs mt-2 text-center">
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
        <div className="text-center py-12 border-2 border-dashed border-gray-600 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-gray-400 text-sm">
            Digite um título para ativar a análise da IA
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Receba sugestões para aumentar seu CTR em até 280%
          </p>
        </div>
      )}
    </div>
  );
}
