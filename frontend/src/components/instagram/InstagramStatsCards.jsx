// src/components/instagram/InstagramStatsCards.jsx
import {
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  Users,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    icon: Eye,
    label: "Alcance Total",
    value: "1.8M",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Eye,
    label: "Impressões",
    value: "3.2M",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    icon: Heart,
    label: "Total de Likes",
    value: "456K",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: MessageCircle,
    label: "Comentários",
    value: "28.9K",
    gradient: "from-red-500 to-purple-500",
  },
  {
    icon: Bookmark,
    label: "Salvos",
    value: "89.2K",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Users,
    label: "Novos Seguidores",
    value: "+6.7K",
    gradient: "from-indigo-500 to-cyan-500",
    positive: true,
  },
];

export default function InstagramStatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-pink-500/60 transition-all hover:shadow-2xl hover:shadow-pink-500/20"
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
