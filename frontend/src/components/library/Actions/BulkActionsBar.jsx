// src/components/library/Actions/BulkActionsBar.jsx
import { X, Download, Trash2, Tag, Eye } from "lucide-react";
import { useSelection } from "./SelectionProvider";

export default function BulkActionsBar() {
  const { selectedIds, clearSelection, count } = useSelection();

  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-lg border-t border-purple-500/50 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={clearSelection}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <p className="text-white text-xl font-bold">
            {count} conteúdo{count > 1 ? "s" : ""} selecionado
            {count > 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-3 px-6 py-4 bg-white/10 rounded-2xl text-white font-medium hover:bg-white/20 transition-all">
            <Eye className="w-6 h-6" />
            Visualizar
          </button>

          <button className="flex items-center gap-3 px-6 py-4 bg-white/10 rounded-2xl text-white font-medium hover:bg-white/20 transition-all">
            <Tag className="w-6 h-6" />
            Adicionar Tag
          </button>

          <button className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-bold hover:shadow-lg hover:shadow-purple-500/40 transition-all">
            <Download className="w-6 h-6" />
            Exportar Relatório
          </button>

          <button className="flex items-center gap-3 px-6 py-4 bg-red-600/80 rounded-2xl text-white font-bold hover:bg-red-600 transition-all">
            <Trash2 className="w-6 h-6" />
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
