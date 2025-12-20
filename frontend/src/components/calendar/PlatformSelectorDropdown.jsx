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

  const current =
    platforms.find((p) => p.value === selectedPlatform) || platforms[0];
  const CurrentIcon = current.icon;

  const handleSelect = (value) => {
    onPlatformChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Botão principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-lg md:rounded-xl text-white text-sm md:text-base font-medium hover:border-purple-500/60 hover:bg-gray-800/90 transition-all duration-200 shadow-sm md:shadow whitespace-nowrap min-w-[140px] md:min-w-[160px]"
      >
        <CurrentIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
        <span className="truncate flex-1 text-left">{current.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 transition-transform duration-200 ${
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
          <div className="absolute top-full mt-1 left-0 min-w-full bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-lg md:rounded-xl shadow-lg md:shadow-xl overflow-hidden z-50">
            {platforms.map((plat) => {
              const Icon = plat.icon;
              const isActive = plat.value === selectedPlatform;

              return (
                <button
                  type="button"
                  key={plat.value}
                  onClick={() => handleSelect(plat.value)}
                  className={`w-full flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base transition-all duration-150 hover:bg-gray-700/70 ${
                    isActive
                      ? "bg-purple-500/20 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="truncate text-left">{plat.name}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
