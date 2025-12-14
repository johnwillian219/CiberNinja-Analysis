// src/components/library/Content/ContentOverlay.jsx
import { PlayCircle } from "lucide-react";

export default function ContentOverlay() {
  return (
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <PlayCircle className="w-20 h-20 text-white drop-shadow-2xl" />
    </div>
  );
}
