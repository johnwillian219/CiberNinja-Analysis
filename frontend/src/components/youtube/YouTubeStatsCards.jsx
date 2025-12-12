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
    label: "Total de Views",
    value: "28.475",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: ThumbsUp,
    label: "Total de Likes",
    value: "98.765",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    icon: MessageCircle,
    label: "Comentários",
    value: "12.345",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Users,
    label: "Inscritos Ganhos",
    value: "+8.920",
    gradient: "from-indigo-500 to-emerald-500",
    positive: true,
  },
  {
    icon: Clock,
    label: "Tempo de Exibição",
    value: "124.5K horas",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: TrendingUp,
    label: "Engajamento Médio",
    value: "8.7%",
    gradient: "from-emerald-500 to-green-500",
  },
];

export default function YouTubeStatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-red-500/60 transition-all hover:shadow-2xl hover:shadow-red-500/20"
        >
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg`}
          >
            <stat.icon className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-400 text-sm">{stat.label}</p>
          <p
            className={`text-2xl lg:text-3xl font-bold text-white ${
              stat.positive ? "text-emerald-400" : ""
            }`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
