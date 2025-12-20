// src/pages/ComparePage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import PlatformAnalyzer from "../components/wizard/PlatformAnalyzer";
import OptimizationWizard from "../components/wizard/OptimizationWizard";

export default function ComparePage() {
  return (
    <DashboardLayout>
      <div className="pb-16 min-h-screen bg-gradient-to-br  sm:p-6">
        {/* Cabeçalho compacto */}
        <div className="text-center mb-8 sm:mb-10 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-3">
            Laboratório de Otimização
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Analise e otimize seu conteúdo com IA.
          </p>
        </div>

        {/* Seção 1: Seleção de plataforma e nicho */}
        <div className="mb-8 sm:mb-12 max-w-4xl mx-auto">
          <PlatformAnalyzer />
        </div>

        {/* Seção 2: Fluxo guiado de otimização */}
        <div className="max-w-4xl mx-auto">
          <OptimizationWizard />
        </div>
      </div>
    </DashboardLayout>
  );
}
