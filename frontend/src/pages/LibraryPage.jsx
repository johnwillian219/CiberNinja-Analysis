// src/pages/LibraryPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";

import LibraryHeader from "../components/library/LibraryHeader";
import LibraryStats from "../components/library/LibraryStats";
import LibraryContent from "../components/library/contentGrid/LibraryContent";

export default function LibraryPage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 min-h-screen">
        {/* Cabeçalho */}
        <LibraryHeader />

        {/* Estatísticas */}
        <LibraryStats />

        {/* Conteúdo principal: filtros + grid + estados */}
        <LibraryContent />
      </div>
    </DashboardLayout>
  );
}
