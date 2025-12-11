// src/components/modals/ConfirmationModal.jsx
import { X, CheckCircle, AlertTriangle } from "lucide-react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  type = "info", // success, danger, info
}) {
  if (!isOpen) return null;

  const styles = {
    success: "border-emerald-500/50 text-emerald-400",
    danger: "border-red-500/50 text-red-400",
    info: "border-cyan-500/50 text-cyan-400",
  };

  const icon = {
    success: <CheckCircle className="w-12 h-12 text-emerald-400" />,
    danger: <AlertTriangle className="w-12 h-12 text-red-400" />,
    info: <CheckCircle className="w-12 h-12 text-cyan-400" />,
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        className={`bg-gray-800 border ${styles[type]} rounded-2xl p-8 max-w-md w-full shadow-2xl`}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            {icon[type]}
            <h2 className="text-2xl font-bold text-white">{title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-300 mb-8">{message}</p>
        <div className="flex justify-end gap-4">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                type === "danger"
                  ? "bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30"
                  : "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30"
              }`}
            >
              {confirmText}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 rounded-xl text-white font-medium hover:bg-gray-600 transition-all"
          >
            {onConfirm ? "Cancelar" : "Fechar"}
          </button>
        </div>
      </div>
    </div>
  );
}
