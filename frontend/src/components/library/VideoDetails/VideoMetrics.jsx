// src/components/library/VideoDetails/VideoMetrics.jsx
import { Eye, ThumbsUp, MessageCircle, TrendingUp, Clock } from "lucide-react";

export default function VideoMetrics({ content }) {
  const metrics = [
    {
      label: "CTR Médio",
      value: content.ctr,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Retenção Média",
      value: content.retention,
      color: "from-cyan-500 to-blue-500",
    },
    {
      label: "Engajamento",
      value: content.engagement,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Tempo Médio de Visualização",
      value: "9:28",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div>
      <h3 className="text-3xl font-bold text-white mb-10">
        Métricas Detalhadas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/70 border border-gray-700/50 rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
          >
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center shadow-lg`}
            >
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-300 text-lg mb-4">{metric.label}</p>
            <p className="text-5xl font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder para gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gray-800/50 rounded-3xl p-8">
          <h4 className="text-2xl font-bold text-white mb-6">
            Evolução de Visualizações
          </h4>
          <div className="h-80 bg-gray-700/50 rounded-2xl flex items-center justify-center">
            <p className="text-gray-400 text-xl">Gráfico de linha em breve</p>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-3xl p-8">
          <h4 className="text-2xl font-bold text-white mb-6">
            Curva de Retenção
          </h4>
          <div className="h-80 bg-gray-700/50 rounded-2xl flex items-center justify-center">
            <p className="text-gray-400 text-xl">Gráfico de área em breve</p>
          </div>
        </div>
      </div>
    </div>
  );
}
