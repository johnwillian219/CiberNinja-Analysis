// src/components/calendar/CalendarGrid/WeekView.jsx
import { useState, useMemo } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "../context/EventsContext";
import DeleteConfirmationModal from "../../Modal/DeleteConfirmationModal";

export default function WeekView({ platform }) {
  const { getEventsForPlatform, deleteEvent } = useEvents();
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date()); // Semana dinâmica

  const platformName = platform || "Todas";
  const allEvents = getEventsForPlatform(platform);

  // Funções de navegação
  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  // Gerar dias da semana dinamicamente
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(currentWeek);
    const dayOfWeek = startOfWeek.getDay();

    // Ajustar para começar na segunda-feira
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startOfWeek.setDate(startOfWeek.getDate() + diff);

    const today = new Date();

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);

      const dateStr = date.toISOString().split("T")[0];
      const dayEvents = allEvents.filter((e) => e.date === dateStr);

      return {
        date,
        dayNumber: date.getDate(),
        month: date.toLocaleDateString("pt-BR", { month: "short" }),
        weekday: date
          .toLocaleDateString("pt-BR", { weekday: "short" })
          .toUpperCase(),
        weekdayFull: date.toLocaleDateString("pt-BR", { weekday: "long" }),
        dateStr,
        isToday: date.toDateString() === today.toDateString(),
        events: dayEvents,
        hasEvents: dayEvents.length > 0,
      };
    });
  }, [currentWeek, allEvents]);

  // Formatar título da semana
  const weekTitle = useMemo(() => {
    const startDate = weekDays[0];
    const endDate = weekDays[6];

    if (startDate.date.getMonth() === endDate.date.getMonth()) {
      // Mesma semana no mesmo mês
      return `${startDate.date.getDate()} - ${endDate.date.getDate()} ${startDate.date.toLocaleDateString(
        "pt-BR",
        { month: "long" }
      )} ${startDate.date.getFullYear()}`;
    } else {
      // Semana que cruza dois meses
      const startStr = `${startDate.date.getDate()} ${startDate.date.toLocaleDateString(
        "pt-BR",
        { month: "short" }
      )}`;
      const endStr = `${endDate.date.getDate()} ${endDate.date.toLocaleDateString(
        "pt-BR",
        { month: "short" }
      )} ${endDate.date.getFullYear()}`;
      return `${startStr} - ${endStr}`;
    }
  }, [weekDays]);

  const typeLabel = (type) =>
    ({
      video: "Vídeo",
      short: "Short",
      reel: "Reel",
      live: "Live",
      post: "Post",
    }[type] || "Conteúdo");

  // Estatísticas da semana
  const weekStats = useMemo(() => {
    const totalEvents = weekDays.reduce(
      (sum, day) => sum + day.events.length,
      0
    );
    const platforms = [
      ...new Set(weekDays.flatMap((day) => day.events.map((e) => e.platform))),
    ];

    return {
      totalEvents,
      platforms: platforms.length,
      bestTimeEvents: weekDays.flatMap((day) =>
        day.events.filter((e) => e.isBestTime)
      ).length,
    };
  }, [weekDays]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cabeçalho com navegação */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Visualização Semanal
          </h2>
          <p className="text-lg text-gray-300 mt-1">{weekTitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousWeek}
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
            onClick={goToNextWeek}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Plataforma e estatísticas */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-lg text-gray-300">
            Plataforma:{" "}
            <span className="text-white font-bold">{platformName}</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {weekStats.totalEvents} eventos nesta semana
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-800/40 rounded-lg px-3 py-2">
            <p className="text-gray-400 text-xs">Plataformas</p>
            <p className="text-white font-bold">{weekStats.platforms}</p>
          </div>
          <div className="bg-yellow-500/10 rounded-lg px-3 py-2">
            <p className="text-yellow-400 text-xs">Horários IA</p>
            <p className="text-yellow-300 font-bold">
              {weekStats.bestTimeEvents}
            </p>
          </div>
        </div>
      </div>

      {/* Grid de dias da semana */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {weekDays.map((day) => {
          // Cores para o cabeçalho do dia
          const dayHeaderColors = day.isToday
            ? "bg-gradient-to-br from-purple-600 to-purple-800 text-white"
            : "bg-gray-800/70 text-gray-300";

          return (
            <div
              key={day.dateStr}
              className={`rounded-xl border transition-all ${
                day.isToday
                  ? "border-purple-500/50 shadow-lg shadow-purple-500/20"
                  : "border-gray-700/40"
              } overflow-hidden`}
            >
              {/* Cabeçalho do dia */}
              <div className={`p-4 text-center ${dayHeaderColors}`}>
                <p className="text-xs font-bold tracking-wider">
                  {day.weekday}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <p className="text-2xl font-bold">{day.dayNumber}</p>
                  <p className="text-xs opacity-80">{day.month}</p>
                </div>
                {day.isToday && (
                  <p className="text-xs font-bold mt-1 text-white/90">HOJE</p>
                )}
              </div>

              {/* Eventos do dia */}
              <div className="p-3 bg-gray-900/50 min-h-64">
                {day.events.length > 0 ? (
                  <div className="space-y-3">
                    {day.events.map((event) => {
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
                          className={`relative p-3 rounded-lg border ${eventColor} group hover:scale-[1.02] transition-transform`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium text-sm truncate">
                                {event.title ||
                                  `${typeLabel(event.type)} - ${
                                    event.platform
                                  }`}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-gray-300 text-xs">
                                  {event.time}
                                </span>
                                <span className="text-gray-400 text-xs">•</span>
                                <span className="text-gray-300 text-xs">
                                  {event.platform}
                                </span>
                                {event.isBestTime && (
                                  <>
                                    <span className="text-gray-400 text-xs">
                                      •
                                    </span>
                                    <span className="text-yellow-400 text-xs flex items-center gap-1">
                                      <span className="text-[10px]">⭐</span>
                                      IA
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => setEventToDelete(event)}
                              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-gray-600/50 flex-shrink-0"
                              title="Remover evento"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>

                          {event.description && (
                            <p className="text-gray-300 text-xs mt-2 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mb-3">
                      <span className="text-gray-600 text-2xl">📅</span>
                    </div>
                    <p className="text-gray-600 text-sm">Nenhum agendamento</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {day.weekdayFull.toLowerCase()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo da semana */}
      <div className="mt-8 bg-gray-800/30 rounded-xl p-5 border border-gray-700/50">
        <h3 className="text-lg font-semibold text-white mb-3">
          Resumo da Semana
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weekDays.map((day) => (
            <div
              key={day.dateStr}
              className={`p-3 rounded-lg ${
                day.hasEvents
                  ? "bg-purple-500/10 border border-purple-500/20"
                  : "bg-gray-800/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    {day.weekday}
                  </p>
                  <p className="text-xs text-gray-400">
                    {day.dayNumber} {day.month}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">
                    {day.events.length}
                  </p>
                  <p className="text-gray-400 text-xs">eventos</p>
                </div>
              </div>
              {day.events.length > 0 && (
                <div className="mt-2 space-y-1">
                  {day.events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-gray-300 truncate mr-2">
                        {event.title || typeLabel(event.type)}
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {event.time}
                      </span>
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <p className="text-xs text-gray-500 mt-1">
                      +{day.events.length - 2} mais
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
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
