// src/components/calendar/CalendarNavigation.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function CalendarNavigation({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}) {
  const formattedMonth = format(currentMonth, "MMMM yyyy", { locale: ptBR });
  const shortMonth = format(currentMonth, "MMM yyyy", { locale: ptBR });

  return (
    <div className="flex items-center justify-between mb-4 md:mb-5 lg:mb-6">
      <button
        onClick={onPrevMonth}
        className="p-1.5 md:p-2 lg:p-2.5 rounded-md md:rounded-lg bg-gray-700/60 hover:bg-gray-600/80 transition-all hover:scale-105 active:scale-95"
        aria-label="Mês anterior"
      >
        <ChevronLeft className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
      </button>

      <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white capitalize text-center px-2 md:px-4">
        <span className="hidden md:inline">{formattedMonth}</span>
        <span className="md:hidden">{shortMonth}</span>
      </h2>

      <button
        onClick={onNextMonth}
        className="p-1.5 md:p-2 lg:p-2.5 rounded-md md:rounded-lg bg-gray-700/60 hover:bg-gray-600/80 transition-all hover:scale-105 active:scale-95"
        aria-label="Próximo mês"
      >
        <ChevronRight className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
      </button>
    </div>
  );
}
