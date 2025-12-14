// src/components/library/VideoDetails/VideoNotes.jsx
import { Edit3 } from "lucide-react";

export default function VideoNotes() {
  return (
    <div>
      <h3 className="text-3xl font-bold text-white mb-10">Minhas Notas</h3>

      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 rounded-3xl p-8 border border-gray-700/50">
          <textarea
            placeholder="Adicione suas observações, ideias de melhoria, lembretes ou insights sobre este conteúdo..."
            rows={12}
            className="w-full bg-transparent text-white text-lg resize-none focus:outline-none placeholder-gray-500"
          />
          <div className="mt-6 flex justify-end">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold hover:shadow-lg hover:shadow-purple-500/40 transition-all">
              Salvar Notas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
