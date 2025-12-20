// src/components/compare/DescriptionDoctor.jsx - Versão com templates
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
  Link,
  MessageCircle,
  Code,
} from "lucide-react";
import { useState } from "react";

export default function DescriptionDoctor() {
  const [userDescription, setUserDescription] = useState("");
  const [copiedSection, setCopiedSection] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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

  // Templates de descrição
  const descriptionTemplates = [
    {
      id: "tutorial",
      title: "Tutorial Profissional",
      icon: Code,
      description: "Perfecto para vídeos educativos e passo a passo",
    },
    {
      id: "viral",
      title: "Engajamento Viral",
      icon: Zap,
      description: "Maximiza CTR e compartilhamento",
    },
    {
      id: "review",
      title: "Review/Análise",
      icon: MessageCircle,
      description: "Para análises de produtos e serviços",
    },
  ];

  const getOptimizedDescription = (template) => {
    const base = `🔴 HACKEEI o Algoritmo do YouTube em 2025 – Funciona MESMO!

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

    return base;
  };

  const quickSections = [
    {
      icon: Clock,
      title: "Timestamps",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10 border-cyan-500/20",
      content: `⏰ TIMESTAMPS:
00:00 - Introdução
03:42 - Hook secreto
09:15 - Thumbnails que convertem`,
      key: "timestamps",
    },
    {
      icon: Hash,
      title: "Hashtags",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10 border-purple-500/20",
      content:
        "#YouTube2025 #HackingÉtico #CrescernoYouTube #AlgoritmoYouTube #Cibersegurança",
      key: "hashtags",
    },
    {
      icon: Link,
      title: "Links Úteis",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/20",
      content: `• TubeBuddy: https://tubebuddy.com/
• VidIQ: https://vidiq.com/
• Canva: https://canva.com/`,
      key: "links",
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-8">
      {/* Cabeçalho responsivo */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="p-1.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base md:text-2xl font-bold text-white">
              <span className="md:hidden">Descrição</span>
              <span className="hidden md:inline">Médico de Descrições</span>
            </h2>
            <p className="text-gray-400 text-xs md:text-base">
              <span className="md:hidden">Otimize SEO</span>
              <span className="hidden md:inline">
                Otimize SEO e engajamento
              </span>
            </p>
          </div>
        </div>

        {userDescription && (
          <button
            onClick={() => setUserDescription("")}
            className="text-gray-400 hover:text-gray-300 text-xs md:text-base font-medium"
          >
            <span className="md:hidden">Limpar</span>
            <span className="hidden md:inline">Limpar</span>
          </button>
        )}
      </div>

      {/* Input principal */}
      <div className="mb-4 md:mb-8">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <label className="text-xs md:text-lg text-gray-300">
            Descrição do vídeo
          </label>
          <span className="text-gray-500 text-xs">
            {userDescription.length} chars
          </span>
        </div>
        <textarea
          value={userDescription}
          onChange={(e) => setUserDescription(e.target.value)}
          placeholder="Cole aqui a descrição completa do seu vídeo..."
          rows={4}
          className="w-full px-3 md:px-6 py-2 md:py-4 bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl text-sm md:text-base text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-all resize-none"
        />
      </div>

      {/* Templates (apenas desktop) */}
      <div className="hidden md:block mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">
            Templates Prontos
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {descriptionTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedTemplate === template.id
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-gray-600 hover:border-purple-500/50 hover:bg-gray-700/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-gray-700/50">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-white">{template.title}</h4>
                </div>
                <p className="text-gray-400 text-sm">{template.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Análise da IA */}
      {userDescription ? (
        <>
          {/* Score e SEO */}
          <div className="grid grid-cols-2 gap-2 md:gap-6 mb-4 md:mb-8">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg md:rounded-xl p-3 md:p-6 text-center">
              <p className="text-lg md:text-3xl font-bold text-purple-400">
                {analysis.score}/10
              </p>
              <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">
                Score IA
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg md:rounded-xl p-3 md:p-6 text-center">
              <p className="text-lg md:text-3xl font-bold text-emerald-400">
                {analysis.seoScore}
              </p>
              <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">
                SEO Score
              </p>
            </div>
          </div>

          {/* Análise detalhada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-8">
            {/* Pontos fortes */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg md:rounded-xl p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <h3 className="text-xs md:text-lg font-semibold text-emerald-400">
                  Pontos Fortes
                </h3>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {analysis.strengths.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-xs md:text-base">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Melhorias */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-lg md:rounded-xl p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                <h3 className="text-xs md:text-lg font-semibold text-red-400">
                  Melhorias
                </h3>
              </div>
              <ul className="space-y-2 md:space-y-3">
                {analysis.improvements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 md:gap-3">
                    <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-xs md:text-base">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Descrição otimizada */}
          <div className="mb-4 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 md:mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <Zap className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                <h3 className="text-xs md:text-lg font-semibold text-white">
                  Descrição Otimizada
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopy(getOptimizedDescription(selectedTemplate), "full")
                }
                className="flex items-center justify-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs md:text-base font-medium transition-colors w-full sm:w-auto"
              >
                {copiedSection === "full" ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>Copiar Descrição</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-900/50 border border-gray-700/30 rounded-lg md:rounded-xl p-3 md:p-6 max-h-48 md:max-h-80 overflow-y-auto">
              <pre className="text-gray-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {getOptimizedDescription(selectedTemplate)}
              </pre>
            </div>
            <p className="text-emerald-400 text-xs md:text-sm mt-2 text-center">
              Estimativa: +85% engajamento e SEO
            </p>
          </div>

          {/* Seções rápidas */}
          <div>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              <h3 className="text-xs md:text-lg font-semibold text-white">
                Elementos Prontos
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
              {quickSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.key}
                    className={`${section.bgColor} border rounded-lg md:rounded-xl p-2 md:p-3 cursor-pointer hover:opacity-90 transition-opacity`}
                    onClick={() => handleCopy(section.content, section.key)}
                  >
                    <div className="flex items-center justify-between mb-1.5 md:mb-2">
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Icon
                          className={`w-3.5 h-3.5 md:w-4 md:h-4 ${section.color}`}
                        />
                        <p
                          className={`text-xs md:text-sm font-semibold ${section.color}`}
                        >
                          {section.title}
                        </p>
                      </div>
                      {copiedSection === section.key ? (
                        <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-400" />
                      ) : (
                        <Clipboard className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-400" />
                      )}
                    </div>
                    <pre className="text-gray-300 text-xs md:text-sm whitespace-pre-wrap font-sans">
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
        <div className="text-center py-8 md:py-16 border-2 border-dashed border-gray-600 rounded-lg md:rounded-xl">
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-3 md:mb-4">
            <FileText className="w-5 h-5 md:w-8 md:h-8 text-gray-500" />
          </div>
          <h3 className="text-gray-300 text-base md:text-xl mb-1 md:mb-2">
            Digite uma descrição
          </h3>
          <p className="text-gray-500 text-xs md:text-sm px-4">
            A IA vai analisar e sugerir melhorias para SEO e engajamento
          </p>
        </div>
      )}
    </div>
  );
}
