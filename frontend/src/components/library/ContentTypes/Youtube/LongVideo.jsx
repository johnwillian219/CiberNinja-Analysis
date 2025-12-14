// src/components/library/ContentTypes/Youtube/LongVideo.jsx
import { Youtube, Clock } from "lucide-react";

export default function YoutubeLongVideo({ content }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
          <Youtube className="w-10 h-10 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-2xl">
            Vídeo Longo no YouTube
          </p>
          <div className="flex items-center gap-3 text-gray-400">
            <Clock className="w-5 h-5" />
            <span>{content.duration}</span>
          </div>
        </div>
      </div>
      <div className="bg-red-900/20 border border-red-500/40 rounded-2xl p-6">
        <p className="text-red-300 font-medium">
          Recomendação: Vídeos longos performam melhor com hooks fortes nos
          primeiros 15 segundos.
        </p>
      </div>
    </div>
  );
}
