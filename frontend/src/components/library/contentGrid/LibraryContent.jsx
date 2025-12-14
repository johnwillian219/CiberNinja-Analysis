// src/components/library/contentGrid/LibraryContent.jsx
import { useState, useEffect } from "react";

import PlatformFilter from "../filters/PlatformFilter";
import ContentTypeFilter from "../filters/ContentTypeFilter";
import DateFilter from "../filters/DateFilter";
import SortFilter from "../filters/SortFilter";

import ContentGrid from "./ContentGrid";
import LoadingState from "../states/LoadingState";
import EmptyState from "../states/EmptyState";
import ErrorState from "../states/ErrorState";

export default function LibraryContent() {
  // Estados dos filtros
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");

  // Estados da biblioteca
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contents, setContents] = useState([]); // Em produção: viria da API/store

  // Simulação de carregamento (em produção: fetch real)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // setError(true); // Descomente para testar error state
      // setContents([]); // Descomente para testar empty state
      // Em produção: setContents(dataFromAPI);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Renderização condicional dos estados
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        onRetry={() => {
          setError(false);
          setLoading(true);
          // Re-tentar fetch
        }}
      />
    );
  }

  if (contents.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Título da seção */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Seus Conteúdos</h2>
        <p className="text-gray-300 text-xl">
          {contents.length} itens encontrados com os filtros atuais
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 mb-16">
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-10">
          Filtros Aplicados
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Coluna esquerda */}
          <div className="space-y-10">
            <div>
              <p className="text-gray-400 text-lg mb-5 font-medium">
                Plataforma
              </p>
              <PlatformFilter
                selected={selectedPlatform}
                onChange={setSelectedPlatform}
              />
            </div>

            <div>
              <p className="text-gray-400 text-lg mb-5 font-medium">
                Tipo de Conteúdo
              </p>
              <ContentTypeFilter
                platform={selectedPlatform}
                selected={selectedType}
                onChange={setSelectedType}
              />
            </div>
          </div>

          {/* Coluna direita */}
          <div className="space-y-10">
            <div>
              <p className="text-gray-400 text-lg mb-5 font-medium">Período</p>
              <DateFilter selected={selectedDate} onChange={setSelectedDate} />
            </div>

            <div>
              <p className="text-gray-400 text-lg mb-5 font-medium">
                Ordenar por
              </p>
              <SortFilter selected={selectedSort} onChange={setSelectedSort} />
            </div>
          </div>
        </div>

        {/* Botão limpar filtros (opcional futuro) */}
        {(selectedPlatform ||
          selectedType ||
          selectedDate !== "all" ||
          selectedSort !== "recent") && (
          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setSelectedPlatform(null);
                setSelectedType(null);
                setSelectedDate("all");
                setSelectedSort("recent");
              }}
              className="text-purple-400 hover:text-purple-300 font-medium text-lg transition-colors"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>

      {/* Grid de conteúdos */}
      <ContentGrid
        platform={selectedPlatform}
        type={selectedType}
        date={selectedDate}
        sort={selectedSort}
        contents={contents} // Em produção: passar os dados filtrados
      />
    </div>
  );
}
