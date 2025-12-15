// src/components/calendar/PlatformSelectorDropdown.jsx
import { useState } from "react";
import { Youtube, Music, Instagram, Facebook, ChevronDown } from "lucide-react";

const platforms = [
  { name: "YouTube", value: "YouTube", icon: Youtube },
  { name: "TikTok", value: "TikTok", icon: Music },
  { name: "Instagram", value: "Instagram", icon: Instagram },
  { name: "Facebook", value: "Facebook", icon: Facebook },
];

export default function PlatformSelectorDropdown({
  selectedPlatform,
  onPlatformChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Encontra a plataforma atual (padrão: primeira da lista)
  const current =
    platforms.find((p) => p.value === selectedPlatform) || platforms[0];
  const CurrentIcon = current.icon;

  const handleSelect = (value) => {
    onPlatformChange(value); // ← chama a função do pai
    setIsOpen(false); // ← fecha o dropdown
  };

  return (
    <div className="relative">
      {/* Botão principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 px-8 py-6 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl text-white text-2xl font-bold hover:border-purple-500/60 transition-all duration-300 shadow-lg"
      >
        <CurrentIcon className="w-10 h-10" />
        {current.name}
        <ChevronDown
          className={`w-8 h-8 ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full mt-4 left-0 min-w-full bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden z-50">
            {platforms.map((plat) => {
              const Icon = plat.icon;
              const isActive = plat.value === selectedPlatform;

              return (
                <button
                  type="button"
                  key={plat.value}
                  onClick={() => handleSelect(plat.value)}
                  className={`w-full flex items-center gap-5 px-8 py-6 text-left text-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-500/30 text-white"
                      : "text-gray-300 hover:bg-gray-700/70 hover:text-white"
                  }`}
                >
                  <Icon className="w-10 h-10" />
                  {plat.name}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
