// src/components/library/States/EmptyState.jsx
import { PlusCircle, Youtube, Music, Instagram, Facebook } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-10 border-4 border-dashed border-purple-500/40">
        <PlusCircle className="w-16 h-16 text-purple-400" />
      </div>

      <h3 className="text-4xl font-bold text-white mb-6">
        Nenhum conteúdo encontrado
      </h3>

      <p className="text-gray-300 text-xl max-w-2xl mb-12">
        Parece que ainda não há conteúdos na sua biblioteca. Conecte suas
        plataformas para importar automaticamente vídeos, shorts e posts.
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center">
          <Youtube className="w-12 h-12 text-red-500 mb-3" />
          <span className="text-gray-400">YouTube</span>
        </div>
        <div className="flex flex-col items-center">
          <Music className="w-12 h-12 text-pink-500 mb-3" />
          <span className="text-gray-400">TikTok</span>
        </div>
        <div className="flex flex-col items-center">
          <Instagram className="w-12 h-12 text-orange-500 mb-3" />
          <span className="text-gray-400">Instagram</span>
        </div>
        <div className="flex flex-col items-center">
          <Facebook className="w-12 h-12 text-blue-500 mb-3" />
          <span className="text-gray-400">Facebook</span>
        </div>
      </div>

      <button className="mt-12 px-10 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-white text-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all">
        Conectar Plataformas
      </button>
    </div>
  );
}
