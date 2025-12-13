// src/components/insights/youtube/YouTubeAlerts.jsx
import { AlertTriangle, TrendingUp } from "lucide-react";

const alerts = [
  { type: "success", text: "YouTube cresceu 28% em watch time esta semana" },
  { type: "warning", text: "Retenção média caiu para 42% nos vídeos longos" },
  { type: "success", text: "Shorts viral detectado: +215% views em 24h" },
  { type: "warning", text: "Queda de 18% no CTR das thumbnails esta semana" },
];

export default function YouTubeAlerts() {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Alertas em Tempo Real
      </h2>
      <div className="space-y-6">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex items-center gap-5 p-6 rounded-2xl border ${
              alert.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/40"
                : "bg-red-500/10 border-red-500/40"
            }`}
          >
            {alert.type === "success" ? (
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-400" />
            )}
            <p
              className={`text-lg ${
                alert.type === "success" ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {alert.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
