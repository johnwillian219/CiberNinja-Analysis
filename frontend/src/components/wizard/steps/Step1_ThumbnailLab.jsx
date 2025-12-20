// src/components/compare/ThumbnailLab.jsx - Versão híbrida
import {
  Upload,
  Image,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle,
  X,
  Sparkles,
  Target,
  TrendingUp,
  Download,
} from "lucide-react";
import { useState } from "react";

export default function ThumbnailLab() {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dados das análises
  const strengths = [
    "Texto claro e legível com boa fonte",
    "Cores contrastantes (fundo escuro + texto branco)",
    "Expressão facial que transmite curiosidade",
  ];

  const improvements = [
    "Falta elemento de urgência (seta, 'AGORA', número)",
    "Texto pequeno — difícil de ler em mobile",
    "Sem overlay dramático para destacar o rosto",
  ];

  const suggestions = [
    {
      title: "Fundo vermelho + texto impactante",
      color: "from-red-900 to-black",
      text: "HACKED!",
    },
    {
      title: "Efeito glitch + código binário",
      color: "from-gray-900 to-black",
      border: "border-purple-500",
      text: "GLITCH",
    },
    {
      title: "Close no rosto + contagem",
      color: "from-black to-gray-900",
      text: "60 SEGUNDOS",
      textColor: "text-cyan-400",
    },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 md:p-8">
      {/* Cabeçalho responsivo */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Image className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-white">
              <span className="md:hidden">Thumbnail Lab</span>
              <span className="hidden md:inline">
                Laboratório de Thumbnails
              </span>
            </h2>
            <p className="text-gray-400 text-xs md:text-base">
              <span className="md:hidden">Análise de CTR</span>
              <span className="hidden md:inline">
                Análise de IA para aumentar CTR
              </span>
            </p>
          </div>
        </div>

        {thumbnailUrl && (
          <button
            onClick={() => setThumbnailUrl(null)}
            className="p-1.5 md:p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
            title="Carregar outra imagem"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Estado inicial: upload */}
      {!thumbnailUrl ? (
        <div
          className={`border-2 border-dashed rounded-lg md:rounded-xl p-4 md:p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-purple-500 bg-purple-500/10"
              : "border-gray-600 hover:border-purple-500/60 hover:bg-gray-700/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label className="cursor-pointer block">
            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-2 md:mb-4">
              <Upload className="w-5 h-5 md:w-8 md:h-8 text-gray-400" />
            </div>
            <p className="text-sm md:text-xl text-gray-300 mb-1 md:mb-3 font-medium">
              <span className="md:hidden">Arraste ou clique</span>
              <span className="hidden md:inline">
                Arraste ou clique para carregar
              </span>
            </p>
            <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-6">
              <span className="md:hidden">JPG, PNG • 1280×720</span>
              <span className="hidden md:inline">
                JPG, PNG • Máx. 10MB • 1280×720
              </span>
            </p>
            <span className="inline-block px-3 py-1.5 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white text-xs md:text-base font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              <span className="md:hidden">Selecionar</span>
              <span className="hidden md:inline">Selecionar Imagem</span>
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <>
          {/* Comparação lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
            {/* Thumbnail atual */}
            <div className="bg-gray-900/50 rounded-lg md:rounded-2xl p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6">
                <Eye className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" />
                <h3 className="text-sm md:text-xl font-semibold text-white">
                  <span className="md:hidden">Sua</span>
                  <span className="hidden md:inline">Sua Thumbnail</span>
                </h3>
                <div className="ml-auto bg-red-500/20 px-2 py-0.5 md:px-4 md:py-2 rounded-full">
                  <p className="text-red-400 text-xs md:text-base font-bold">
                    CTR: 4.2%
                  </p>
                </div>
              </div>
              <div className="relative rounded-lg md:rounded-xl overflow-hidden aspect-video bg-gray-800">
                <img
                  src={thumbnailUrl}
                  alt="Sua thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail viral */}
            <div className="bg-gray-900/50 rounded-lg md:rounded-2xl p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6">
                <Zap className="w-4 h-4 md:w-6 md:h-6 text-emerald-400" />
                <h3 className="text-sm md:text-xl font-semibold text-white">
                  <span className="md:hidden">Viral</span>
                  <span className="hidden md:inline">Thumbnail Viral</span>
                </h3>
                <div className="ml-auto bg-emerald-500/20 px-2 py-0.5 md:px-4 md:py-2 rounded-full">
                  <p className="text-emerald-400 text-xs md:text-base font-bold">
                    CTR: 18.7%
                  </p>
                </div>
              </div>
              <div className="relative rounded-lg md:rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-red-900/80 to-black">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 md:p-4">
                  <p className="text-lg md:text-3xl font-black text-white text-center mb-1 md:mb-2 drop-shadow-lg">
                    HACKED!
                  </p>
                  <p className="text-sm md:text-xl font-bold text-white text-center mb-2 md:mb-4 drop-shadow-lg">
                    em 60 segundos
                  </p>
                  <div className="px-2 py-1 md:px-6 md:py-3 bg-red-600 text-white rounded md:rounded-lg text-xs md:text-base font-bold">
                    <span className="md:hidden">ASSISTA →</span>
                    <span className="hidden md:inline">ASSISTA AGORA →</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Análise da IA */}
          <div className="mb-6 md:mb-10">
            <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-6">
              <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-purple-400" />
              <h3 className="text-base md:text-2xl font-semibold text-white">
                Análise da IA
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              {/* Pontos fortes */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg md:rounded-xl p-3 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                  <h4 className="text-sm md:text-lg font-semibold text-emerald-400">
                    Pontos Fortes
                  </h4>
                </div>
                <ul className="space-y-1.5 md:space-y-3">
                  {strengths.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3">
                      <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-xs md:text-base">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Melhorias */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-lg md:rounded-xl p-3 md:p-6">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
                  <h4 className="text-sm md:text-lg font-semibold text-red-400">
                    Melhorias
                  </h4>
                </div>
                <ul className="space-y-1.5 md:space-y-3">
                  {improvements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3">
                      <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-xs md:text-base">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sugestões */}
          <div className="mb-6 md:mb-10">
            <div className="flex items-center justify-between mb-3 md:mb-6">
              <div className="flex items-center gap-2 md:gap-4">
                <Target className="w-4 h-4 md:w-6 md:h-6 text-purple-400" />
                <h3 className="text-base md:text-2xl font-semibold text-white">
                  Sugestões
                </h3>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 md:px-4 md:py-2 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 rounded-full">
                <TrendingUp className="w-3 h-3 md:w-5 md:h-5 text-emerald-400" />
                <span className="text-emerald-400 text-xs md:text-base font-bold">
                  +220% CTR
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`rounded-lg md:rounded-2xl aspect-video mb-1 md:mb-4 flex items-center justify-center ${
                      suggestion.color
                    } ${
                      suggestion.border ? "border " + suggestion.border : ""
                    } overflow-hidden`}
                  >
                    <p
                      className={`text-sm md:text-2xl font-bold ${
                        suggestion.textColor || "text-white"
                      } drop-shadow-lg`}
                    >
                      {suggestion.text}
                    </p>
                  </div>
                  <p className="text-gray-300 text-xs md:text-base font-medium px-1">
                    {suggestion.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-6">
            <button className="flex-1 px-3 py-2 md:px-8 md:py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg text-white text-xs md:text-lg font-medium transition-all flex items-center justify-center gap-2 md:gap-4">
              <Sparkles className="w-4 h-4 md:w-6 md:h-6" />
              <span className="md:hidden">Gerar IA</span>
              <span className="hidden md:inline">Gerar Thumbnail com IA</span>
            </button>
            <button className="flex-1 px-3 py-2 md:px-8 md:py-4 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 text-xs md:text-lg font-medium transition-all flex items-center justify-center gap-2 md:gap-4">
              <Download className="w-4 h-4 md:w-6 md:h-6" />
              <span className="md:hidden">Baixar</span>
              <span className="hidden md:inline">
                Baixar Relatório Completo
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
