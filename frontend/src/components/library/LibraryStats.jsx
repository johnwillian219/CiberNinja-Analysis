// src/components/library/LibraryStats.jsx
import {
  PlayCircle,
  Eye,
  ThumbsUp,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Total de Conteúdos",
    value: "428",
    icon: PlayCircle,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    label: "Visualizações Totais",
    value: "8.5M",
    icon: Eye,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    label: "Likes Acumulados",
    value: "485K",
    icon: ThumbsUp,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    label: "Comentários",
    value: "24.8K",
    icon: MessageCircle,
    gradient: "from-orange-500 to-red-500",
  },
  {
    label: "Crescimento Médio",
    value: "+28%",
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function LibraryStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <div
            key={i}
            className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
          >
            {/* Ícone com gradiente */}
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-xl`}
            >
              <Icon className="w-12 h-12 text-white" />
            </div>

            {/* Valor principal */}
            <p className="text-5xl lg:text-6xl font-bold text-white mb-4">
              {stat.value}
            </p>

            {/* Label — agora com quebra de linha automática e tamanho responsivo */}
            <p className="text-gray-300 text-base lg:text-lg font-medium leading-tight px-4">
              {stat.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
