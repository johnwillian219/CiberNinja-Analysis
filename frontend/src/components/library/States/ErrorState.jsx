// src/components/library/States/ErrorState.jsx
import { AlertTriangle } from "lucide-react";

export default function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mb-10 border-4 border-dashed border-red-500/40">
        <AlertTriangle className="w-16 h-16 text-red-400" />
      </div>

      <h3 className="text-4xl font-bold text-white mb-6">
        Oops! Algo deu errado
      </h3>

      <p className="text-gray-300 text-xl max-w-2xl mb-12">
        Não foi possível carregar seus conteúdos no momento. Pode ser um
        problema temporário de conexão com as plataformas.
      </p>

      <button
        onClick={onRetry}
        className="px-10 py-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl text-white text-2xl font-bold hover:shadow-2xl hover:shadow-red-500/50 transition-all"
      >
        Tentar Novamente
      </button>
    </div>
  );
}
