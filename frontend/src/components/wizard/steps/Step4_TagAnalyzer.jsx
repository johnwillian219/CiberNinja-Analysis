// src/components/compare/TagAnalyzer.jsx - Versão com análise avançada
import {
  Hash,
  TrendingUp,
  Zap,
  AlertTriangle,
  Copy,
  CheckCircle,
  Sparkles,
  Target,
  BarChart3,
  Globe,
  TrendingDown,
  Target as TargetIcon,
  Hash as HashIcon,
  Zap as ZapIcon,
} from "lucide-react";
import { useState } from "react";

export default function TagAnalyzer() {
  const [userTags, setUserTags] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCopy = (tag, index) => {
    navigator.clipboard.writeText(tag);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);

    // Adicionar à lista de tags selecionadas (apenas para demonstração)
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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
    tagTypes: [
      { type: "Nicho", count: 4, color: "bg-purple-500/20 text-purple-400" },
      { type: "Broad", count: 3, color: "bg-blue-500/20 text-blue-400" },
      {
        type: "Trending",
        count: 2,
        color: "bg-emerald-500/20 text-emerald-400",
      },
      { type: "Brand", count: 3, color: "bg-cyan-500/20 text-cyan-400" },
    ],
  };

  const viralTags = [
    {
      tag: "#cybersecurity",
      volume: "Alta",
      competition: "Média",
      trend: "+12%",
      reach: "12M",
      description: "Segurança digital e proteção",
    },
    {
      tag: "#hacking",
      volume: "Muito Alta",
      competition: "Alta",
      trend: "+8%",
      reach: "45M",
      description: "Hacking em geral",
    },
    {
      tag: "#ethicalhacking",
      volume: "Alta",
      competition: "Baixa",
      trend: "+25%",
      reach: "8M",
      description: "Hacking ético e legal",
    },
    {
      tag: "#kalilinux",
      volume: "Média",
      competition: "Baixa",
      trend: "+18%",
      reach: "5M",
      description: "Sistema para segurança",
    },
    {
      tag: "#pentest",
      volume: "Alta",
      competition: "Média",
      trend: "+15%",
      reach: "7M",
      description: "Testes de penetração",
    },
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

  const tagCategories = [
    {
      name: "Alta Relevância",
      color: "from-emerald-500 to-emerald-600",
      tags: ["#ethicalhacking", "#kalilinuxbr", "#pentestbr"],
    },
    {
      name: "Baixa Competição",
      color: "from-cyan-500 to-blue-500",
      tags: ["#ciberseguranca", "#infosec", "#redteam"],
    },
    {
      name: "Trending",
      color: "from-purple-500 to-pink-500",
      tags: ["#cybersecurity2025", "#hackingetico", "#segurancadigital"],
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl p-2 md:p-8">
      {/* Cabeçalho responsivo */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="p-1.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <HashIcon className="w-4 h-4 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base md:text-2xl font-bold text-white">
              Analisador de Tags
            </h2>
            <p className="text-gray-400 text-xs md:text-base">
              Otimize alcance, SEO e descoberta
            </p>
          </div>
        </div>

        {userTags && (
          <button
            onClick={() => setUserTags("")}
            className="text-gray-400 hover:text-gray-300 text-xs md:text-base font-medium"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Input de tags */}
      <div className="mb-4 md:mb-8">
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <label className="text-xs md:text-lg text-gray-300">
            Suas tags (separadas por vírgula)
          </label>
          {userTags && (
            <span className="text-gray-400 text-xs md:text-sm">
              {analysis.totalTags} tags
            </span>
          )}
        </div>
        <textarea
          value={userTags}
          onChange={(e) => setUserTags(e.target.value)}
          placeholder="Ex: hacking ético, kali linux, cibersegurança, pentest"
          rows={3}
          className="w-full px-3 md:px-6 py-2 md:py-4 bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl text-sm md:text-base text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all resize-none"
        />
      </div>

      {/* Análise da IA */}
      {userTags ? (
        <>
          {/* Score e análises principais */}
          <div className="grid grid-cols-2 gap-2 md:gap-6 mb-4 md:mb-8">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg md:rounded-xl p-3 md:p-6 text-center">
              <p className="text-lg md:text-4xl font-bold text-purple-400">
                {analysis.score}/10
              </p>
              <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">
                Score IA
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-lg md:rounded-xl p-3 md:p-6 text-center">
              <p className="text-lg md:text-4xl font-bold text-emerald-400">
                {analysis.relevance}
              </p>
              <p className="text-gray-300 text-xs md:text-base mt-1 md:mt-2">
                Relevância
              </p>
            </div>
          </div>

          {/* Tipos de tags (apenas desktop) */}
          <div className="hidden md:block mb-6">
            <div className="flex items-center gap-2 mb-3">
              <HashIcon className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                Distribuição de Tags
              </h3>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {analysis.tagTypes.map((type, index) => (
                <div
                  key={index}
                  className={`${type.color} border border-current/20 rounded-xl p-4 text-center`}
                >
                  <p className="text-2xl font-bold mb-1">{type.count}</p>
                  <p className="text-sm font-medium">{type.type}</p>
                </div>
              ))}
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

          {/* Categorias de tags recomendadas (apenas desktop) */}
          <div className="hidden md:block mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TargetIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">
                Categorias Recomendadas
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {tagCategories.map((category, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${category.color}/10 border border-current/20 rounded-xl p-4`}
                >
                  <h4 className="font-semibold text-white mb-2">
                    {category.name}
                  </h4>
                  <div className="space-y-1">
                    {category.tags.map((tag, tagIndex) => (
                      <div
                        key={tagIndex}
                        className="flex items-center justify-between px-2 py-1 bg-black/20 rounded"
                      >
                        <span className="text-sm text-gray-200">{tag}</span>
                        <button
                          onClick={() => toggleTagSelection(tag)}
                          className={`p-1 rounded ${
                            selectedTags.includes(tag)
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-gray-700/50 text-gray-400 hover:text-white"
                          }`}
                        >
                          {selectedTags.includes(tag) ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <span className="text-xs">+</span>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags virais */}
          <div className="mb-4 md:mb-8">
            <div className="flex items-center gap-1.5 md:gap-3 mb-2 md:mb-4">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
              <h3 className="text-xs md:text-lg font-semibold text-white">
                Tags Virais do Nicho
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              {viralTags.map((viral, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 rounded-lg md:rounded-xl p-3 md:p-4 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-purple-300 text-sm md:text-base font-medium">
                        {viral.tag}
                      </span>
                      <p className="text-gray-400 text-xs md:text-sm mt-1">
                        {viral.description}
                      </p>
                    </div>
                    <span className="text-emerald-400 text-sm md:text-base font-bold">
                      {viral.trend}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div className="bg-black/20 rounded p-2 text-center">
                      <p className="text-gray-400 text-xs">Volume</p>
                      <p
                        className={`text-xs md:text-sm font-medium ${
                          viral.volume === "Muito Alta"
                            ? "text-emerald-400"
                            : viral.volume === "Alta"
                            ? "text-cyan-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {viral.volume}
                      </p>
                    </div>
                    <div className="bg-black/20 rounded p-2 text-center">
                      <p className="text-gray-400 text-xs">Competição</p>
                      <p
                        className={`text-xs md:text-sm font-medium ${
                          viral.competition === "Baixa"
                            ? "text-emerald-400"
                            : viral.competition === "Média"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {viral.competition}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sugestões da IA */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2 md:mb-4">
              <div className="flex items-center gap-1.5 md:gap-3">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                <h3 className="text-xs md:text-lg font-semibold text-white">
                  Sugestões da IA
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-xs md:text-base font-bold">
                  +85% alcance estimado
                </span>
                {selectedTags.length > 0 && (
                  <span className="text-xs md:text-sm text-gray-400">
                    {selectedTags.length} selecionadas
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
              {aiSuggestions.map((tag, index) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <div
                    key={index}
                    className={`group border rounded-lg md:rounded-xl p-2 md:p-3 transition-all cursor-pointer ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:border-purple-500/40"
                    }`}
                    onClick={() => handleCopy(tag, index)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="text-purple-300 text-xs md:text-sm font-medium mb-1.5 line-clamp-1">
                        {tag}
                      </span>
                      <div className="flex items-center gap-1">
                        {copiedIndex === index ? (
                          <>
                            <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[10px] md:text-xs">
                              Copiado
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-400 group-hover:text-purple-300" />
                            <span className="text-gray-400 text-[10px] md:text-xs group-hover:text-purple-300">
                              Copiar
                            </span>
                          </>
                        )}
                      </div>
                    </div>
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
            <Target className="w-5 h-5 md:w-8 md:h-8 text-gray-500" />
          </div>
          <h3 className="text-gray-300 text-base md:text-xl mb-1 md:mb-2">
            Cole suas tags para análise
          </h3>
          <p className="text-gray-500 text-xs md:text-sm px-4">
            A IA vai sugerir tags otimizadas para aumentar seu alcance
          </p>
        </div>
      )}
    </div>
  );
}
