// src/components/insights/facebook/FacebookAlerts.jsx
import { AlertTriangle, TrendingUp, Zap } from "lucide-react";

const alerts = [
  {
    type: "success",
    text: "Live com alta interação: +215% alcance em tempo real",
  },
  { type: "success", text: "Post educativo entrou no feed recomendado" },
  { type: "warning", text: "Alcance orgânico caiu 22% nos últimos 7 dias" },
  {
    type: "warning",
    text: "Posts com links externos penalizados pelo algoritmo",
  },
];

export default function FacebookAlerts() {
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
                : "bg-blue-500/10 border-blue-500/40"
            }`}
          >
            {alert.type === "success" ? (
              <Zap className="w-8 h-8 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-blue-400" />
            )}
            <p
              className={`text-lg ${
                alert.type === "success" ? "text-emerald-300" : "text-blue-300"
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
