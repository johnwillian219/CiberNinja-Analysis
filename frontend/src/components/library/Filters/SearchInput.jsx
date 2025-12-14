// src/components/library/Filters/SearchInput.jsx
import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar por título, descrição ou tags...",
}) {
  return (
    <div className="relative max-w-3xl mx-auto">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-16 pr-8 py-6 bg-gray-700/70 border border-gray-600 rounded-3xl text-white text-lg focus:border-purple-500 focus:outline-none transition-all"
      />
    </div>
  );
}
