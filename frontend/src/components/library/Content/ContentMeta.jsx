// src/components/library/ContentGrid/ContentMeta.jsx
import { Calendar, Clock } from "lucide-react";

export default function ContentMeta({ uploadDate, duration }) {
  return (
    <div className="flex items-center justify-between text-gray-400 text-sm mt-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        <span>{uploadDate}</span>
      </div>
      {duration && (
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>{duration}</span>
        </div>
      )}
    </div>
  );
}
