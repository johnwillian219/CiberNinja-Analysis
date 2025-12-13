// src/components/insights/general/PlatformFilter.jsx
import { useState } from "react";
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

  return (
    <div className="relative mb-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-5 px-8 py-5 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl text-white font-bold text-xl hover:bg-gray-700 hover:border-gray-600 transition-all shadow-lg"
      >
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-r ${current.gradient} shadow-md`}
        />
        <span>{current.label}</span>
        <ChevronDown
          className={`w-6 h-6 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-80 bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden z-30">
          {platforms.map((platform) => (
            <button
              key={platform.value}
              onClick={() => {
                onChange(platform.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-5 px-8 py-5 text-left text-white hover:bg-gray-700 transition-all ${
                selected === platform.value ? "bg-gray-700" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-r ${platform.gradient} shadow-md`}
              />
              <span className="font-semibold text-lg">{platform.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
