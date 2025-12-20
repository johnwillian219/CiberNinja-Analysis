// src/components/calendar/CalendarGrid/MonthView.jsx
import { useState, useMemo } from "react";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  Video,
  Music,
} from "lucide-react";
import { useEvents } from "../context/EventsContext";
import DeleteConfirmationModal from "../../Modal/DeleteConfirmationModal";

export default function MonthView({ platform, currentMonth }) {
  const { getEventsForPlatform, deleteEvent } = useEvents();
  const [eventToDelete, setEventToDelete] = useState(null);
  const [currentMonthState, setCurrentMonthState] = useState(currentMonth);
  const [selectedDay, setSelectedDay] = useState(null);

  // Sincronizar com prop currentMonth
  useMemo(() => {
    setCurrentMonthState(currentMonth);
    setSelectedDay(null); // Resetar dia selecionado ao mudar mês
  }, [currentMonth]);

  const platformName = platform || "Todas";
  const allEvents = getEventsForPlatform(platform);

  // Cálculo dinâmico do mês
  const year = currentMonthState.getFullYear();
  const month = currentMonthState.getMonth(); // 0-11

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayWeekday = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

  // Formatar nome do mês
  const monthName = currentMonthState.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  const shortMonthName = currentMonthState.toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });

  // Navegação entre meses
  const goToPreviousMonth = () => {
    setCurrentMonthState((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentMonthState((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentMonthState(new Date());
    setSelectedDay(null);
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

  // Ícones por tipo
  const typeIcons = {
    video: Video,
    short: Music,
    reel: Music,
    live: Video,
    post: Video,
  };

  // Cores por plataforma para dots
  const platformColors = {
    YouTube: "bg-red-500",
    TikTok: "bg-pink-500",
    Instagram: "bg-purple-500",
    Facebook: "bg-blue-500",
  };

  // Estatísticas do mês
  const monthStats = useMemo(() => {
    const monthEvents = allEvents.filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    return {
      totalMonthEvents: monthEvents.length,
      platforms: [...new Set(monthEvents.map((e) => e.platform))].length,
      bestTimeEvents: monthEvents.filter((e) => e.isBestTime).length,
    };
  }, [allEvents, month, year]);

  // Eventos do dia selecionado
  const selectedDayEvents = useMemo(() => {
    if (!selectedDay) return [];
    const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      selectedDay
    ).padStart(2, "0")}`;
    return allEvents.filter((e) => e.date === dayStr);
  }, [selectedDay, allEvents, year, month]);

  // Formatar data do dia selecionado
  const selectedDayFormatted = selectedDay
    ? new Date(year, month, selectedDay).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : null;

  return (
    <div className="max-w-7xl mx-auto pb-16">
      {/* Cabeçalho com navegação - Mobile otimizado */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 lg:mb-8 gap-3 md:gap-4">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center md:text-left">
            <span className="md:hidden">{shortMonthName}</span>
            <span className="hidden md:inline">{monthName}</span>
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-1">
            <span className="md:hidden">{platformName}</span>
            <span className="hidden md:inline">Plataforma: {platformName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 md:p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 md:w-5 md:h-5 text-gray-300" />
          </button>

          <button
            onClick={goToToday}
            className="px-3 py-2 md:px-4 md:py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium transition-colors whitespace-nowrap"
          >
            Hoje
          </button>

          <button
            onClick={goToNextMonth}
            className="p-2 md:p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 md:w-5 md:h-5 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Grid do calendário */}
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl md:rounded-2xl lg:rounded-3xl p-3 md:p-4 lg:p-6 xl:p-8">
        {/* Dias da semana - Mobile compacto */}
        <div className="grid grid-cols-7 gap-0.5 md:gap-2 lg:gap-3 mb-2 md:mb-4 text-center">
          {["S", "T", "Q", "Q", "S", "S", "D"].map((d, index) => (
            <p
              key={index}
              className="text-gray-400 font-medium text-xs md:text-sm py-1"
            >
              <span className="md:hidden">{d}</span>
              <span className="hidden md:inline">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][index]}
              </span>
            </p>
          ))}
        </div>

        {/* Dias do mês - Grid compacto */}
        <div className="grid grid-cols-7 gap-0.5 md:gap-2 lg:gap-3">
          {/* Dias vazios do mês anterior */}
          {Array.from({ length: adjustedFirstDay }, (_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-10 md:min-h-16 lg:min-h-24 xl:min-h-32 bg-gray-800/10 rounded-lg"
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
            const isSelected = selectedDay === day;

            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`min-h-10 md:min-h-16 lg:min-h-24 xl:min-h-32 rounded-lg p-1 md:p-2 border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-purple-500/20 border-purple-500/50"
                    : today
                    ? "bg-purple-500/10 border-purple-500/30"
                    : dayEvents.length > 0
                    ? "bg-gray-900/40 border-gray-600/50"
                    : "bg-gray-900/60 border-gray-700/30"
                } hover:border-purple-500/50 hover:bg-gray-800/70`}
              >
                {/* Número do dia com indicador de eventos */}
                <div className="flex justify-between items-start">
                  <p
                    className={`text-sm md:text-base font-bold ${
                      isSelected
                        ? "text-white"
                        : today
                        ? "text-purple-300"
                        : "text-gray-300"
                    }`}
                  >
                    {day}
                  </p>

                  {/* Indicadores compactos de eventos */}
                  {dayEvents.length > 0 && (
                    <div className="flex flex-col items-end gap-0.5">
                      <div className="flex items-center gap-0.5">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${
                              platformColors[event.platform] || "bg-gray-500"
                            }`}
                            title={`${event.platform} - ${event.time}`}
                          />
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-[8px] text-gray-400">
                            +{dayEvents.length - 2}
                          </span>
                        )}
                      </div>
                      {dayEvents.some((e) => e.isBestTime) && (
                        <Star className="w-2.5 h-2.5 text-yellow-400" />
                      )}
                    </div>
                  )}
                </div>

                {/* Eventos visíveis apenas em desktop */}
                <div className="hidden lg:block space-y-1 mt-1 max-h-16 overflow-y-auto pr-0.5">
                  {dayEvents.slice(0, 2).map((event) => {
                    const Icon = typeIcons[event.type] || Video;
                    return (
                      <div
                        key={event.id}
                        className={`relative p-1 rounded border text-[10px] ${
                          platformColors[event.platform]
                            ? `${platformColors[event.platform]}/20 border-${
                                platformColors[event.platform]
                              }/30`
                            : "bg-gray-500/20 border-gray-500/30"
                        } group`}
                      >
                        <div className="flex items-center gap-1">
                          <Icon className="w-2.5 h-2.5 text-white" />
                          <span className="text-white truncate">
                            {event.time}
                          </span>
                          {event.isBestTime && (
                            <Star className="w-2 h-2 text-yellow-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Painel de detalhes do dia selecionado (Mobile) */}
      {selectedDay && (
        <div className="md:hidden mt-4 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">
              {selectedDayFormatted}
            </h3>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          {selectedDayEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDayEvents.map((event) => {
                const Icon = typeIcons[event.type] || Video;
                const platformColor =
                  platformColors[event.platform] || "bg-gray-500";
                return (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border ${
                      platformColor
                        ? `${platformColor}/20 border-${platformColor}/30`
                        : "bg-gray-500/20"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-white" />
                        <span className="text-white font-medium">
                          {event.title || typeLabel(event.type)}
                        </span>
                      </div>
                      <button
                        onClick={() => setEventToDelete(event)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 text-gray-300">
                        <span>{event.time}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${platformColor} text-white`}
                        >
                          {event.platform}
                        </span>
                      </div>
                      {event.isBestTime && (
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-3 h-3" />
                          <span className="text-xs">IA</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-400">Nenhum evento agendado</p>
            </div>
          )}
        </div>
      )}

      {/* Estatísticas - Mobile em linha */}
      <div className="mt-4 md:mt-6 lg:mt-8">
        <div className="md:hidden flex justify-between items-center mb-2">
          <div className="text-sm text-gray-400">Resumo do mês</div>
          <div className="text-xs text-gray-500">
            {monthStats.totalMonthEvents} eventos
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-3 lg:gap-4">
          <div className="bg-gray-800/40 rounded-lg md:rounded-xl p-3 md:p-4">
            <p className="text-gray-400 text-xs md:text-sm">Eventos</p>
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-white">
              {monthStats.totalMonthEvents}
            </p>
          </div>
          <div className="bg-gray-800/40 rounded-lg md:rounded-xl p-3 md:p-4">
            <p className="text-gray-400 text-xs md:text-sm">Plataformas</p>
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-white">
              {monthStats.platforms}
            </p>
          </div>
          <div className="bg-gray-800/40 rounded-lg md:rounded-xl p-3 md:p-4">
            <p className="text-gray-400 text-xs md:text-sm">Horários IA</p>
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-yellow-300">
              {monthStats.bestTimeEvents}
            </p>
          </div>
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
