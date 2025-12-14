// src/components/library/VideoDetails/VideoComments.jsx
import { MessageCircle } from "lucide-react";

export default function VideoComments() {
  return (
    <div>
      <h3 className="text-3xl font-bold text-white mb-10">Comentários</h3>

      <div className="text-center py-32">
        <MessageCircle className="w-32 h-32 text-gray-600 mx-auto mb-8" />
        <p className="text-gray-400 text-2xl mb-4">
          Seção de comentários em desenvolvimento
        </p>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Em breve: lista de comentários, respostas sugeridas pela IA e análise
          de sentimento.
        </p>
      </div>
    </div>
  );
}
