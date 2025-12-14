// src/components/calendar/CalendarEvent/CalendarEventCard.jsx
import { Youtube, Music, Instagram } from "lucide-react";

const platformIcons = {
  YouTube: Youtube,
  TikTok: Music,
  Instagram: Instagram,
  Facebook: Instagram, // fallback
};

const typeLabels = {
  video: "Vídeo",
  short: "Short",
  reel: "Reel",
  live: "Live",
  post: "Post",
};

export default function CalendarEventCard({ event, variant = "compact" }) {
  const Icon = platformIcons[event.platform] || Youtube;
  const isCompact = variant === "compact";

  const statusStyles =
    event.status === "published"
      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
      : "bg-purple-500/20 border-purple-500/40 text-purple-400";

  return (
    <div
      className={`relative rounded-2xl border ${statusStyles} bg-gray-800/70 p-${
        isCompact ? "4" : "8"
      } hover:shadow-lg hover:shadow-purple-500/30 transition-all`}
    >
      {/* Cabeçalho comum */}
      <div
        className={`flex items-center gap-${isCompact ? "3" : "6"} mb-${
          isCompact ? "3" : "6"
        }`}
      >
        <div
          className={`w-${isCompact ? "12" : "20"} h-${
            isCompact ? "12" : "20"
          } rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg flex-shrink-0`}
        >
          <Icon
            className={`w-${isCompact ? "7" : "12"} h-${
              isCompact ? "7" : "12"
            } text-white`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`font-bold text-white ${
              isCompact ? "text-sm truncate" : "text-2xl"
            }`}
          >
            {isCompact ? typeLabels[event.type] || "Conteúdo" : event.title}
          </p>
          <p
            className={`text-gray-400 ${
              isCompact ? "text-xs" : "text-lg mt-2"
            }`}
          >
            {event.time} • {event.platform}
          </p>
        </div>
      </div>

      {/* Conteúdo específico por variante */}
      {!isCompact && event.description && (
        <p className="text-gray-200 text-lg leading-relaxed mb-6">
          {event.description}
        </p>
      )}

      {/* Badge de status */}
      <div
        className={`inline-block px-${isCompact ? "3" : "5"} py-${
          isCompact ? "1" : "2"
        } rounded-full text-${isCompact ? "xs" : "sm"} font-bold`}
      >
        {event.status === "published" ? "Publicado" : "Agendado"}
      </div>

      {/* Melhor horário */}
      {event.isBestTime && (
        <div className="absolute -top-3 -left-3 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-xs shadow-lg flex items-center gap-1">
          <Zap className="w-4 h-4" />
          Melhor Horário
        </div>
      )}
    </div>
  );
}
