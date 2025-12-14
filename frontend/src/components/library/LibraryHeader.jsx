// src/components/library/LibraryHeader.jsx
import { PlusCircle, Filter } from "lucide-react";
import SearchInput from "./Filters/SearchInput"; // ← Import novo

export default function LibraryHeader() {
  return (
    <div className="mb-16">
      {/* Título e descrição */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Biblioteca de Conteúdos
        </h1>
        <p className="text-gray-300 text-xl leading-relaxed px-4">
          Todos os seus vídeos, shorts e posts em um só lugar. Analise, organize
          e otimize com IA.
        </p>
      </div>

      {/* Barra de busca + ações */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Busca reutilizável */}
          <div className="w-full lg:w-3/5">
            <SearchInput
              placeholder="Busque por título, descrição, tags ou ID do vídeo..."
              value=""
              onChange={() => {}} // Em produção: conectar ao estado global/filtro
            />
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
            <button className="flex items-center justify-center gap-4 px-10 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-white text-xl font-bold hover:shadow-2xl hover:shadow-purple-500/40 transition-all">
              <PlusCircle className="w-8 h-8" />
              Importar Conteúdo
            </button>

            <button className="flex items-center justify-center gap-4 px-10 py-6 bg-gray-700/70 border border-gray-600 rounded-3xl text-white text-xl font-medium hover:bg-gray-600 transition-all">
              <Filter className="w-8 h-8" />
              Filtros Avançados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
