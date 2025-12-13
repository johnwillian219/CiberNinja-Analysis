// src/pages/ComparePage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";

import PlatformAnalyzer from "../components/wizard/PlatformAnalyzer";
import OptimizationWizard from "../components/wizard/OptimizationWizard";

export default function ComparePage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Cabeçalho geral */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-6">
            Laboratório de Otimização
          </h1>
          <p className="text-gray-300 text-xl max-w-5xl mx-auto">
            Analise e otimize seu conteúdo com IA avançada. Selecione a
            plataforma e comece o fluxo guiado.
          </p>
        </div>

        {/* Seção 1: Seleção de plataforma e nicho */}
        <div className="mb-20">
          <PlatformAnalyzer />
        </div>

        {/* Seção 2: Fluxo guiado de otimização */}
        <div>
          <OptimizationWizard />
        </div>
      </div>
    </DashboardLayout>
  );
}
