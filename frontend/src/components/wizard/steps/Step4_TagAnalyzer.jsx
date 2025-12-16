// src/components/compare/TagAnalyzer.jsx
import {
  Hash,
  TrendingUp,
  Zap,
  AlertTriangle,
  Copy,
  CheckCircle,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";

export default function TagAnalyzer() {
  const [userTags, setUserTags] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (tag, index) => {
    navigator.clipboard.writeText(tag);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Dados da análise
  const tagArray = userTags.split(",").filter((t) => t.trim());
  const analysis = {
    score: 7.4,
    totalTags: tagArray.length || 12,
    relevance: "Alta",
    strengths: [
      "Boa mistura de tags específicas",
      "Tags de nicho com bom volume",
      "Variações em inglês e português",
    ],
    improvements: [
      "Faltam hashtags trending",
      "Algumas tags muito genéricas",
      "Poderia incluir mais hashtags de comunidade",
    ],
  };

  const viralTags = [
    { tag: "#cybersecurity", volume: "Alta", competition: "Média" },
    { tag: "#hacking", volume: "Muito Alta", competition: "Alta" },
    { tag: "#ethicalhacking", volume: "Alta", competition: "Baixa" },
    { tag: "#kalilinux", volume: "Média", competition: "Baixa" },
    { tag: "#pentest", volume: "Alta", competition: "Média" },
  ];

  const aiSuggestions = [
    "#cybersecurity2025",
    "#hackingetico",
    "#kalilinuxbr",
    "#segurancadigital",
    "#ethicalhacker",
    "#pentestbr",
    "#ciberseguranca",
    "#hackersbrasil",
    "#infosec",
    "#redteam",
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
      {/* Cabeçalho compacto */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
            <Hash className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Analisador de Tags</h2>
            <p className="text-gray-400 text-sm">Otimize alcance e SEO</p>
          </div>
        </div>

        {userTags && (
          <button
            onClick={() => setUserTags("")}
            className="text-gray-400 hover:text-gray-300 text-sm font-medium"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Input de tags */}
      <div className="mb-6">
        <label className="text-sm text-gray-300 mb-2 block">
          Cole suas tags (separadas por vírgula)
        </label>
        <div className="relative">
          <textarea
            value={userTags}
            onChange={(e) => setUserTags(e.target.value)}
            placeholder="Ex: hacking ético, kali linux, cibersegurança, pentest"
            rows={3}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all resize-none pr-24"
          />
          {userTags.length > 0 && (
            <span className="absolute right-3 top-3 text-gray-400 text-xs">
              {analysis.totalTags} tags
            </span>
          )}
        </div>
      </div>

      {/* Análise da IA */}
      {userTags ? (
        <>
          {/* Score e relevância */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">
                {analysis.score}/10
              </p>
              <p className="text-gray-300 text-xs mt-1">Score IA</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">
                {analysis.relevance}
              </p>
              <p className="text-gray-300 text-xs mt-1">Relevância</p>
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

          {/* Tags virais */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-white">
                Tags Virais do Nicho
              </h3>
            </div>
            <div className="space-y-2">
              {viralTags.map((viral, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-purple-300 text-sm font-medium">
                      {viral.tag}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        viral.volume === "Muito Alta"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : viral.volume === "Alta"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {viral.volume}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">Competição:</span>
                    <span
                      className={`text-xs font-medium ${
                        viral.competition === "Baixa"
                          ? "text-emerald-400"
                          : viral.competition === "Média"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {viral.competition}
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
                +85% alcance
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {aiSuggestions.map((tag, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-3 hover:border-purple-500/40 transition-all cursor-pointer"
                  onClick={() => handleCopy(tag, index)}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="text-purple-300 text-xs font-medium mb-1.5 line-clamp-1">
                      {tag}
                    </span>
                    <div className="flex items-center gap-1">
                      {copiedIndex === index ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">
                            Copiado
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-gray-400 group-hover:text-purple-300" />
                          <span className="text-gray-400 text-[10px] group-hover:text-purple-300">
                            Copiar
                          </span>
                        </>
                      )}
                    </div>
                  </div>
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
            Cole suas tags para análise da IA
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Aumente seu alcance em até +85% com tags otimizadas
          </p>
        </div>
      )}
    </div>
  );
}
