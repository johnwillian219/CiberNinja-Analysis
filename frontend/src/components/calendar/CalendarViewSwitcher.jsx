// src/components/calendar/CalendarViewSwitcher.jsx
import { Calendar, CalendarDays, CalendarRange } from "lucide-react";

const views = [
  { id: "month", label: "Mês", icon: Calendar, shortLabel: "Mês" },
  { id: "week", label: "Semana", icon: CalendarDays, shortLabel: "Semana" },
  { id: "day", label: "Dia", icon: CalendarRange, shortLabel: "Dia" },
];

export default function CalendarViewSwitcher({ activeView, onViewChange }) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 lg:gap-3 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg md:rounded-xl lg:rounded-2xl p-1.5 md:p-2 lg:p-2.5">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = activeView === view.id;

        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`flex items-center justify-center gap-1 md:gap-1.5 px-2.5 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg font-medium text-xs md:text-sm lg:text-base transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-md md:shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-gray-700/70"
            }`}
          >
            <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="hidden xs:inline">{view.label}</span>
            <span className="xs:hidden">{view.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
