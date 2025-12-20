// src/components/insights/general/AllPlatformsOverview.jsx
export default function AllPlatformsOverview() {
  return (
    <div className="mb-8 sm:mb-10 lg:mb-12 xl:mb-16">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
        Visão Geral Multi-Plataforma
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:shadow-lg sm:hover:shadow-xl lg:hover:shadow-2xl hover:shadow-cyan-500/30 transition-all">
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
            Crescimento Total de Seguidores
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400">
            +32.1K
          </p>
          <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
            Últimos 30 dias
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:shadow-lg sm:hover:shadow-xl lg:hover:shadow-2xl hover:shadow-purple-500/30 transition-all">
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
            Alcance Combinado
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400">
            8.5M
          </p>
          <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
            Impressões + Views
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/40 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:shadow-lg sm:hover:shadow-xl lg:hover:shadow-2xl hover:shadow-red-500/30 transition-all">
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
            Engajamento Médio
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-400">
            14.2%
          </p>
          <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
            +3.8% vs mês anterior
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/40 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:shadow-lg sm:hover:shadow-xl lg:hover:shadow-2xl hover:shadow-blue-500/30 transition-all">
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
            Conteúdos Publicados
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400">
            142
          </p>
          <p className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2">
            Todas as plataformas
          </p>
        </div>
      </div>
    </div>
  );
}
