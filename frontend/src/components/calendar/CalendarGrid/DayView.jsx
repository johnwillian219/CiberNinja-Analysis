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
} from "lucide-react";
import { useEvents } from "../context/EventsContext";
import DeleteConfirmationModal from "../../Modal/DeleteConfirmationModal";

export default function DayView({ platform }) {
  const navigate = useNavigate();
  const { getEventsForPlatform, deleteEvent, getEventsForDate } = useEvents();
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data selecionada dinâmica

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
  const formattedDate = selectedDate.toLocaleDateString("pt-BR", {
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

  const typeLabel = (type) =>
    ({
      video: "Vídeo",
      short: "Short",
      reel: "Reel",
      live: "Live",
      post: "Post",
    }[type] || "Conteúdo");

  // Cores por plataforma
  const platformColors = {
    YouTube: {
      bg: "from-red-500 to-pink-500",
      text: "text-red-400",
      badge: "bg-red-500/20 text-red-400",
    },
    TikTok: {
      bg: "from-pink-500 to-purple-500",
      text: "text-pink-400",
      badge: "bg-pink-500/20 text-pink-400",
    },
    Instagram: {
      bg: "from-purple-500 to-pink-500",
      text: "text-purple-400",
      badge: "bg-purple-500/20 text-purple-400",
    },
    Facebook: {
      bg: "from-blue-500 to-cyan-500",
      text: "text-blue-400",
      badge: "bg-blue-500/20 text-blue-400",
    },
  };

  // Estatísticas do dia
  const dayStats = {
    totalEvents: dayEvents.length,
    bestTimeEvents: dayEvents.filter((e) => e.isBestTime).length,
    platforms: [...new Set(dayEvents.map((e) => e.platform))],
    liveEvents: dayEvents.filter((e) => e.type === "live").length,
    videoEvents: dayEvents.filter((e) => e.type === "video").length,
    shortEvents: dayEvents.filter(
      (e) => e.type === "short" || e.type === "reel"
    ).length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Cabeçalho com navegação */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-white capitalize">
              {dayName}
            </h2>
            {isToday() && (
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-bold">
                HOJE
              </span>
            )}
          </div>
          <p className="text-xl text-gray-300">{formattedDate}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousDay}
            className="p-3 rounded-xl hover:bg-gray-700/50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-300" />
          </button>

          <button
            onClick={goToToday}
            className="px-5 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
          >
            Hoje
          </button>

          <button
            onClick={goToNextDay}
            className="p-3 rounded-xl hover:bg-gray-700/50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Plataforma e estatísticas */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <p className="text-lg text-gray-300">
              Plataforma:{" "}
              <span className="text-white font-bold">{platformName}</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {dayStats.totalEvents} eventos para este dia
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-gray-800/40 rounded-xl px-4 py-3 min-w-[120px]">
              <p className="text-gray-400 text-xs">Total</p>
              <p className="text-2xl font-bold text-white">
                {dayStats.totalEvents}
              </p>
            </div>
            <div className="bg-yellow-500/10 rounded-xl px-4 py-3 min-w-[120px]">
              <p className="text-yellow-400 text-xs">Horários IA</p>
              <p className="text-2xl font-bold text-yellow-300">
                {dayStats.bestTimeEvents}
              </p>
            </div>
            <div className="bg-purple-500/10 rounded-xl px-4 py-3 min-w-[120px]">
              <p className="text-purple-400 text-xs">Plataformas</p>
              <p className="text-2xl font-bold text-purple-300">
                {dayStats.platforms.length}
              </p>
            </div>
          </div>
        </div>

        {/* Linha do tempo do dia */}
        <div className="bg-gray-800/30 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-white">
              Linha do Tempo do Dia
            </h3>
          </div>
          <div className="relative h-2 bg-gray-700/50 rounded-full">
            {sortedEvents.map((event, index) => {
              const hour = parseInt(event.time.split(":")[0]);
              const position = ((hour - 6) / 12) * 100; // Das 6h às 18h
              return (
                <div
                  key={event.id}
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full ${platformColors[
                    event.platform
                  ]?.bg
                    .split(" ")[0]
                    .replace("from-", "bg-")} border-2 border-white`}
                  style={{ left: `${Math.max(0, Math.min(100, position))}%` }}
                  title={`${event.time} - ${event.title}`}
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
      </div>

      {/* Lista de eventos */}
      <div className="space-y-6">
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event) => {
            const platformColor =
              platformColors[event.platform] || platformColors.YouTube;

            return (
              <div
                key={event.id}
                className="relative bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 transition-all group"
              >
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  {/* Hora e ícone da plataforma */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-center">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${platformColor.bg} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        {event.time}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">horário</p>
                    </div>
                  </div>

                  {/* Detalhes do evento */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-bold ${platformColor.badge}`}
                      >
                        {event.platform}
                      </span>
                      <span className="px-3 py-1.5 bg-gray-700/50 rounded-full text-sm font-medium text-gray-300">
                        {typeLabel(event.type)}
                      </span>
                      {event.isBestTime && (
                        <span className="px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Melhor Horário
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {event.title ||
                        `${typeLabel(event.type)} - ${event.platform}`}
                    </h4>

                    {event.description && (
                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${platformColor.bg
                            .split(" ")[0]
                            .replace("from-", "bg-")}`}
                        ></span>
                        <span>{event.platform}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botão de ação */}
                  <div className="flex lg:flex-col items-center gap-3">
                    <button
                      onClick={() => setEventToDelete(event)}
                      className="p-2.5 rounded-lg bg-gray-700/50 hover:bg-gray-600/70 transition-colors opacity-0 lg:opacity-100 group-hover:opacity-100"
                      title="Remover evento"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400">
                      Agendado
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-700/50 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">
              Nenhum conteúdo agendado
            </h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
              {platform
                ? `Não há eventos agendados para ${platformName} em ${formattedDate}.`
                : `Não há eventos agendados para ${formattedDate}.`}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={goToToday}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-medium transition-colors"
              >
                Voltar para Hoje
              </button>
              <button
                onClick={() => navigate("/scheduling")}
                className="px-6 py-3 bg-gray-700/70 hover:bg-gray-600/70 rounded-xl text-gray-300 font-medium transition-colors"
              >
                Agendar Conteúdo
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
