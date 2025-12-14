// src/components/calendar/SuggestedPost/SuggestedPostCard.jsx
import { Sparkles, Clock, PlayCircle } from "lucide-react";
import SuggestedPostBadge from "./SuggestedPostBadge";

export default function SuggestedPostCard({ suggestion, size = "normal" }) {
  // Dados padrão se não passar suggestion
  const data = suggestion || {
    time: "18:00",
    type: "video",
    titleSuggestion: "O maior ataque de phishing de 2025 (análise completa)",
    reason:
      "Seu público está mais ativo às 18h neste dia. Tema em alta com baixa concorrência e alta busca orgânica.",
  };

  const typeLabel =
    {
      video: "Vídeo Longo",
      short: "Short",
      reel: "Reel",
      live: "Live",
      post: "Post",
    }[data.type] || "Vídeo";

  const isLarge = size === "large";

  return (
    <div
      className={`relative bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-gray-900/60 border border-purple-500/50 rounded-3xl p-8 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 ${
        isLarge ? "max-w-4xl mx-auto" : ""
      }`}
    >
      {/* Badge Melhor Horário */}
      <SuggestedPostBadge />

      {/* Cabeçalho com ícone IA */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div>
          <p className="text-purple-300 font-bold text-xl">
            Sugestão Inteligente da IA
          </p>
          <p className="text-gray-400">Baseado no desempenho do seu público</p>
        </div>
      </div>

      {/* Conteúdo sugerido */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <PlayCircle className="w-8 h-8 text-purple-400 flex-shrink-0" />
          <p className="text-white font-bold text-2xl">{typeLabel} sugerido</p>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-6 h-6" />
            <span className="font-medium">{data.time}</span>
          </div>
        </div>

        <div>
          <p className="text-gray-400 mb-3">Título recomendado:</p>
          <p className="text-3xl font-bold text-white leading-tight">
            {data.titleSuggestion}
          </p>
        </div>

        <div>
          <p className="text-gray-400 mb-4">Por que agora?</p>
          <p className="text-gray-200 text-lg leading-relaxed bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
            {data.reason}
          </p>
        </div>

        {/* Botão de ação */}
        <div className="pt-6">
          <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-white text-xl font-bold hover:shadow-2xl hover:shadow-purple-500/60 transition-all flex items-center gap-4 mx-auto">
            <Sparkles className="w-8 h-8" />
            Criar Post com esta Sugestão
          </button>
        </div>
      </div>
    </div>
  );
}
