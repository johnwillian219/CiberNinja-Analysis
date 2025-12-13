// src/pages/ComparePage.jsx

import DashboardLayout from "../components/layout/DashboardLayout";
import PlatformAnalyzer from "../components/compare/PlatformAnalyzer";
import ThumbnailLab from "../components/compare/ThumbnailLab";
import TitleOptimizer from "../components/compare/TitleOptimizer";
import TagAnalyzer from "../components/compare/TagAnalyzer";
import DescriptionDoctor from "../components/compare/DescriptionDoctor";
import ContentDissector from "../components/compare/ContentDissector";
import OptimizationReport from "../components/compare/OptimizationReport";
export default function ComparePage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Cabeçalho principal */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
            Laboratório de Otimização
          </h1>
          <p className="text-gray-300 text-xl max-w-5xl mx-auto">
            A IA compara seu conteúdo com vídeos virais da mesma plataforma e
            nicho. Analisamos thumbnail, título, tags, descrição, estrutura e
            mais — para gerar recomendações precisas que maximizam CTR, retenção
            e viralidade.
          </p>
          <div className="mt-8 inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/40 rounded-full">
            <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-red-300 font-bold text-lg">
              Modo Otimização Ativo
            </span>
          </div>
        </div>

        {/* Fluxo de análise */}
        <div className="space-y-20">
          <PlatformAnalyzer />
          <ThumbnailLab />
          <TitleOptimizer />
          <TagAnalyzer />
          <DescriptionDoctor />
          <ContentDissector />
          <OptimizationReport />
        </div>
      </div>
    </DashboardLayout>
  );
}
