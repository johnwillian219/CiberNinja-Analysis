// src/components/library/Filters/SortFilter.jsx
import { ArrowDownAZ, ArrowUpZA, TrendingUp, Clock, Eye } from "lucide-react";

const sortOptions = [
  { value: "recent", label: "Mais recente", icon: Clock },
  { value: "oldest", label: "Mais antigo", icon: Clock },
  { value: "mostViewed", label: "Mais visualizações", icon: Eye },
  { value: "leastViewed", label: "Menos visualizações", icon: Eye },
  { value: "mostLiked", label: "Mais likes", icon: TrendingUp },
  { value: "titleAZ", label: "Título A-Z", icon: ArrowDownAZ },
  { value: "titleZA", label: "Título Z-A", icon: ArrowUpZA },
];

export default function SortFilter({ selected, onChange }) {
  const currentOption =
    sortOptions.find((opt) => opt.value === selected) || sortOptions[0];
  const Icon = currentOption.icon;

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-14 pr-12 py-5 bg-gray-700/70 border border-gray-600 rounded-3xl text-white text-lg appearance-none focus:border-purple-500 focus:outline-none transition-all cursor-pointer hover:bg-gray-600"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 pointer-events-none" />
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
