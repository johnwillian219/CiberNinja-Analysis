// src/components/library/ContentTypes/Youtube/ShortVideo.jsx
import { Youtube } from "lucide-react";

export default function YoutubeShortVideo({ content }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-purple-600 flex items-center justify-center shadow-lg">
          <Youtube className="w-10 h-10 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-2xl">Short no YouTube</p>
          <p className="text-gray-400">Formato vertical • Alta retenção</p>
        </div>
      </div>
      <div className="bg-purple-900/20 border border-purple-500/40 rounded-2xl p-6">
        <p className="text-purple-300 font-medium">
          Dica: Shorts com loop perfeito podem gerar até 10x mais views.
        </p>
      </div>
    </div>
  );
}
