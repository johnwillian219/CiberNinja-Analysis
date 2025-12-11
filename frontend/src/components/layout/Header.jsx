// src/components/layout/Header.jsx
export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 lg:px-8 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Título e subtítulo */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Visão Geral da CiberNinja
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Últimos 30 dias • Dados atualizados automaticamente
        </p>
      </div>

      {/* Botões de ação */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm font-medium"
          aria-label="Atualizar dados"
        >
          <span className="text-lg">🔄</span>
          Atualizar dados
        </button>

        <button
          className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-lg"
          aria-label="Configurações"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}
