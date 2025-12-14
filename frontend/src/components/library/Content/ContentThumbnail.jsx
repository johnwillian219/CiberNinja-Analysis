// src/components/library/ContentGrid/ContentThumbnail.jsx
import { PlayCircle } from "lucide-react";

export default function ContentThumbnail({ thumbnailUrl, title, duration }) {
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden group">
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay de play no hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <PlayCircle className="w-20 h-20 text-white drop-shadow-2xl" />
      </div>

      {/* Duração no canto inferior direito */}
      {duration && (
        <div className="absolute bottom-3 right-3 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm">
          {duration}
        </div>
      )}
    </div>
  );
}
