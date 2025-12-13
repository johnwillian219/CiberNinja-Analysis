// src/components/insights/tiktok/TikTokAlerts.jsx
import { AlertTriangle, TrendingUp, Flame } from "lucide-react";

const alerts = [
  { type: "success", text: "Vídeo viral detectado: +215% views em 24h" },
  { type: "success", text: "TikTok cresceu 48% em alcance esta semana" },
  { type: "warning", text: "Queda de 31% no tempo de visualização médio" },
  {
    type: "success",
    text: "Áudio original entrou no trending — alto potencial de duets",
  },
];

export default function TikTokAlerts() {
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
                : "bg-pink-500/10 border-pink-500/40"
            }`}
          >
            {alert.type === "success" ? (
              <Flame className="w-8 h-8 text-emerald-400 animate-pulse" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-pink-400" />
            )}
            <p
              className={`text-lg ${
                alert.type === "success" ? "text-emerald-300" : "text-pink-300"
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
