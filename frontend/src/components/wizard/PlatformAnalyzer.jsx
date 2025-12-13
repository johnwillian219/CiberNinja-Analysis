// src/components/compare/PlatformAnalyzer.jsx
import { Youtube, Music, Instagram, Facebook } from "lucide-react";

const platforms = [
  { name: "YouTube", icon: Youtube, color: "from-red-500 to-pink-500" },
  { name: "TikTok", icon: Music, color: "from-pink-500 to-purple-500" },
  {
    name: "Instagram",
    icon: Instagram,
    color: "from-purple-500 to-orange-500",
  },
  { name: "Facebook", icon: Facebook, color: "from-blue-500 to-cyan-500" },
];

export default function PlatformAnalyzer() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Selecione a Plataforma e o Nicho
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {platforms.map((plat) => {
          const Icon = plat.icon;
          return (
            <button
              key={plat.name}
              className="group relative bg-gray-700/50 rounded-2xl p-8 hover:bg-gray-700 hover:border-purple-500/50 transition-all hover:-translate-y-2"
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${plat.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all`}
              >
                <Icon className="w-12 h-12 text-white" />
              </div>
              <p className="text-white text-xl font-semibold">{plat.name}</p>
            </button>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto">
        <label className="text-gray-300 text-lg mb-3 block">
          Nicho/Tema do seu conteúdo
        </label>
        <input
          type="text"
          placeholder="Ex: hacking ético, cibersegurança, tutoriais de Kali Linux"
          className="w-full px-6 py-4 bg-gray-700/70 border border-gray-600 rounded-2xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all"
        />
        <p className="text-gray-400 text-sm mt-4 text-center">
          A IA vai comparar seu conteúdo com os vídeos virais mais relevantes do
          mesmo nicho.
        </p>
      </div>
    </div>
  );
}
