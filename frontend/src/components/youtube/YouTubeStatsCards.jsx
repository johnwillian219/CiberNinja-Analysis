// src/components/youtube/YouTubeStatsCards.jsx
import {
  Eye,
  ThumbsUp,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    icon: Eye,
    label: "Views",
    fullLabel: "Total de Views",
    value: "28.475",
    gradient: "from-red-500 to-pink-500",
    trend: "+12%",
  },
  {
    icon: ThumbsUp,
    label: "Likes",
    fullLabel: "Total de Likes",
    value: "98.7K",
    gradient: "from-pink-500 to-purple-500",
    trend: "+8%",
  },
  {
    icon: MessageCircle,
    label: "Comentários",
    fullLabel: "Comentários",
    value: "12.3K",
    gradient: "from-purple-500 to-indigo-500",
    trend: "+15%",
  },
  {
    icon: Users,
    label: "Inscritos",
    fullLabel: "Inscritos Ganhos",
    value: "+8.9K",
    gradient: "from-indigo-500 to-emerald-500",
    positive: true,
    trend: "+24%",
  },
  {
    icon: Clock,
    label: "Tempo",
    fullLabel: "Tempo de Exibição",
    value: "124K",
    suffix: "h",
    gradient: "from-cyan-500 to-blue-500",
    trend: "+18%",
  },
  {
    icon: TrendingUp,
    label: "Engajamento",
    fullLabel: "Engajamento Médio",
    value: "8.7",
    suffix: "%",
    gradient: "from-emerald-500 to-green-500",
    trend: "+3%",
  },
];

export default function YouTubeStatsCards() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-10">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 hover:border-red-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/10"
        >
          {/* Ícone com gradiente */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
            >
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>

            {/* Trend badge - mobile only */}
            <span className="lg:hidden text-xs font-medium px-1.5 py-0.5 rounded bg-gray-700/50 text-gray-300">
              {stat.trend}
            </span>
          </div>

          {/* Valor */}
          <div className="flex items-baseline gap-1 mb-0.5">
            <p
              className={`text-xl sm:text-2xl lg:text-3xl font-bold text-white ${
                stat.positive ? "text-emerald-400" : ""
              }`}
            >
              {stat.value}
            </p>
            {stat.suffix && (
              <span className="text-sm text-gray-400">{stat.suffix}</span>
            )}
          </div>

          {/* Label e trend */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-xs sm:text-sm truncate">
              <span className="lg:hidden">{stat.label}</span>
              <span className="hidden lg:inline">{stat.fullLabel}</span>
            </p>

            {/* Trend badge - desktop only */}
            <span className="hidden lg:inline text-xs font-medium px-2 py-1 rounded bg-gray-700/50 text-gray-300">
              {stat.trend}
            </span>
          </div>

          {/* Efeito de hover sutil */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </div>
      ))}
    </div>
  );
}
