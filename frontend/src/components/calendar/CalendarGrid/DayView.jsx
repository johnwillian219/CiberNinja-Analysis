// src/components/calendar/CalendarGrid/DayView.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Sparkles,
  AlertCircle,
  Video,
  Music,
  Image,
  Radio,
} from "lucide-react";
import { useEvents } from "../context/EventsContext";
import DeleteConfirmationModal from "../../Modal/DeleteConfirmationModal";

export default function DayView({ platform, currentMonth }) {
  const navigate = useNavigate();
  const { getEventsForPlatform, deleteEvent } = useEvents();
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const platformName = platform || "Todas as Plataformas";

  // Funções de navegação
  const goToPreviousDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const goToNextDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Formatar dados da data
  const currentDateStr = selectedDate.toISOString().split("T")[0];
  const dayName = selectedDate.toLocaleDateString("pt-BR", { weekday: "long" });
  const shortDayName = selectedDate.toLocaleDateString("pt-BR", {
    weekday: "short",
  });
  const formattedDate = selectedDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const fullFormattedDate = selectedDate.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Verificar se é hoje
  const isToday = () => {
    const today = new Date();
    return selectedDate.toDateString() === today.toDateString();
  };

  // Obter eventos para o dia selecionado
  const dayEvents = getEventsForPlatform(platform).filter(
    (event) => event.date === currentDateStr
  );

  // Organizar eventos por hora
  const sortedEvents = [...dayEvents].sort((a, b) => {
    const timeA = a.time.replace(":", "");
    const timeB = b.time.replace(":", "");
    return parseInt(timeA) - parseInt(timeB);
  });

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
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      dot: "bg-red-500",
      text: "text-red-400",
    },
    TikTok: {
      bg: "bg-pink-500/10",
      border: "border-pink-500/30",
      dot: "bg-pink-500",
      text: "text-pink-400",
    },
    Instagram: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      dot: "bg-purple-500",
      text: "text-purple-400",
    },
    Facebook: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      dot: "bg-blue-500",
      text: "text-blue-400",
    },
  };

  // Estatísticas do dia
  const dayStats = {
    totalEvents: dayEvents.length,
    bestTimeEvents: dayEvents.filter((e) => e.isBestTime).length,
    platforms: [...new Set(dayEvents.map((e) => e.platform))],
  };

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Cabeçalho com navegação */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3 md:mb-4 gap-2 md:gap-3">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-base md:text-lg lg:text-xl font-bold text-white capitalize">
              <span className="md:hidden">{shortDayName}</span>
              <span className="hidden md:inline">{dayName}</span>
            </h2>
            {isToday() && (
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold">
                HOJE
              </span>
            )}
          </div>
          <p className="text-sm md:text-base text-gray-300">
            <span className="md:hidden">{formattedDate}</span>
            <span className="hidden md:inline">{fullFormattedDate}</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={goToPreviousDay}
            className="p-1.5 md:p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            aria-label="Dia anterior"
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
            onClick={goToNextDay}
            className="p-1.5 md:p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
            aria-label="Próximo dia"
          >
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Plataforma e estatísticas - Mobile otimizado */}
      <div className="mb-3 md:mb-4">
        {/* Mobile: linha única compacta */}
        <div className="md:hidden flex items-center justify-between bg-gray-800/30 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                platformColors[platform]?.dot || "bg-gray-500"
              }`}
            />
            <div>
              <p className="text-white font-medium text-xs">
                {platformName.length > 12
                  ? platformName.substring(0, 10) + "..."
                  : platformName}
              </p>
              <p className="text-gray-400 text-[10px]">
                {dayStats.totalEvents} evento
                {dayStats.totalEvents !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {dayStats.bestTimeEvents > 0 && (
              <div className="flex items-center gap-1 bg-yellow-500/10 rounded px-1.5 py-0.5">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-300 text-xs font-bold">
                  {dayStats.bestTimeEvents}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1 bg-gray-800/50 rounded px-1.5 py-0.5">
              <div className="flex items-center gap-0.5">
                {Array.from(new Set(dayEvents.map((e) => e.platform)))
                  .slice(0, 2)
                  .map((plat, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full ${
                        platformColors[plat]?.dot || "bg-gray-500"
                      }`}
                    />
                  ))}
                {Array.from(new Set(dayEvents.map((e) => e.platform))).length >
                  2 && (
                  <span className="text-[8px] text-gray-400">
                    +
                    {Array.from(new Set(dayEvents.map((e) => e.platform)))
                      .length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: layout original */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-3 mb-3">
          <div>
            <p className="text-sm md:text-base text-gray-300">
              Plataforma:{" "}
              <span className="text-white font-medium">{platformName}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {dayStats.totalEvents} evento
              {dayStats.totalEvents !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-gray-800/40 rounded-lg px-2.5 py-1.5">
              <p className="text-gray-400 text-xs">IA</p>
              <p className="text-yellow-300 font-bold text-sm">
                {dayStats.bestTimeEvents}
              </p>
            </div>
            <div className="bg-purple-500/10 rounded-lg px-2.5 py-1.5">
              <p className="text-purple-400 text-xs">Plat</p>
              <p className="text-purple-300 font-bold text-sm">
                {dayStats.platforms.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Linha do tempo do dia - apenas desktop */}
      <div className="hidden md:block bg-gray-800/30 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-white">Linha do Tempo</h3>
        </div>
        <div className="relative h-1.5 bg-gray-700/50 rounded-full">
          {sortedEvents.map((event, index) => {
            const hour = parseInt(event.time.split(":")[0]);
            const position = ((hour - 6) / 12) * 100;
            const color = platformColors[event.platform]?.dot || "bg-gray-500";

            return (
              <div
                key={event.id}
                className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${color} border border-white`}
                style={{ left: `${Math.max(0, Math.min(100, position))}%` }}
                title={`${event.time} - ${event.title || "Evento"}`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>6h</span>
          <span>12h</span>
          <span>18h</span>
        </div>
      </div>

      {/* Lista de eventos */}
      <div className="space-y-2 md:space-y-3">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => {
            const platformColor =
              platformColors[event.platform] || platformColors.YouTube;
            const Icon = typeIcons[event.type] || Video;

            return (
              <div
                key={event.id}
                className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg md:rounded-xl p-3 md:p-4 hover:border-gray-600 transition-all group"
              >
                <div className="flex items-start gap-3">
                  {/* Hora */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-lg ${platformColor.bg} border ${platformColor.border} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-white font-bold text-sm mt-1">
                      {event.time}
                    </p>
                  </div>

                  {/* Detalhes do evento */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${platformColor.bg} ${platformColor.text}`}
                      >
                        {event.platform}
                      </span>
                      {event.isBestTime && (
                        <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          IA
                        </span>
                      )}
                    </div>

                    <h4 className="text-white font-medium text-sm md:text-base mb-1 line-clamp-1">
                      {event.title || "Evento agendado"}
                    </h4>

                    {event.description && (
                      <p className="text-gray-300 text-xs mb-2 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${platformColor.dot}`}
                        />
                        <span>{event.platform}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => setEventToDelete(event)}
                      className="p-1.5 rounded hover:bg-gray-700/50 transition-colors opacity-0 group-hover:opacity-100"
                      title="Remover evento"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="text-[10px] text-gray-500">Agendado</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg md:rounded-xl p-4 md:p-6 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-500" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-300 mb-2">
              Nenhum conteúdo agendado
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {platform
                ? `Não há eventos para ${platformName} hoje.`
                : `Não há eventos agendados para hoje.`}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <button
                onClick={goToToday}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-medium transition-colors"
              >
                Ver Hoje
              </button>
              <button
                onClick={() => navigate("/scheduling")}
                className="px-3 py-2 bg-gray-700/70 hover:bg-gray-600/70 rounded-lg text-gray-300 text-sm font-medium transition-colors"
              >
                Agendar
              </button>
            </div>
          </div>
        )}
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
