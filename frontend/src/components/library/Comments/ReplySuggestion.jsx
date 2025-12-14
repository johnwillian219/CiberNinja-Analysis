// src/components/library/Comments/ReplySuggestion.jsx
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function ReplySuggestion({ commentId }) {
  const [approved, setApproved] = useState(false);

  const suggestion =
    "Obrigado pelo feedback! A técnica do hook varia de nicho para nicho. Tenta começar com uma pergunta polêmica relacionada ao tema do vídeo. Me conta se deu certo! 😊";

  return (
    <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/40 rounded-3xl p-8">
      <div className="flex items-center gap-4 mb-6">
        <Sparkles className="w-8 h-8 text-purple-400" />
        <p className="text-purple-300 font-bold text-xl">
          Sugestão de Resposta da IA
        </p>
      </div>

      <p className="text-gray-200 text-lg leading-relaxed mb-8">{suggestion}</p>

      <div className="flex items-center gap-6">
        <button
          onClick={() => setApproved(true)}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold hover:shadow-lg hover:shadow-emerald-500/40 transition-all"
        >
          Aprovar e Responder
        </button>

        <button className="px-8 py-4 bg-gray-700/70 rounded-2xl text-white font-medium hover:bg-gray-600 transition-all">
          Editar Sugestão
        </button>

        <button className="px-8 py-4 bg-gray-700/70 rounded-2xl text-gray-400 hover:text-white transition-all">
          Ignorar
        </button>

        {approved && (
          <p className="text-emerald-400 font-bold text-lg ml-auto">
            Resposta enviada automaticamente!
          </p>
        )}
      </div>
    </div>
  );
}
