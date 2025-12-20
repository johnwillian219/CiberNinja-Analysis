// src/components/insights/general/PlatformFilter.jsx
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const platforms = [
  {
    value: "all",
    label: "Todas Plataformas",
    gradient: "from-cyan-400 to-emerald-400",
  },
  { value: "youtube", label: "YouTube", gradient: "from-red-500 to-pink-500" },
  { value: "tiktok", label: "TikTok", gradient: "from-pink-500 to-purple-500" },
  {
    value: "instagram",
    label: "Instagram",
    gradient: "from-purple-500 to-orange-500",
  },
  {
    value: "facebook",
    label: "Facebook",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export default function PlatformFilter({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = platforms.find((p) => p.value === selected) || platforms[0];

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative mb-4 sm:mb-6 lg:mb-8">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center sm:gap-3 lg:gap-4 px-3 sm:px-5 lg:px-6 py-2 sm:py-3 lg:py-4 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl lg:rounded-2xl text-white font-bold text-sm sm:text-base lg:text-lg hover:bg-gray-700 hover:border-gray-600 transition-all shadow-lg w-full sm:w-auto"
      >
        <div
          className={`w-5 h-4 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-md sm:rounded-lg bg-gradient-to-r ${current.gradient} shadow-md`}
        />
        <span className="flex-1 text-left ml-2 sm:ml-0">
          <span className="sm:hidden">Plataforma</span>
          <span className="hidden sm:inline">{current.label}</span>
        </span>
        <ChevronDown
          className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1.5 sm:mt-2 lg:mt-3 left-1/2 -translate-x-1/2 w-56 sm:w-64 lg:w-72 bg-gray-800 border border-gray-700 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-2xl overflow-hidden z-30">
          {platforms.map((platform) => (
            <button
              key={platform.value}
              onClick={(e) => {
                e.stopPropagation();
                onChange(platform.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 sm:gap-3 lg:gap-4 px-3 sm:px-5 lg:px-6 py-2.5 sm:py-3 lg:py-4 text-left text-white hover:bg-gray-700 transition-all ${
                selected === platform.value ? "bg-gray-700" : ""
              }`}
            >
              <div
                className={`w-5 h-4 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-md sm:rounded-lg bg-gradient-to-r ${platform.gradient} shadow-md`}
              />
              <span className="font-semibold text-xs sm:text-sm lg:text-base">
                {platform.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
