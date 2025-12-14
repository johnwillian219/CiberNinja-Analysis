// src/components/library/Favorites/FavoritesBadge.jsx
import { Heart } from "lucide-react";

export default function FavoritesBadge() {
  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-red-500/20 border-4 border-red-500/50 flex items-center justify-center shadow-lg animate-pulse">
          <Heart className="w-7 h-7 text-red-500 fill-red-500" />
        </div>
        <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
      </div>
    </div>
  );
}
