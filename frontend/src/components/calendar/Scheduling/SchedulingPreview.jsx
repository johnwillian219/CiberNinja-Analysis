// src/components/calendar/Scheduling/SchedulingPreview.jsx
import {
  Youtube,
  Music,
  Instagram,
  Facebook,
  Calendar,
  Clock,
  Sparkles,
} from "lucide-react";

const platformIcons = {
  YouTube: Youtube,
  TikTok: Music,
  Instagram: Instagram,
  Facebook: Facebook,
};

const platformColors = {
  YouTube: "from-red-500 to-pink-500",
  TikTok: "from-pink-500 to-black",
  Instagram: "from-purple-500 to-orange-500",
  Facebook: "from-blue-500 to-cyan-500",
};

export default function SchedulingPreview({ formData }) {
  // Dados padrão para preview vazio
  const defaultData = {
    platform: "YouTube",
    type: "Vídeo",
    title: "",
    description: "",
    date: "",
    time: "",
    isBestTime: false,
  };

  // Mescla dados
  const data = {
    ...defaultData,
    ...formData,
  };

  const Icon = platformIcons[data.platform] || Youtube;
  const platformColor =
    platformColors[data.platform] || "from-purple-500 to-pink-500";

  // Verifica se o form está vazio
  const isFormEmpty = !data.title && !data.date && !data.time;

  // Formata data
  const formatDate = (dateString) => {
    if (!dateString) return "dd/mm/aaaa";
    return dateString.split("-").reverse().join("/");
  };

  // Formata hora
  const formatTime = (timeString) => {
    if (!timeString) return "--:--";
    return timeString;
  };

  if (isFormEmpty) {
    return (
      <div className="bg-gray-900/50 rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[300px] border border-dashed border-gray-600">
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6 text-gray-500" />
        </div>
        <h4 className="text-base font-medium text-gray-300 mb-2">
          Formulário vazio
        </h4>
        <p className="text-gray-500 text-sm max-w-xs">
          Preencha o formulário para visualizar a prévia aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-600">
      {/* Cabeçalho */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platformColor} flex items-center justify-center shadow-lg flex-shrink-0`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-medium">
              {data.type}
            </span>
            <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-medium">
              {data.platform}
            </span>
          </div>

          <p className="text-base font-semibold text-white line-clamp-2 mb-2">
            {data.title || "Sem título"}
          </p>

          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(data.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatTime(data.time)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Descrição */}
      {data.description && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </div>
      )}

      {/* Status */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
            data.isBestTime
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          {data.isBestTime && <Sparkles className="w-3 h-3" />}
          {data.isBestTime ? "Melhor horário (IA)" : "Agendamento padrão"}
        </div>
      </div>
    </div>
  );
}
