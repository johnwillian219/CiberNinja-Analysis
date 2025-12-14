// src/components/library/ContentTypes/TikTok/Video.jsx
import { Music } from "lucide-react";

export default function TikTokVideo({ content }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-black flex items-center justify-center shadow-lg">
          <Music className="w-10 h-10 text-white" />
        </div>
        <p className="text-white font-bold text-2xl">Vídeo no TikTok</p>
      </div>
      <div className="bg-pink-900/20 border border-pink-500/40 rounded-2xl p-6">
        <p className="text-pink-300 font-medium">
          Priorize hook nos primeiros 3 segundos — 80% da retenção depende
          disso.
        </p>
      </div>
    </div>
  );
}
