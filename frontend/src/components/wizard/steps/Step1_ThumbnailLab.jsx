// src/components/compare/ThumbnailLab.jsx
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
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
      {/* Cabeçalho compacto */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Image className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Laboratório de Thumbnails
            </h2>
            <p className="text-gray-400 text-sm">
              Análise de IA para aumentar CTR
            </p>
          </div>
        </div>

        {thumbnailUrl && (
          <button
            onClick={() => setThumbnailUrl(null)}
            className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
            title="Carregar outra imagem"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>

      {/* Estado inicial: upload */}
      {!thumbnailUrl ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-purple-500 bg-purple-500/10"
              : "border-gray-600 hover:border-purple-500/60 hover:bg-gray-700/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label className="cursor-pointer block">
            <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg text-gray-300 mb-3 font-medium">
              Arraste ou clique para carregar
            </p>
            <p className="text-gray-500 text-sm mb-4">
              JPG, PNG • Máx. 10MB • 1280×720
            </p>
            <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              Selecionar Imagem
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Thumbnail atual */}
            <div className="bg-gray-900/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-semibold text-white">
                  Sua Thumbnail
                </h3>
                <div className="ml-auto bg-red-500/20 px-3 py-1 rounded-full">
                  <p className="text-red-400 text-sm font-bold">CTR: 4.2%</p>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-800">
                <img
                  src={thumbnailUrl}
                  alt="Sua thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail viral */}
            <div className="bg-gray-900/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-semibold text-white">
                  Thumbnail Viral
                </h3>
                <div className="ml-auto bg-emerald-500/20 px-3 py-1 rounded-full">
                  <p className="text-emerald-400 text-sm font-bold">
                    CTR: 18.7%
                  </p>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-video bg-gradient-to-br from-red-900/80 to-black">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <p className="text-2xl font-black text-white text-center mb-2 drop-shadow-lg">
                    HACKED!
                  </p>
                  <p className="text-lg font-bold text-white text-center mb-4 drop-shadow-lg">
                    em 60 segundos
                  </p>
                  <div className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold">
                    ASSISTA AGORA →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Análise da IA */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">
                Análise da IA
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pontos fortes */}
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-emerald-400">
                    Pontos Fortes
                  </h4>
                </div>
                <ul className="space-y-2">
                  {strengths.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Melhorias */}
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <h4 className="text-sm font-semibold text-red-400">
                    Melhorias
                  </h4>
                </div>
                <ul className="space-y-2">
                  {improvements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sugestões */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Sugestões</h3>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-bold">
                  +220% CTR
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`rounded-lg aspect-video mb-2 flex items-center justify-center ${
                      suggestion.color
                    } ${
                      suggestion.border ? "border " + suggestion.border : ""
                    } overflow-hidden`}
                  >
                    <p
                      className={`text-xl font-bold ${
                        suggestion.textColor || "text-white"
                      } drop-shadow-lg`}
                    >
                      {suggestion.text}
                    </p>
                  </div>
                  <p className="text-gray-300 text-xs font-medium">
                    {suggestion.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg text-white font-medium text-sm transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Gerar Thumbnail com IA
            </button>
            <button className="flex-1 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 font-medium text-sm transition-all">
              Baixar Relatório Completo
            </button>
          </div>
        </>
      )}
    </div>
  );
}
