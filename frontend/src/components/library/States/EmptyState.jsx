// src/components/library/States/EmptyState.jsx
import { PlusCircle, Youtube, Music, Instagram, Facebook } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-32 text-center ">
      {/* Ícone principal */}
      <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 md:mb-10 border-4 border-dashed border-purple-500/40">
        <PlusCircle className="w-10 h-10 md:w-16 md:h-16 text-purple-400" />
      </div>

      {/* Título */}
      <h3 className="text-xl md:text-4xl font-bold text-white mb-4 md:mb-6">
        <span className="md:hidden">Biblioteca vazia</span>
        <span className="hidden md:inline">Nenhum conteúdo encontrado</span>
      </h3>

      {/* Descrição */}
      <p className="text-gray-300 text-sm md:text-xl max-w-lg md:max-w-2xl mb-6 md:mb-12 leading-relaxed">
        <span className="md:hidden">
          Conecte suas plataformas para importar vídeos automaticamente.
        </span>
        <span className="hidden md:inline">
          Parece que ainda não há conteúdos na sua biblioteca. Conecte suas
          plataformas para importar automaticamente vídeos, shorts e posts.
        </span>
      </p>

      {/* Plataformas */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6 md:mb-8">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-red-500/20 flex items-center justify-center mb-2">
            <Youtube className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
          </div>
          <span className="text-gray-400 text-xs md:text-sm">YouTube</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-pink-500/20 flex items-center justify-center mb-2">
            <Music className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
          </div>
          <span className="text-gray-400 text-xs md:text-sm">TikTok</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-orange-500/20 flex items-center justify-center mb-2">
            <Instagram className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
          </div>
          <span className="text-gray-400 text-xs md:text-sm">Instagram</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-500/20 flex items-center justify-center mb-2">
            <Facebook className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
          </div>
          <span className="text-gray-400 text-xs md:text-sm">Facebook</span>
        </div>
      </div>

      {/* Botão de ação */}
      <button className="mt-1 md:mt-2 px-6 md:px-10 py-2 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl md:rounded-3xl text-white text-base md:text-2xl font-bold hover:shadow-lg md:hover:shadow-2xl hover:shadow-purple-500/50 transition-all active:scale-95">
        <span className="md:hidden">Conectar</span>
        <span className="hidden md:inline">Conectar Plataformas</span>
      </button>
    </div>
  );
}
