// src/components/layout/DashboardLayout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar fixa à esquerda */}
      <Sidebar />

      {/* Área principal (Header + Conteúdo) */}
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
