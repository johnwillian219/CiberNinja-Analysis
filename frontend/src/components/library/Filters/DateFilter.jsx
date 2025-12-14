// src/components/library/Filters/DateFilter.jsx
import { Calendar } from "lucide-react";

const dateOptions = [
  { value: "all", label: "Todo o período" },
  { value: "last7days", label: "Últimos 7 dias" },
  { value: "last30days", label: "Últimos 30 dias" },
  { value: "last90days", label: "Últimos 90 dias" },
  { value: "thismonth", label: "Este mês" },
  { value: "lastmonth", label: "Mês passado" },
  { value: "thisyear", label: "Este ano" },
];

export default function DateFilter({ selected, onChange }) {
  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-14 pr-12 py-5 bg-gray-700/70 border border-gray-600 rounded-3xl text-white text-lg appearance-none focus:border-purple-500 focus:outline-none transition-all cursor-pointer hover:bg-gray-600"
      >
        {dateOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 pointer-events-none" />
      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
