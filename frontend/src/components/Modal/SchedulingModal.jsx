// src/components/Modal/SchedulingModal.jsx
import { CheckCircle, X, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function SchedulingModal({
  isOpen,
  onClose,
  scheduledData,
  onViewCalendar,
  onScheduleAnother,
}) {
  if (!isOpen) return null;

  // Formata data para exibição
  const formatDate = (dateString) => {
    if (!dateString) return "--/--/----";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700/50 rounded-xl w-full max-w-sm">
        {/* Header */}
        <div className="p-5 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Agendado com sucesso!
              </h3>
              <p className="text-gray-400 text-sm">
                Conteúdo adicionado ao calendário
              </p>
            </div>
            <button
              onClick={onClose}
              className="ml-auto p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-5">
          {/* Resumo */}
          <div className="bg-gray-800/40 rounded-lg p-4 mb-5">
            <p className="text-white font-medium line-clamp-2 mb-2">
              {scheduledData?.title || "Conteúdo agendado"}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400">Plataforma</p>
                <p className="text-white font-medium">
                  {scheduledData?.platform}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Tipo</p>
                <p className="text-white font-medium">
                  {scheduledData?.typeLabel || scheduledData?.type}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Data</p>
                <p className="text-white font-medium">
                  {formatDate(scheduledData?.date)}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Horário</p>
                <p className="text-white font-medium">
                  {scheduledData?.time || "--:--"}
                </p>
              </div>
            </div>

            {scheduledData?.isBestTime && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded text-xs">
                <span>⭐</span>
                <span>Horário otimizado pela IA</span>
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="space-y-3">
            <button
              onClick={() => {
                if (onViewCalendar) {
                  onViewCalendar();
                } else {
                  window.location.href = "/calendar";
                }
              }}
              className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              Ver no Calendário
            </button>

            <button
              onClick={() => {
                if (onScheduleAnother) {
                  onScheduleAnother();
                } else {
                  onClose();
                }
              }}
              className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors text-sm"
            >
              Agendar outro conteúdo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
