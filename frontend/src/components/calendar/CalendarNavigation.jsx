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

  return (
    <div className="flex items-center justify-between mb-10">
      <button
        onClick={onPrevMonth}
        className="p-4 rounded-2xl bg-gray-700/70 hover:bg-gray-600 transition-all"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <h2 className="text-4xl font-bold text-white capitalize">
        {formattedMonth}
      </h2>

      <button
        onClick={onNextMonth}
        className="p-4 rounded-2xl bg-gray-700/70 hover:bg-gray-600 transition-all"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>
    </div>
  );
}
