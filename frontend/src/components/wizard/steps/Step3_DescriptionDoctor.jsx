// src/components/compare/DescriptionDoctor.jsx
import {
  FileText,
  Zap,
  AlertTriangle,
  Copy,
  CheckCircle,
  Clock,
  Hash,
  Sparkles,
  Clipboard,
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

  // Dados da análise
  const analysis = {
    score: 7.1,
    seoScore: "Bom",
    length: userDescription.length || 850,
    strengths: [
      "Boa densidade de palavras-chave",
      "Inclui links relevantes",
      "Tem chamadas para ação (CTA)",
    ],
    improvements: [
      "Faltam timestamps para vídeos longos",
      "Não usa hashtags no final",
      "Poderia ter mais emojis",
      "Falta menção a vídeos relacionados",
    ],
  };

  const aiOptimizedDescription = `🔴 HACKEEI o Algoritmo do YouTube em 2025 – Funciona MESMO!

Neste vídeo eu revelo as estratégias que usei para explodir meu canal em 2025. Tudo baseado em testes reais e mudanças no algoritmo.

⏰ TIMESTAMPS:
00:00 - Introdução
01:15 - O maior erro que 90% cometem
03:42 - Técnica de hook que triplicou CTR
06:28 - Thumbnails que dobram views
09:15 - Títulos que o YouTube AMA
12:50 - Tags que funcionam em 2025

🛠 Ferramentas:
• TubeBuddy: https://www.tubebuddy.com/ciberninja
• VidIQ: https://vidiq.com/ciberninja

🚀 Curso COMPLETO de Hacking Ético:
https://ciberninja.com.br/curso

💬 Comenta: qual sua maior dificuldade?

#YouTube2025 #HackingÉtico #CrescernoYouTube #AlgoritmoYouTube

Inscreva-se e ative o sininho 🔔`;

  const quickSections = [
    {
      icon: Clock,
      title: "Timestamps Prontos",
      color: "cyan",
      content: `⏰ TIMESTAMPS:
00:00 - Introdução
03:42 - Hook secreto
09:15 - Thumbnails que convertem`,
      key: "timestamps",
    },
    {
      icon: Hash,
      title: "Hashtags Otimizadas",
      color: "purple",
      content:
        "#YouTube2025 #HackingÉtico #CrescernoYouTube #AlgoritmoYouTube #Cibersegurança",
      key: "hashtags",
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
      {/* Cabeçalho compacto */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Médico de Descrições
            </h2>
            <p className="text-gray-400 text-sm">Otimize SEO e engajamento</p>
          </div>
        </div>

        {userDescription && (
          <button
            onClick={() => setUserDescription("")}
            className="text-gray-400 hover:text-gray-300 text-sm font-medium"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Textarea da descrição */}
      <div className="mb-6">
        <label className="text-sm text-gray-300 mb-2 block">
          Cole a descrição do seu vídeo
        </label>
        <div className="relative">
          <textarea
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            placeholder="Cole aqui a descrição completa do seu vídeo..."
            rows={6}
            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-all resize-none pr-24"
          />
          {userDescription.length > 0 && (
            <span className="absolute right-3 top-3 text-gray-400 text-xs">
              {analysis.length} chars
            </span>
          )}
        </div>
      </div>

      {/* Análise da IA */}
      {userDescription ? (
        <>
          {/* Score e SEO */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-400">
                {analysis.score}/10
              </p>
              <p className="text-gray-300 text-xs mt-1">Pontuação IA</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">
                {analysis.seoScore}
              </p>
              <p className="text-gray-300 text-xs mt-1">SEO Score</p>
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

          {/* Descrição otimizada */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">
                  Descrição Otimizada
                </h3>
              </div>
              <button
                onClick={() => handleCopy(aiOptimizedDescription, "full")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-medium transition-colors"
              >
                {copiedSection === "full" ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar Tudo
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-900/50 border border-gray-700/30 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {aiOptimizedDescription}
              </pre>
            </div>
            <p className="text-emerald-400 text-xs mt-2 text-center">
              Estimativa: +85% engajamento e SEO
            </p>
          </div>

          {/* Seções rápidas */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">
                Seções Prontas
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickSections.map((section) => {
                const Icon = section.icon;
                const colorClass = `text-${section.color}-400`;
                const bgClass = `bg-${section.color}-500/10 border-${section.color}-500/20`;

                return (
                  <div
                    key={section.key}
                    className={`${bgClass} border rounded-lg p-3 cursor-pointer hover:opacity-90 transition-opacity`}
                    onClick={() => handleCopy(section.content, section.key)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${colorClass}`} />
                        <p className={`text-xs font-semibold ${colorClass}`}>
                          {section.title}
                        </p>
                      </div>
                      {copiedSection === section.key ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Clipboard className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </div>
                    <pre className="text-gray-300 text-xs whitespace-pre-wrap font-sans">
                      {section.content}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Estado vazio */
        <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-gray-400 text-sm">
            Cole uma descrição para análise da IA
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Receba sugestões para aumentar engajamento em +85%
          </p>
        </div>
      )}
    </div>
  );
}
