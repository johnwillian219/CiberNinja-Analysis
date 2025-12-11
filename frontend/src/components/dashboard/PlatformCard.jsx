// src/components/dashboard/PlatformCard.jsx
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const generateSparklineData = (positive = true) => {
  if (positive) {
    return [30, 35, 32, 40, 45, 50, 62, 70, 68, 80].map((v) => ({
      value: v + Math.random() * 8,
    }));
  } else {
    return [80, 75, 78, 70, 65, 60, 58, 52, 55, 48].map((v) => ({
      value: v + Math.random() * 8,
    }));
  }
};

export default function PlatformCard({
  platform,
  Icon,
  followers = 0,
  growth = 0,
  growthText = "este mês",
}) {
  const isPositive = growth >= 0;
  const data = generateSparklineData(isPositive);

  return (
    <Link
      to={platform.path}
      className="group relative block bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 
                 hover:bg-gray-800/90 hover:border-cyan-500/40 transition-all duration-300
                 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
    >
      {/* Fundo sutil no hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {platform.name}
          </h3>
          <div className="p-2.5 bg-gray-900/70 rounded-xl group-hover:scale-110 transition-transform">
            <Icon className={`w-8 h-8 ${platform.color}`} />
          </div>
        </div>

        {/* Seguidores */}
        <p className="text-gray-400 text-sm">
          Total de {platform.followersLabel}
        </p>
        <p className="text-3xl font-bold text-white mt-1">
          {followers.toLocaleString("pt-BR")}
        </p>

        {/* Crescimento */}
        <div
          className={`flex items-center gap-2 mt-3 text-lg font-semibold ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-5 h-5" />
          ) : (
            <ArrowDownRight className="w-5 h-5" />
          )}
          <span>
            {isPositive ? "+" : ""}
            {growth.toLocaleString("pt-BR")} {growthText}
          </span>
        </div>

        {/* Sparkline com altura fixa e sem vazamento */}
        <div className="mt-6 h-20 -mx-6 -mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={3}
                dot={false}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Ver mais */}
        <div className="mt-6 text-right">
          <span className="inline-flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
            Ver mais
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
