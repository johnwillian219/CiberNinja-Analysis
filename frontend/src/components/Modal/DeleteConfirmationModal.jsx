// src/components/Modal/DeleteConfirmationModal.jsx
import { X, Trash2 } from "lucide-react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  event,
}) {
  if (!isOpen || !event) return null;

  const typeLabel =
    {
      video: "Vídeo",
      short: "Short",
      reel: "Reel",
      live: "Live",
      post: "Post",
    }[event.type] || "Conteúdo";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 max-w-sm w-full shadow-2xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">
            Remover agendamento?
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-700/70 hover:bg-gray-600 transition-all"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        {/* Mensagem */}
        <p className="text-gray-300 text-base mb-6 leading-relaxed">
          Tem certeza que deseja remover este agendamento? Esta ação não pode
          ser desfeita.
        </p>

        {/* Preview compacto do evento */}
        <div className="bg-gray-700/60 rounded-2xl p-5 mb-8 border border-gray-600">
          <p className="text-white font-bold text-lg mb-1">
            {typeLabel} • {event.time}
          </p>
          <p className="text-gray-400 text-sm">{event.date}</p>
          {event.isBestTime && (
            <p className="text-yellow-400 text-sm font-bold mt-2">
              Melhor Horário
            </p>
          )}
        </div>

        {/* Botões compactos e alinhados */}
        <div className="flex items-stretch gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-700/70 rounded-2xl text-white font-medium hover:bg-gray-600 transition-all text-center"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl text-white font-medium hover:shadow-lg hover:shadow-red-600/40 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
