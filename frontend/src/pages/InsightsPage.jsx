// src/pages/InsightsPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";

export default function InsightsPage() {
  return (
    <DashboardLayout>
      <div className="p-8 lg:p-12">
        {/* Cabeçalho da página */}
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Insights da Inteligência Artificial
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl">
            Análise avançada do seu conteúdo com previsões, alertas e
            recomendações personalizadas em tempo real.
          </p>
        </div>

        {/* Status da IA */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/40 rounded-full">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 font-bold">
              Katana IA v2 • Ativa
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              Última análise: há poucos segundos
            </span>
          </div>
        </div>

        {/* Placeholder para conteúdo futuro */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="h-8 bg-gray-700 rounded w-4/5 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-11/12 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-10/12 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem de desenvolvimento */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-lg">
            Página em desenvolvimento • Em breve com histórico completo,
            gráficos de confiança e recomendações acionáveis.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
