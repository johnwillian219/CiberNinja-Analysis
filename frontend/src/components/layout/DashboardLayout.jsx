// src/components/layout/DashboardLayout.jsx
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Overlay para mobile apenas */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar mobile - aparece apenas quando aberta */}
      <div
        className={`
        lg:hidden fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Área principal COM sidebar desktop escondida por padrão */}
      <div className="flex-1 w-full lg:w-[calc(100%-16rem)] lg:ml-64 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Sidebar desktop - FIXA mas fora do fluxo normal */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 z-30">
        <Sidebar />
      </div>

      {/* Navegação inferior APENAS para mobile */}
      <MobileBottomNav />
    </div>
  );
}
