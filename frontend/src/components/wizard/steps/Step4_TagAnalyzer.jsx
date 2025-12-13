// src/components/compare/TagAnalyzer.jsx
import {
  Hash,
  TrendingUp,
  Zap,
  AlertTriangle,
  Copy,
  CheckCircle,
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

  // Simulação de análise da IA (baseada em tags inseridas)
  const analysis = {
    score: 7.4,
    totalTags: userTags.split(",").filter((t) => t.trim()).length || 12,
    relevance: "Alta",
    strengths: [
      "Boa mistura de tags específicas ('kali linux', 'hacking ético')",
      "Tags de nicho com bom volume de busca",
      "Uso de variações em inglês e português",
    ],
    improvements: [
      "Faltam hashtags trending do momento",
      "Algumas tags muito genéricas ('tecnologia', 'youtube')",
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
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10 text-center">
        Analisador de Tags
      </h2>

      {/* Input de tags do usuário */}
      <div className="max-w-4xl mx-auto mb-12">
        <label className="text-xl text-gray-300 mb-4 block text-center">
          Cole suas tags atuais (separadas por vírgula)
        </label>
        <textarea
          value={userTags}
          onChange={(e) => setUserTags(e.target.value)}
          placeholder="Ex: hacking ético, kali linux, cibersegurança, pentest, cybersecurity, ethical hacking"
          rows={4}
          className="w-full px-8 py-6 bg-gray-700/70 border border-gray-600 rounded-3xl text-white text-lg resize-none focus:border-purple-500 focus:outline-none transition-all"
        />
        <p className="text-gray-400 text-center mt-4">
          {analysis.totalTags} tags detectadas • A IA analisa relevância, volume
          e competição
        </p>
      </div>

      {/* Análise da IA */}
      {userTags && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Score e análise das tags atuais */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 justify-center">
                <Hash className="w-8 h-8 text-purple-400" />
                Análise das Suas Tags
              </h3>
              <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 border border-purple-500/40 rounded-3xl p-8 text-center">
                <p className="text-6xl font-bold text-purple-400 mb-4">
                  {analysis.score}/10
                </p>
                <p className="text-2xl text-white mb-2">Relevância Geral</p>
                <p className="text-4xl font-bold text-purple-300">
                  {analysis.relevance}
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div className="bg-emerald-900/20 border border-emerald-500/40 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">
                    Pontos Fortes
                  </h4>
                  <ul className="space-y-3">
                    {analysis.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-emerald-400 mt-0.5" />
                        <p className="text-gray-200">{strength}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-500/40 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6" />
                    Oportunidades de Melhoria
                  </h4>
                  <ul className="space-y-3">
                    {analysis.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5" />
                        <p className="text-gray-200">{imp}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Tags virais do nicho */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 justify-center">
                <TrendingUp className="w-8 h-8 text-emerald-400" />
                Tags Virais do Mesmo Nicho
              </h3>
              <div className="space-y-5">
                {viralTags.map((tag, i) => (
                  <div
                    key={i}
                    className="bg-gray-700/50 rounded-2xl p-6 hover:bg-gray-700 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-white font-bold text-xl">{tag.tag}</p>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          tag.volume === "Muito Alta"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                            : tag.volume === "Alta"
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                        }`}
                      >
                        {tag.volume}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Competição: {tag.competition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sugestões da IA */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 text-center">
              Sugestões Otimizadas da IA
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {aiSuggestions.map((tag, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all cursor-pointer"
                  onClick={() => handleCopy(tag, i)}
                >
                  <p className="text-purple-300 font-bold text-lg mb-3 text-center">
                    {tag}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-purple-400 text-sm">
                    {copiedIndex === i ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">
                          Copiado!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 group-hover:text-purple-300 transition-colors" />
                        <span className="group-hover:text-purple-300 transition-colors">
                          Copiar
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 mt-8 text-lg">
              Estimativa de melhoria: +85% no alcance com essas tags otimizadas
            </p>
          </div>
        </>
      )}

      {/* Placeholder quando vazio */}
      {!userTags && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-2xl">
            Cole suas tags acima para ativar a análise da IA
          </p>
        </div>
      )}
    </div>
  );
}
