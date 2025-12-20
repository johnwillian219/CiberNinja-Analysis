// src/components/facebook/FacebookStatsCards.jsx
import {
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Users,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    icon: Eye,
    label: "Alcance",
    fullLabel: "Alcance Total",
    value: "1.2M",
    gradient: "from-blue-500 to-cyan-500",
    trend: "+14%",
  },
  {
    icon: Heart,
    label: "Reações",
    fullLabel: "Total de Reações",
    value: "356K",
    gradient: "from-cyan-500 to-blue-600",
    trend: "+18%",
  },
  {
    icon: MessageCircle,
    label: "Comentários",
    fullLabel: "Comentários",
    value: "28.9K",
    gradient: "from-blue-600 to-indigo-500",
    trend: "+22%",
  },
  {
    icon: Share2,
    label: "Shares",
    fullLabel: "Shares",
    value: "89.2K",
    gradient: "from-indigo-500 to-purple-500",
    trend: "+32%",
  },
  {
    icon: Users,
    label: "Seguidores",
    fullLabel: "Novos Seguidores",
    value: "+4.8K",
    gradient: "from-purple-500 to-pink-500",
    positive: true,
    trend: "+38%",
  },
  {
    icon: TrendingUp,
    label: "Engajamento",
    fullLabel: "Engajamento Médio",
    value: "7.4",
    suffix: "%",
    gradient: "from-pink-500 to-red-500",
    trend: "+5%",
  },
];

export default function FacebookStatsCards() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-10">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-5 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
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

          {/* Efeito de hover sutil - gradiente azul para Facebook */}
          <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </div>
      ))}
    </div>
  );
}
