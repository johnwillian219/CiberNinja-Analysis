// src/components/library/Actions/ContentActions.jsx
import { Heart, Edit3, Trash2, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function ContentActions({
  isFavorite,
  onFavoriteToggle,
  onEdit,
  onDelete,
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        className="p-3 bg-gray-700/80 rounded-xl hover:bg-gray-600 transition-all backdrop-blur-sm"
      >
        <MoreVertical className="w-6 h-6 text-white" />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle();
              setShowMenu(false);
            }}
            className="w-full px-6 py-4 flex items-center gap-4 text-white hover:bg-gray-700 transition-all"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
            <span>
              {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            </span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setShowMenu(false);
            }}
            className="w-full px-6 py-4 flex items-center gap-4 text-white hover:bg-gray-700 transition-all"
          >
            <Edit3 className="w-6 h-6 text-cyan-400" />
            <span>Editar conteúdo</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setShowMenu(false);
            }}
            className="w-full px-6 py-4 flex items-center gap-4 text-white hover:bg-red-900/50 transition-all"
          >
            <Trash2 className="w-6 h-6 text-red-400" />
            <span>Deletar</span>
          </button>
        </div>
      )}
    </div>
  );
}
