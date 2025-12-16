// src/components/Modal/ResetConfirmationModal.jsx
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function ResetConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Resetar alterações?",
  message = "Todas as alterações não salvas serão perdidas. Esta ação não pode ser desfeita.",
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 max-w-md w-full shadow-modal animate-slide-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ícone de alerta */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-amber-500/20 border border-amber-500/30 rounded-2xl">
              <AlertTriangle className="w-12 h-12 text-amber-400" />
            </div>
          </div>

          {/* Título */}
          <h3 className="text-2xl font-bold text-white text-center mb-3">
            {title}
          </h3>

          {/* Mensagem */}
          <p className="text-gray-300 text-center mb-8">{message}</p>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 border border-gray-600 rounded-2xl text-gray-300 font-medium hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-300"
            >
              Cancelar
            </button>

            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl text-white font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <RotateCcw className="w-5 h-5" />
              Resetar
            </button>
          </div>

          {/* Aviso */}
          <p className="text-gray-500 text-sm text-center mt-6">
            Esta ação irá restaurar os valores originais do perfil
          </p>
        </div>
      </div>
    </>
  );
}
