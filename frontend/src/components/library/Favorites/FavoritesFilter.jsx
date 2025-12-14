// src/components/library/Favorites/FavoritesFilter.jsx
import { Heart } from "lucide-react";

export default function FavoritesFilter({ selected, onChange }) {
  return (
    <button
      onClick={() => onChange(!selected)}
      className={`flex items-center gap-4 px-8 py-5 rounded-3xl font-bold text-xl transition-all duration-300 ${
        selected
          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/40"
          : "bg-gray-700/70 text-gray-300 hover:bg-gray-600 border border-gray-600"
      }`}
    >
      <Heart className={`w-8 h-8 ${selected ? "fill-white" : ""}`} />
      Apenas Favoritos
    </button>
  );
}
