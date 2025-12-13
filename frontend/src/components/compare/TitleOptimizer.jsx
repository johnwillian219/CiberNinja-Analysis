// src/components/compare/TitleOptimizer.jsx
import {
  Zap,
  TrendingUp,
  AlertTriangle,
  Copy,
  CheckCircle,
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

  // Análise simulada da IA
  const analysis = {
    score: 6.8,
    ctrEstimate: "6.8%",
    strengths: [
      "Contém palavra-chave principal 'hackear'",
      "Usa número '2025' (atrai curiosidade)",
      "Comprimento ideal (58 caracteres)",
    ],
    improvements: [
      "Falta elemento de urgência ou emoção forte",
      "Não usa palavras de poder (ex: 'exposto', 'segredo', 'proibido')",
      "Poderia começar com hook mais impactante",
    ],
  };

  const viralTitles = [
    {
      title: "O Algoritmo do YouTube Foi EXPLOIDO em 2025 (Prova Real)",
      ctr: "19.2%",
    },
    {
      title: "Como Eu Hackeei o YouTube e Ganhei 100K Views em 24h",
      ctr: "17.8%",
    },
    {
      title: "NUNCA Poste Assim no YouTube em 2025 (Erro Grave)",
      ctr: "16.5%",
    },
    { title: "O Segredo que o YouTube NÃO Quer que Você Saiba", ctr: "15.9%" },
  ];

  const aiSuggestions = [
    "🔴 O Algoritmo do YouTube Foi HACKEADO em 2025 (Prova Dentro)",
    "⚠️ Como Hackear o Algoritmo do YouTube em 2025 (Funciona Mesmo)",
    "🚨 Eu Hackeei o YouTube e Ganhei 200K Views em 1 Semana",
    "O Maior Segredo do Algoritmo do YouTube em 2025 (Exposto)",
    "NUNCA Mais Poste no YouTube Sem Saber Isso em 2025",
  ];

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10 text-center">
        Otimizador de Títulos
      </h2>

      {/* Input do título do usuário */}
      <div className="max-w-4xl mx-auto mb-12">
        <label className="text-xl text-gray-300 mb-4 block text-center">
          Cole seu título atual aqui
        </label>
        <input
          type="text"
          value={userTitle}
          onChange={(e) => setUserTitle(e.target.value)}
          placeholder="Ex: Como hackear o algoritmo do YouTube em 2025"
          className="w-full px-8 py-6 bg-gray-700/70 border border-gray-600 rounded-3xl text-white text-2xl text-center focus:border-purple-500 focus:outline-none transition-all"
        />
        <p className="text-gray-400 text-center mt-4">
          {userTitle.length > 0
            ? `${userTitle.length} caracteres`
            : "A IA analisará automaticamente ao digitar"}
        </p>
      </div>

      {/* Análise da IA */}
      {userTitle && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Score e análise do título atual */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 justify-center">
                <Zap className="w-8 h-8 text-purple-400" />
                Análise do Seu Título
              </h3>
              <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 border border-purple-500/40 rounded-3xl p-8 text-center">
                <p className="text-6xl font-bold text-purple-400 mb-4">
                  {analysis.score}/10
                </p>
                <p className="text-2xl text-white mb-2">CTR Estimado</p>
                <p className="text-4xl font-bold text-purple-300">
                  {analysis.ctrEstimate}
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

            {/* Títulos virais do nicho */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 justify-center">
                <TrendingUp className="w-8 h-8 text-emerald-400" />
                Títulos Virais do Mesmo Nicho
              </h3>
              <div className="space-y-5">
                {viralTitles.map((viral, i) => (
                  <div
                    key={i}
                    className="bg-gray-700/50 rounded-2xl p-6 hover:bg-gray-700 transition-all"
                  >
                    <p className="text-white font-medium text-lg mb-3 line-clamp-2">
                      {viral.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold text-xl">
                        CTR: {viral.ctr}
                      </span>
                      <span className="text-gray-400 text-sm">
                        Viral no nicho
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sugestões da IA */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 text-center">
              Sugestões da IA para Seu Título
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiSuggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/60 transition-all cursor-pointer"
                  onClick={() => handleCopy(suggestion, i)}
                >
                  <p className="text-white text-xl leading-relaxed mb-4">
                    {suggestion}
                  </p>
                  <div className="flex items-center gap-3 text-purple-400 font-medium">
                    {copiedIndex === i ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                        <span className="text-emerald-400">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-6 h-6 group-hover:text-purple-300 transition-colors" />
                        <span className="group-hover:text-purple-300 transition-colors">
                          Copiar sugestão
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 mt-8 text-lg">
              Estimativa de melhoria: +120% a +280% no CTR com essas versões
            </p>
          </div>
        </>
      )}

      {/* Placeholder quando vazio */}
      {!userTitle && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-2xl">
            Digite seu título acima para ativar a análise da IA
          </p>
        </div>
      )}
    </div>
  );
}
