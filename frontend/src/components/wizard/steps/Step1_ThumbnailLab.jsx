// src/components/compare/ThumbnailLab.jsx
import {
  Upload,
  Image,
  Eye,
  Zap,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function ThumbnailLab() {
  const [thumbnailUrl, setThumbnailUrl] = useState(null); // URL da imagem carregada

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

  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 mb-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">
        Laboratório de Thumbnails
      </h2>

      {/* Estado inicial: área de upload */}
      {!thumbnailUrl ? (
        <div className="max-w-4xl mx-auto py-20">
          <label className="block border-2 border-dashed border-gray-600 rounded-3xl p-20 text-center hover:border-purple-500/60 transition-all cursor-pointer">
            <Upload className="w-24 h-24 text-gray-500 mx-auto mb-8" />
            <p className="text-3xl text-gray-300 mb-8 font-medium">
              Carregue sua thumbnail para iniciar a análise da IA
            </p>
            <span className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-white text-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all inline-block">
              Selecionar Imagem
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-gray-500 text-lg mt-8">
              JPG, PNG • Máx. 10MB • Recomendado: 1280×720
            </p>
          </label>
        </div>
      ) : (
        <>
          {/* Após upload: análise completa */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Thumbnail do usuário (agora mostra a imagem real) */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4 justify-center">
                <Eye className="w-9 h-9 text-cyan-400" />
                Sua Thumbnail Atual
              </h3>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={thumbnailUrl}
                  alt="Sua thumbnail"
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-6 right-6 bg-red-500/20 border border-red-500/50 rounded-2xl px-6 py-3">
                  <p className="text-red-400 font-bold text-2xl">CTR: 4.2%</p>
                </div>
              </div>
              <button
                onClick={() => setThumbnailUrl(null)}
                className="mt-6 text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 mx-auto"
              >
                ← Carregar outra imagem
              </button>
            </div>

            {/* Thumbnail viral de referência */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4 justify-center">
                <Zap className="w-9 h-9 text-emerald-400" />
                Thumbnail Viral do Mesmo Nicho
              </h3>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-red-900 to-black flex items-center justify-center relative">
                  <div className="text-center z-10">
                    <p className="text-7xl font-black text-white mb-4 drop-shadow-2xl">
                      HACKED!
                    </p>
                    <p className="text-4xl font-bold text-white mb-8 drop-shadow-2xl">
                      em 60 segundos
                    </p>
                    <div className="inline-block bg-red-600 text-white px-10 py-5 rounded-full text-3xl font-bold shadow-2xl">
                      ASSISTA AGORA →
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                <div className="absolute top-6 right-6 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl px-6 py-3">
                  <p className="text-emerald-400 font-bold text-2xl">
                    CTR: 18.7%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Análise da IA */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 text-center">
              Diagnóstico da IA
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900 border border-emerald-500/40 rounded-3xl p-10">
                <h4 className="text-2xl font-bold text-emerald-400 mb-8 flex items-center gap-4">
                  <CheckCircle className="w-9 h-9" />
                  Pontos Fortes Detectados
                </h4>
                <ul className="space-y-6">
                  <li className="flex items-start gap-5">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mt-1" />
                    <p className="text-gray-200 text-lg">
                      Texto claro e legível com boa fonte
                    </p>
                  </li>
                  <li className="flex items-start gap-5">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mt-1" />
                    <p className="text-gray-200 text-lg">
                      Cores contrastantes (fundo escuro + texto branco)
                    </p>
                  </li>
                  <li className="flex items-start gap-5">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mt-1" />
                    <p className="text-gray-200 text-lg">
                      Expressão facial que transmite curiosidade
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-900/30 to-gray-900 border border-red-500/40 rounded-3xl p-10">
                <h4 className="text-2xl font-bold text-red-400 mb-8 flex items-center gap-4">
                  <AlertTriangle className="w-9 h-9" />
                  Oportunidades de Melhoria
                </h4>
                <ul className="space-y-6">
                  <li className="flex items-start gap-5">
                    <AlertTriangle className="w-8 h-8 text-red-400 mt-1" />
                    <p className="text-gray-200 text-lg">
                      Falta elemento de urgência (seta, "AGORA", número)
                    </p>
                  </li>
                  <li className="flex items-start gap-5">
                    <AlertTriangle className="w-8 h-8 text-red-400 mt-1" />
                    <p className="text-gray-200 text-lg">
                      Texto pequeno — difícil de ler em mobile
                    </p>
                  </li>
                  <li className="flex items-start gap-5">
                    <AlertTriangle className="w-8 h-8 text-red-400 mt-1" />
                    <p className="text-gray-200 text-lg">
                      Sem overlay dramático para destacar o rosto
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sugestões visuais */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10 text-center">
                Sugestões da IA para Aumentar CTR em +200%
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-red-900 to-black rounded-3xl aspect-video mb-6 flex items-center justify-center relative overflow-hidden">
                    <p className="text-5xl font-black text-white z-10 drop-shadow-2xl">
                      HACKED!
                    </p>
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                  <p className="text-white font-medium text-lg">
                    Fundo vermelho + texto impactante
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gray-900 rounded-3xl aspect-video mb-6 flex items-center justify-center border-4 border-dashed border-purple-500">
                    <p className="text-purple-400 text-3xl font-bold">GLITCH</p>
                  </div>
                  <p className="text-white font-medium text-lg">
                    Efeito glitch + código binário
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-black rounded-3xl aspect-video mb-6 flex items-center justify-center relative">
                    <p className="text-5xl font-bold text-cyan-400 z-10">
                      60 SEGUNDOS
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  </div>
                  <p className="text-white font-medium text-lg">
                    Close no rosto + contagem regressiva
                  </p>
                </div>
              </div>

              <p className="text-center text-emerald-400 text-2xl font-bold mt-12">
                Potencial de melhoria: +220% no CTR
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
