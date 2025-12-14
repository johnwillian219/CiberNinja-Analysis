// src/components/calendar/CalendarViewSwitcher.jsx
import { Calendar, CalendarDays, CalendarRange } from "lucide-react";

const views = [
  { id: "month", label: "Mês", icon: Calendar },
  { id: "week", label: "Semana", icon: CalendarDays },
  { id: "day", label: "Dia", icon: CalendarRange },
];

export default function CalendarViewSwitcher({ activeView, onViewChange }) {
  return (
    <div className="flex items-center justify-center gap-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-4">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = activeView === view.id;

        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`flex items-center gap-4 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-2xl shadow-cyan-500/50"
                : "text-gray-400 hover:text-white hover:bg-gray-700/70"
            }`}
          >
            <Icon className="w-8 h-8" />
            {view.label}
          </button>
        );
      })}
    </div>
  );
}
