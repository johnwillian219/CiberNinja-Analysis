// src/components/compare/PlatformAnalyzer.jsx
import { Youtube, Music, Instagram, Facebook } from "lucide-react";

const platforms = [
  { name: "YouTube", icon: Youtube, color: "from-red-500 to-red-600" },
  { name: "TikTok", icon: Music, color: "from-cyan-500 to-purple-500" },
  { name: "Instagram", icon: Instagram, color: "from-purple-500 to-pink-500" },
  { name: "Facebook", icon: Facebook, color: "from-blue-500 to-blue-600" },
];

export default function PlatformAnalyzer() {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
          Selecione a Plataforma
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm">
          Onde seu conteúdo será otimizado
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {platforms.map((plat) => {
          const Icon = plat.icon;
          return (
            <button
              key={plat.name}
              className="group relative bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${plat.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <p className="text-white text-sm font-medium text-center truncate">
                {plat.name}
              </p>
            </button>
          );
        })}
      </div>

      <div className="max-w-lg mx-auto">
        <div className="mb-3">
          <label className="text-gray-300 text-sm sm:text-base font-medium mb-1.5 block">
            Nicho/Tema
          </label>
          <input
            type="text"
            placeholder="Ex: hacking ético, cibersegurança"
            className="w-full px-4 py-2.5 text-sm sm:text-base bg-gray-900/50 border border-gray-700/50 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all"
          />
        </div>
        <p className="text-gray-400 text-xs text-center">
          A IA compara com vídeos virais do mesmo nicho
        </p>
      </div>
    </div>
  );
}
