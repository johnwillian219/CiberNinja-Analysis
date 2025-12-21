// src/pages/SettingsPage.jsx
import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SettingsSidebar from "./settings/SettingsSidebar";
import SettingsGeneral from "./settings/SettingsGeneral";
import SettingsNotifications from "./settings/SettingsNotifications";
import SettingsSecurity from "./settings/SettingsSecurity";
import SettingsDanger from "./settings/SettingsDanger";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown } from "lucide-react";

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState("general");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (authLoading || !user) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-white text-2xl font-medium">
              Carregando configurações...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br p-3 pb-16 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-8 md:mb-12 text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2 md:mb-4 animate-gradient">
              Configurações
            </h1>
            <p className="text-gray-400 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto px-2 md:px-0">
              Gerencie sua conta e preferências
            </p>
          </div>

          {/* Botão mobile */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden w-full mb-4 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl p-3 flex items-center justify-between text-white hover:border-cyan-500/50 transition-all"
          >
            <span className="font-medium">
              Seção:{" "}
              {activeSection === "general"
                ? "Geral"
                : activeSection === "notifications"
                ? "Notificações"
                : activeSection === "security"
                ? "Segurança"
                : "Zona de Risco"}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                showMobileMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Sidebar */}
            <SettingsSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
              user={user}
            />

            {/* Conteúdo */}
            <div className="lg:col-span-3">
              {activeSection === "general" && <SettingsGeneral user={user} />}
              {activeSection === "notifications" && <SettingsNotifications />}
              {activeSection === "security" && <SettingsSecurity />}
              {activeSection === "danger" && <SettingsDanger />}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
