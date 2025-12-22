// frontend/src/components/auth/DisconnectModal.jsx

import { useEffect, useCallback } from "react";
import { AlertTriangle, Info } from "lucide-react";

export default function DisconnectModal({ isOpen, onClose, onConfirm }) {
  // Fecha modal com Escape
  const handleEscape = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-end justify-center p-4 sm:items-center sm:p-0"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="disconnect-modal-title"
    >
      <div
        className="bg-gray-800 w-full max-w-md rounded-t-2xl sm:rounded-2xl border border-gray-700 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg" aria-hidden="true">
              <svg
                className="w-6 h-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <div>
              <h3
                id="disconnect-modal-title"
                className="text-lg font-bold text-white"
              >
                Desconectar YouTube?
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-2 p-3 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                Você perderá acesso aos dados históricos e análises em tempo
                real.
              </p>
            </div>
            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg">
              <Info className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                Pode reconectar a qualquer momento para restaurar o acesso.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 p-4 bg-gray-900/50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white rounded-xl text-sm font-medium transition-colors"
              aria-label="Cancelar desconexão"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 text-white rounded-xl text-sm font-medium transition-colors"
              aria-label="Confirmar desconexão"
            >
              Desconectar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
