// src/components/compare/DescriptionDoctor.jsx
import {
  FileText,
  Zap,
  TrendingUp,
  AlertTriangle,
  Copy,
  Check,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function DescriptionDoctor() {
  const [userDescription, setUserDescription] = useState("");
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Análise simulada da IA
  const analysis = {
    score: 7.1,
    seoScore: "Bom",
    length: userDescription.length || 850,
    strengths: [
      "Boa densidade de palavras-chave naturais",
      "Inclui links relevantes",
      "Tem chamadas para ação (CTA)",
    ],
    improvements: [
      "Faltam timestamps para vídeos longos",
      "Não usa hashtags no final",
      "Poderia ter mais emojis para destaque visual",
      "Falta menção a vídeos relacionados",
    ],
  };

  const aiOptimizedDescription = `🔴 HACKEEI o Algoritmo do YouTube em 2025 – Funciona MESMO!

Neste vídeo eu revelo as estratégias que usei para explodir meu canal em 2025. Tudo baseado em testes reais e mudanças no algoritmo.

⏰ TIMESTAMPS:
00:00 - Introdução
01:15 - O maior erro que 90% dos creators cometem
03:42 - A técnica de hook que triplicou meu CTR
06:28 - Como usar thumbnails para dobrar as views
09:15 - O segredo dos títulos que o YouTube AMA
12:50 - Tags que realmente funcionam em 2025
15:30 - Conclusão e dica final

🛠 Ferramentas mencionadas:
• TubeBuddy (melhor extensão): https://www.tubebuddy.com/ciberninja
• VidIQ: https://vidiq.com/ciberninja

🚀 Quer aprender cibersegurança do zero até nível profissional?
Curso COMPLETO de Hacking Ético: https://ciberninja.com.br/curso

💬 Comenta aqui embaixo: qual sua maior dificuldade no YouTube hoje?

#YouTube2025 #HackingÉtico #CrescernoYouTube #AlgoritmoYouTube #Cibersegurança

Inscreva-se e ative o sininho 🔔 para não perder os próximos vídeos!`;

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-10 text-center">
        Médico de Descrições
      </h2>

      {/* Input da descrição do usuário */}
      <div className="max-w-5xl mx-auto mb-12">
        <label className="text-xl text-gray-300 mb-4 block text-center">
          Cole a descrição atual do seu vídeo
        </label>
        <textarea
          value={userDescription}
          onChange={(e) => setUserDescription(e.target.value)}
          placeholder="Cole aqui a descrição completa do seu vídeo..."
          rows={10}
          className="w-full px-8 py-6 bg-gray-700/70 border border-gray-600 rounded-3xl text-white text-lg resize-none focus:border-purple-500 focus:outline-none transition-all"
        />
        <p className="text-gray-400 text-center mt-4">
          {analysis.length} caracteres • A IA analisa SEO, estrutura e
          engajamento
        </p>
      </div>

      {/* Análise da IA */}
      {userDescription && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
            {/* Score e análise da descrição atual */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 justify-center">
                <FileText className="w-8 h-8 text-purple-400" />
                Análise da Sua Descrição
              </h3>
              <div className="bg-gradient-to-br from-purple-900/30 to-gray-900 border border-purple-500/40 rounded-3xl p-8 text-center">
                <p className="text-6xl font-bold text-purple-400 mb-4">
                  {analysis.score}/10
                </p>
                <p className="text-2xl text-white mb-2">
                  Pontuação SEO & Engajamento
                </p>
                <p className="text-4xl font-bold text-purple-300">
                  {analysis.seoScore}
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
                        <Check className="w-6 h-6 text-emerald-400 mt-0.5" />
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

            {/* Descrição otimizada pela IA */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-4 justify-center">
                <Zap className="w-8 h-8 text-emerald-400" />
                Descrição Otimizada pela IA
              </h3>
              <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900 border border-emerald-500/40 rounded-3xl p-8 relative">
                <pre className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap font-sans">
                  {aiOptimizedDescription}
                </pre>
                <button
                  onClick={() => handleCopy(aiOptimizedDescription, "full")}
                  className="absolute top-6 right-6 flex items-center gap-3 px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 font-bold hover:bg-emerald-500/30 transition-all"
                >
                  {copiedSection === "full" ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar Tudo
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-emerald-400 text-lg mt-6 font-bold">
                Estimativa: +85% no engajamento e SEO com esta versão
              </p>
            </div>
          </div>

          {/* Seções rápidas para copiar */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Seções Prontas para Copiar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className="bg-gray-700/50 rounded-2xl p-6 cursor-pointer hover:bg-gray-700 transition-all"
                onClick={() =>
                  handleCopy(
                    "⏰ TIMESTAMPS:\n00:00 - Introdução\n03:42 - Hook secreto\n09:15 - Thumbnails que convertem",
                    "timestamps"
                  )
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-7 h-7 text-cyan-400" />
                  {copiedSection === "timestamps" && (
                    <Check className="w-6 h-6 text-emerald-400" />
                  )}
                </div>
                <p className="text-cyan-300 font-bold mb-2">
                  Timestamps Prontos
                </p>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {`⏰ TIMESTAMPS:
00:00 - Introdução
03:42 - Hook secreto
09:15 - Thumbnails que convertem`}
                </pre>
              </div>

              <div
                className="bg-gray-700/50 rounded-2xl p-6 cursor-pointer hover:bg-gray-700 transition-all"
                onClick={() =>
                  handleCopy(
                    "#YouTube2025 #HackingÉtico #CrescernoYouTube #AlgoritmoYouTube #Cibersegurança",
                    "hashtags"
                  )
                }
              >
                <div className="flex items-center justify-between mb-4">
                  <Hash className="w-7 h-7 text-purple-400" />
                  {copiedSection === "hashtags" && (
                    <Check className="w-6 h-6 text-emerald-400" />
                  )}
                </div>
                <p className="text-purple-300 font-bold mb-2">
                  Hashtags Otimizadas
                </p>
                <p className="text-gray-300">
                  #YouTube2025 #HackingÉtico #CrescernoYouTube #AlgoritmoYouTube
                  #Cibersegurança
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Placeholder quando vazio */}
      {!userDescription && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-2xl">
            Cole a descrição do seu vídeo acima para ativar o diagnóstico da IA
          </p>
        </div>
      )}
    </div>
  );
}
