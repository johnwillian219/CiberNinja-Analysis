// src/pages/settings/SettingsSidebar.jsx
import { User, Bell, Shield, AlertTriangle } from "lucide-react";

const sections = [
  { id: "general", label: "Geral", icon: User },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "security", label: "Segurança", icon: Shield },
  { id: "danger", label: "Zona de Risco", icon: AlertTriangle },
];

export default function SettingsSidebar({
  activeSection,
  setActiveSection,
  showMobileMenu,
  setShowMobileMenu,
  user,
}) {
  return (
    <div
      className={`lg:col-span-1 ${
        showMobileMenu ? "block" : "hidden lg:block"
      }`}
    >
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl md:rounded-2xl p-4 md:p-6 sticky top-6">
        <h3 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6">
          Configurações
        </h3>
        <nav className="space-y-1 md:space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl text-left transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/50 text-cyan-400"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/30"
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">
                  {section.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-700/50">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="min-w-0">
              <p className="text-white font-medium text-sm md:text-base truncate">
                {user.fullName || user.displayName || "Ciber Ninja"}
              </p>
              <p className="text-gray-400 text-xs md:text-sm truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
