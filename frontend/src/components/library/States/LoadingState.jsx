// src/components/library/States/LoadingState.jsx
import { Loader2 } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <Loader2 className="w-20 h-20 text-purple-400 animate-spin mb-8" />
      <p className="text-3xl font-bold text-white mb-4">
        Carregando conteúdos...
      </p>
      <p className="text-gray-400 text-xl max-w-md text-center">
        Estamos buscando seus vídeos, shorts e posts de todas as plataformas
        conectadas.
      </p>
    </div>
  );
}
