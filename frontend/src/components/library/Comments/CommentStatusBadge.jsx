// src/components/library/Comments/CommentStatusBadge.jsx
import { AlertTriangle, Sparkles, Meh } from "lucide-react";

export default function CommentStatusBadge({ sentiment, isUrgent }) {
  if (isUrgent) {
    return (
      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        Urgente
      </div>
    );
  }

  if (sentiment === "positive") {
    return (
      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Positivo
      </div>
    );
  }

  if (sentiment === "negative") {
    return (
      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        Negativo
      </div>
    );
  }

  return (
    <div className="px-4 py-2 rounded-full bg-gray-600 text-gray-300 font-medium text-sm flex items-center gap-2">
      <Meh className="w-4 h-4" />
      Neutro
    </div>
  );
}
