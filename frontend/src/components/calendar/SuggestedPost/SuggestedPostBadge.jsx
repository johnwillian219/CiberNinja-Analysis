// src/components/calendar/SuggestedPost/SuggestedPostBadge.jsx
import { Zap } from "lucide-react";

export default function SuggestedPostBadge() {
  return (
    <div className="absolute -top-4 -left-4 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm flex items-center gap-2 shadow-2xl shadow-orange-500/50 animate-pulse">
      <Zap className="w-5 h-5" />
      Melhor Horário
    </div>
  );
}
