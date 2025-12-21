// src/pages/settings/SettingsNotifications.jsx
import { Bell } from "lucide-react";

export default function SettingsNotifications() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl md:rounded-2xl p-4 md:p-8">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
        <Bell className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
        Preferências de Notificação
      </h3>
      <div className="space-y-4 md:space-y-6">
        {[
          {
            label: "Notificações por e-mail",
            desc: "Receba atualizações importantes por e-mail",
          },
          {
            label: "Novos insights da IA",
            desc: "Alertas sobre novas análises disponíveis",
          },
          {
            label: "Alertas críticos de desempenho",
            desc: "Notificações sobre problemas críticos",
          },
          {
            label: "Alertas de segurança",
            desc: "Notificações sobre atividades suspeitas",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 md:p-4 bg-gray-700/30 rounded-lg md:rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all"
          >
            <div className="flex-1 min-w-0 mr-3">
              <p className="text-white font-medium text-sm md:text-base truncate">
                {item.label}
              </p>
              <p className="text-gray-400 text-xs md:text-sm truncate">
                {item.desc}
              </p>
            </div>
            <button className="relative w-12 h-7 md:w-14 md:h-8 rounded-full transition-all duration-300 flex-shrink-0 bg-emerald-500 hover:bg-emerald-600">
              <div className="absolute top-1 left-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full transition-all duration-300 translate-x-5 md:translate-x-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
