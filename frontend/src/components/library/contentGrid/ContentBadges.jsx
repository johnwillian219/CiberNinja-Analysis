// src/components/library/ContentGrid/ContentBadges.jsx
import { Heart, Zap, Film } from "lucide-react";

const platformGradients = {
  YouTube: "from-red-500 to-pink-500",
  TikTok: "from-pink-500 to-purple-500",
  Instagram: "from-purple-500 to-orange-500",
  Facebook: "from-blue-500 to-cyan-500",
};

export default function ContentBadges({ platform, type, isFavorite, isViral }) {
  const gradient = platformGradients[platform] || "from-gray-500 to-gray-600";

  return (
    <div className="flex items-center gap-3 absolute top-4 left-4 z-10">
      {/* Badge da plataforma */}
      <div
        className={`px-4 py-2 rounded-full bg-gradient-to-r ${gradient} text-white font-bold text-sm shadow-lg`}
      >
        {platform}
      </div>

      {/* Badge de tipo (opcional) */}
      {type && (
        <div className="px-4 py-2 rounded-full bg-gray-700/80 text-gray-300 font-medium text-sm backdrop-blur-sm border border-gray-600">
          {type === "long"
            ? "Vídeo Longo"
            : type === "short"
            ? "Short"
            : type === "reel"
            ? "Reel"
            : "Post"}
        </div>
      )}

      {/* Badge viral */}
      {isViral && (
        <div className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg">
          <Zap className="w-4 h-4" />
          Viral
        </div>
      )}

      {/* Favorito */}
      {isFavorite && (
        <div className="p-2 rounded-full bg-red-500/80 text-white shadow-lg">
          <Heart className="w-5 h-5 fill-current" />
        </div>
      )}
    </div>
  );
}
