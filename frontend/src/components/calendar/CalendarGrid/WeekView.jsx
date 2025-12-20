// src/components/calendar/CalendarGrid/WeekView.jsx
import { useState, useMemo } from "react";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  Video,
  Music,
  Image,
  Radio,
} from "lucide-react";
import { useEvents } from "../context/EventsContext";
import DeleteConfirmationModal from "../../Modal/DeleteConfirmationModal";

export default function WeekView({ platform, currentMonth }) {
  const { getEventsForPlatform, deleteEvent } = useEvents();
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

  const platformName = platform || "Todas";
  const allEvents = getEventsForPlatform(platform);

  // Funções de navegação
  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
    setSelectedDay(null);
  };

  const goToNextWeek = () => {
    setCurrentWeek((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
    setSelectedDay(null);
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
      return `${startDate.date.getDate()} - ${endDate.date.getDate()} ${startDate.date.toLocaleDateString(
        "pt-BR",
        { month: "short" }
      )}`;
    } else {
      const startStr = `${startDate.date.getDate()} ${startDate.date.toLocaleDateString(
        "pt-BR",
        { month: "short" }
      )}`;
      const endStr = `${endDate.date.getDate()} ${endDate.date.toLocaleDateString(
        "pt-BR",
        { month: "short" }
      )}`;
      return `${startStr} - ${endStr}`;
    }
  }, [weekDays]);

  // Ícones por tipo
  const typeIcons = {
    video: Video,
    short: Music,
    reel: Image,
    live: Radio,
    post: Image,
  };

  // Cores por plataforma
  const platformColors = {
    YouTube: {
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      dot: "bg-red-500",
    },
    TikTok: {
      bg: "bg-pink-500/20",
      border: "border-pink-500/30",
      dot: "bg-pink-500",
    },
    Instagram: {
      bg: "bg-purple-500/20",
      border: "border-purple-500/30",
      dot: "bg-purple-500",
    },
    Facebook: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
      dot: "bg-blue-500",
    },
  };

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

  // Eventos do dia selecionado
  const selectedDayEvents = selectedDay
    ? weekDays.find((d) => d.dateStr === selectedDay)?.events || []
    : [];

  return (
    <div className="max-w-7xl mx-auto pb-16">
      {/* Cabeçalho com navegação */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-3 md:mb-4 gap-2 md:gap-3">
        <div className="text-center md:text-left">
          <h2 className="text-base md:text-lg font-bold text-white">
            Semana: {weekTitle}
          </h2>
          <p className="text-xs md:text-sm text-gray-300 mt-0.5">
            Plataforma:{" "}
            <span className="text-white font-medium">{platformName}</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={goToPreviousWeek}
            className="p-1.5 md:p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="w-4 h-4 text-gray-300" />
          </button>

          <button
            onClick={goToToday}
            className="px-2.5 py-1.5 md:px-3 md:py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
          >
            Hoje
          </button>

          <button
            onClick={goToNextWeek}
            className="p-1.5 md:p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            aria-label="Próxima semana"
          >
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-2">
        <div className="bg-gray-800/40 rounded-lg px-2.5 py-1.5">
          <p className="text-gray-400 text-xs">
            Eventos:{" "}
            <span className="text-white font-bold text-sm">
              {weekStats.totalEvents}
            </span>
          </p>
        </div>
        <div className="bg-yellow-500/10 rounded-lg px-2.5 py-1.5">
          <p className="text-yellow-400 text-xs">
            IA:{" "}
            <span className="text-yellow-300 font-bold text-sm">
              {weekStats.bestTimeEvents}
            </span>
          </p>
        </div>
      </div>

      {/* Grid de dias da semana - Mobile: scroll horizontal */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide -mx-1 px-1">
          {weekDays.map((day) => {
            const dayPlatformColors = day.events.reduce((acc, event) => {
              const color =
                platformColors[event.platform]?.dot || "bg-gray-500";
              if (!acc.includes(color)) acc.push(color);
              return acc;
            }, []);

            return (
              <div
                key={day.dateStr}
                onClick={() => setSelectedDay(day.dateStr)}
                className={`flex-shrink-0 w-20 rounded-lg border transition-all ${
                  selectedDay === day.dateStr
                    ? "border-purple-500 bg-purple-500/10"
                    : day.isToday
                    ? "border-purple-500/50 bg-purple-500/5"
                    : "border-gray-700/40 bg-gray-900/50"
                } ${
                  day.hasEvents
                    ? "cursor-pointer hover:border-purple-500/30"
                    : ""
                }`}
              >
                {/* Cabeçalho do dia */}
                <div
                  className={`p-2 text-center ${
                    day.isToday ? "bg-purple-500/20" : "bg-gray-800/70"
                  }`}
                >
                  <p className="text-xs font-bold tracking-wider text-gray-300">
                    {day.weekday}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-0.5">
                    <p className="text-lg font-bold text-white">
                      {day.dayNumber}
                    </p>
                    <p className="text-xs text-gray-400">{day.month}</p>
                  </div>
                  {day.isToday && (
                    <p className="text-xs font-bold mt-0.5 text-purple-300">
                      HOJE
                    </p>
                  )}
                </div>

                {/* Indicadores de eventos */}
                <div className="p-2 min-h-16 flex flex-col items-center justify-center">
                  {day.events.length > 0 ? (
                    <>
                      <div className="flex flex-wrap justify-center gap-1 mb-1">
                        {dayPlatformColors.slice(0, 3).map((color, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${color}`}
                          />
                        ))}
                        {dayPlatformColors.length > 3 && (
                          <span className="text-[8px] text-gray-500">
                            +{dayPlatformColors.length - 3}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-300">
                        {day.events.length} evento
                        {day.events.length !== 1 ? "s" : ""}
                      </p>
                      {day.events.some((e) => e.isBestTime) && (
                        <Star className="w-3 h-3 text-yellow-400 mt-1" />
                      )}
                    </>
                  ) : (
                    <p className="text-gray-600 text-xs">Nenhum</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Painel de detalhes do dia selecionado (Mobile) */}
        {selectedDay && (
          <div className="mt-3 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-white">
                {weekDays.find((d) => d.dateStr === selectedDay)?.weekdayFull},{" "}
                {weekDays.find((d) => d.dateStr === selectedDay)?.dayNumber}{" "}
                {weekDays.find((d) => d.dateStr === selectedDay)?.month}
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ×
              </button>
            </div>

            {selectedDayEvents.length > 0 ? (
              <div className="space-y-2">
                {selectedDayEvents.map((event) => {
                  const Icon = typeIcons[event.type] || Video;
                  const platformColor = platformColors[event.platform] || {
                    bg: "bg-gray-500/20",
                    border: "border-gray-500/30",
                    dot: "bg-gray-500",
                  };

                  return (
                    <div
                      key={event.id}
                      className={`p-2.5 rounded-lg border ${platformColor.bg} ${platformColor.border}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-medium">
                            {event.title || "Evento"}
                          </span>
                        </div>
                        <button
                          onClick={() => setEventToDelete(event)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-300">
                          <span>{event.time}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] ${platformColor.dot.replace(
                              "bg-",
                              "bg-"
                            )} text-white`}
                          >
                            {event.platform.substring(0, 2)}
                          </span>
                        </div>
                        {event.isBestTime && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-3 h-3" />
                            <span className="text-[10px]">IA</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-400 text-sm">Nenhum evento agendado</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop: Grid completo */}
      <div className="hidden lg:grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
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
              <div className={`p-3 text-center ${dayHeaderColors}`}>
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
              <div className="p-2 bg-gray-900/50 min-h-48">
                {day.events.length > 0 ? (
                  <div className="space-y-2">
                    {day.events.map((event) => {
                      const Icon = typeIcons[event.type] || Video;
                      const platformColor = platformColors[event.platform] || {
                        bg: "bg-gray-500/20",
                        border: "border-gray-500/30",
                      };

                      return (
                        <div
                          key={event.id}
                          className={`relative p-2 rounded-lg border ${platformColor.bg} ${platformColor.border} group hover:scale-[1.02] transition-transform`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                                <p className="text-white font-medium text-xs truncate">
                                  {event.title || "Evento"}
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5 mt-1">
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
                                    <span className="text-yellow-400 text-xs flex items-center gap-0.5">
                                      <Star className="w-3 h-3" />
                                      IA
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            <button
                              onClick={() => setEventToDelete(event)}
                              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-600/50 flex-shrink-0"
                              title="Remover evento"
                            >
                              <MoreVertical className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          </div>

                          {event.description && (
                            <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center mb-2">
                      <span className="text-gray-600 text-xl">📅</span>
                    </div>
                    <p className="text-gray-600 text-sm">Nenhum agendamento</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo da semana (apenas desktop) */}
      <div className="hidden lg:block mt-4 bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
        <h3 className="text-base font-semibold text-white mb-3">
          Resumo da Semana: {weekStats.totalEvents} eventos
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <div
              key={day.dateStr}
              className={`p-2 rounded-lg ${
                day.hasEvents
                  ? "bg-purple-500/10 border border-purple-500/20"
                  : "bg-gray-800/50"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <div>
                  <p className="text-xs font-medium text-gray-300">
                    {day.weekday}
                  </p>
                  <p className="text-xs text-gray-400">
                    {day.dayNumber} {day.month}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{day.events.length}</p>
                  <p className="text-gray-400 text-xs">eventos</p>
                </div>
              </div>
              {day.events.length > 0 && (
                <div className="space-y-1">
                  {day.events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xs text-gray-300 truncate">
                        {event.time}
                      </span>
                      <span className="text-xs text-gray-400">
                        {event.platform.substring(0, 2)}
                      </span>
                    </div>
                  ))}
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
            setSelectedDay(null);
          }
        }}
        event={eventToDelete}
      />
    </div>
  );
}
