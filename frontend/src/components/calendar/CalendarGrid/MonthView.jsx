// src/components/calendar/CalendarGrid/MonthView.jsx
import { useState, useMemo } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "../context/EventsContext";
import DeleteConfirmationModal from "../../Modal/DeleteConfirmationModal";

export default function MonthView({ platform }) {
  const { getEventsForPlatform, deleteEvent } = useEvents();
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // Data dinâmica

  const platformName = platform || "Todas";
  const allEvents = getEventsForPlatform(platform);

  // Cálculo dinâmico do mês
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-11

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayWeekday = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

  // Formatar nome do mês
  const monthName = currentMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  // Navegação entre meses
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  // Verificar se é hoje
  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const typeLabel = (type) =>
    ({
      video: "Vídeo",
      short: "Short",
      reel: "Reel",
      live: "Live",
      post: "Post",
    }[type] || "Conteúdo");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cabeçalho com navegação */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">
          {monthName}
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>

          <button
            onClick={goToToday}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            Hoje
          </button>

          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      <p className="text-center text-lg text-gray-300 mb-8">
        Plataforma: <span className="text-white font-bold">{platformName}</span>
        <span className="ml-4 text-sm text-gray-400">
          {allEvents.length} eventos agendados
        </span>
      </p>

      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 md:p-8">
        {/* Dias da semana */}
        <div className="grid grid-cols-7 gap-3 mb-4 text-center">
          {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
            <p key={d} className="text-gray-400 font-medium text-sm py-2">
              {d}
            </p>
          ))}
        </div>

        {/* Dias do mês */}
        <div className="grid grid-cols-7 gap-3">
          {/* Dias vazios do mês anterior */}
          {Array.from({ length: adjustedFirstDay }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-32 bg-gray-800/20 rounded-xl"
            />
          ))}

          {/* Dias do mês atual */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dayStr = `${year}-${String(month + 1).padStart(
              2,
              "0"
            )}-${String(day).padStart(2, "0")}`;
            const dayEvents = allEvents.filter((e) => e.date === dayStr);
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`min-h-32 rounded-xl p-3 border transition-all ${
                  today
                    ? "bg-purple-500/10 border-purple-500/30"
                    : "bg-gray-900/60 border-gray-700/30 hover:border-gray-600"
                }`}
              >
                {/* Número do dia */}
                <div className="flex justify-between items-center mb-2">
                  <p
                    className={`text-sm font-bold ${
                      today
                        ? "text-purple-400"
                        : dayEvents.length > 0
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {day}
                    {today && <span className="ml-1 text-xs">(hoje)</span>}
                  </p>

                  {dayEvents.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  )}
                </div>

                {/* Eventos do dia */}
                <div className="space-y-2 max-h-28 overflow-y-auto pr-1">
                  {dayEvents.map((event) => {
                    // Cores por plataforma
                    const platformColors = {
                      YouTube: "bg-red-500/20 border-red-500/30",
                      TikTok: "bg-pink-500/20 border-pink-500/30",
                      Instagram: "bg-purple-500/20 border-purple-500/30",
                      Facebook: "bg-blue-500/20 border-blue-500/30",
                    };

                    const eventColor =
                      platformColors[event.platform] ||
                      "bg-gray-500/20 border-gray-500/30";

                    return (
                      <div
                        key={event.id}
                        className={`relative p-2 rounded-lg border text-xs ${eventColor} group`}
                      >
                        <div>
                          <p className="text-white font-medium truncate">
                            {event.title ||
                              `${typeLabel(event.type)} - ${event.platform}`}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-300 text-[10px]">
                              {event.time} • {event.platform}
                            </span>
                            {event.isBestTime && (
                              <span className="text-yellow-400 text-[10px]">
                                ⭐
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => setEventToDelete(event)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-600/50"
                          title="Remover evento"
                        >
                          <MoreVertical className="w-3 h-3 text-gray-400" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/40 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total de Eventos</p>
          <p className="text-2xl font-bold text-white">{allEvents.length}</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Eventos no Mês</p>
          <p className="text-2xl font-bold text-white">
            {
              allEvents.filter((e) => {
                const eventDate = new Date(e.date);
                return (
                  eventDate.getMonth() === month &&
                  eventDate.getFullYear() === year
                );
              }).length
            }
          </p>
        </div>
        <div className="bg-gray-800/40 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Plataformas Ativas</p>
          <p className="text-2xl font-bold text-white">
            {[...new Set(allEvents.map((e) => e.platform))].length}
          </p>
        </div>
      </div>

      {/* Modal de confirmação */}
      <DeleteConfirmationModal
        isOpen={!!eventToDelete}
        onClose={() => setEventToDelete(null)}
        onConfirm={() => {
          if (eventToDelete) {
            deleteEvent(eventToDelete.id);
            setEventToDelete(null);
          }
        }}
        event={eventToDelete}
      />
    </div>
  );
}
