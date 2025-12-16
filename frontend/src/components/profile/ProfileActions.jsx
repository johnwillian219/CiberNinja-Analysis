import { Edit3, Save, RotateCcw, X } from "lucide-react";

export default function ProfileActions({
  isEditing,
  isLoading,
  onEdit,
  onSave,
  onCancel,
  onReset,
}) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-700/50">
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {isEditing ? (
          <>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-8 py-4 border border-gray-600 rounded-2xl text-gray-300 font-medium hover:border-gray-500 hover:bg-gray-700/50 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <X className="w-5 h-5" />
              Cancelar
            </button>

            <button
              onClick={onReset}
              disabled={isLoading}
              className="px-8 py-4 border border-gray-600 rounded-2xl text-amber-300 font-medium hover:border-amber-500 hover:bg-amber-500/10 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              <RotateCcw className="w-5 h-5" />
              Resetar
            </button>

            <button
              onClick={onSave}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Save className="w-5 h-5 relative z-10" />
              <span className="relative z-10">
                {isLoading ? "Salvando..." : "Salvar alterações"}
              </span>
            </button>
          </>
        ) : (
          <button
            onClick={onEdit}
            className="px-10 py-5 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/50 rounded-2xl text-cyan-400 font-semibold hover:from-cyan-500/30 hover:to-emerald-500/30 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <Edit3 className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Editar perfil</span>
          </button>
        )}
      </div>

      {isEditing && (
        <p className="text-center text-gray-500 text-sm mt-4">
          Todas as alterações serão refletidas imediatamente após salvar
        </p>
      )}
    </div>
  );
}
