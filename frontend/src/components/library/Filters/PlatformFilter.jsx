// src/components/library/Filters/PlatformFilter.jsx
import { Youtube, Music, Instagram, Facebook, Globe } from "lucide-react";
import { useState } from "react";

const platforms = [
  { name: "Todas", icon: Globe, color: "from-gray-500 to-gray-600" },
  { name: "YouTube", icon: Youtube, color: "from-red-500 to-pink-500" },
  { name: "TikTok", icon: Music, color: "from-pink-500 to-purple-500" },
  {
    name: "Instagram",
    icon: Instagram,
    color: "from-purple-500 to-orange-500",
  },
  { name: "Facebook", icon: Facebook, color: "from-blue-500 to-cyan-500" },
];

export default function PlatformFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-4">
      {platforms.map((plat) => {
        const Icon = plat.icon;
        const isSelected =
          selected === plat.name ||
          (selected === null && plat.name === "Todas");

        return (
          <button
            key={plat.name}
            onClick={() => onChange(plat.name === "Todas" ? null : plat.name)}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-medium transition-all ${
              isSelected
                ? "bg-gradient-to-r " +
                  plat.color +
                  " text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-700/70 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plat.color} flex items-center justify-center`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg">{plat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
