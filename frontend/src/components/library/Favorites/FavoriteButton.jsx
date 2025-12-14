// src/components/library/Favorites/FavoriteButton.jsx
import { Heart } from "lucide-react";
import { useState } from "react";

export default function FavoriteButton({
  isFavorite = false,
  onToggle,
  size = "default",
}) {
  const [localFavorite, setLocalFavorite] = useState(isFavorite);

  const handleClick = (e) => {
    e.stopPropagation();
    setLocalFavorite(!localFavorite);
    if (onToggle) onToggle(!localFavorite);
  };

  const sizeClass = size === "large" ? "w-12 h-12" : "w-9 h-9";
  const iconSize = size === "large" ? "w-7 h-7" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className={`group relative flex items-center justify-center rounded-full transition-all duration-300 ${
        localFavorite
          ? "bg-red-500/20 border border-red-500/50"
          : "bg-gray-700/70 border border-gray-600 hover:bg-gray-600"
      } ${sizeClass}`}
    >
      <Heart
        className={`transition-all duration-300 ${
          localFavorite
            ? "fill-red-500 text-red-500 scale-110"
            : "text-gray-400 group-hover:text-red-400"
        } ${iconSize}`}
      />
      {localFavorite && (
        <div className="absolute inset-0 rounded-full animate-ping bg-red-500/30" />
      )}
    </button>
  );
}
