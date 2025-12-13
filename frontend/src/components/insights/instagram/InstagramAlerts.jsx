// src/components/insights/instagram/InstagramAlerts.jsx
import { AlertTriangle, TrendingUp, Zap } from "lucide-react";

const alerts = [
  { type: "success", text: "Reel viral detectado: +215% alcance em 24h" },
  {
    type: "success",
    text: "Stories com polls estão com engajamento 45% acima da média",
  },
  {
    type: "warning",
    text: "Queda de 28% no alcance orgânico de posts estáticos",
  },
  {
    type: "success",
    text: "Carrossel educativo entrou no Explore — alto potencial de crescimento",
  },
];

export default function InstagramAlerts() {
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
                : "bg-orange-500/10 border-orange-500/40"
            }`}
          >
            {alert.type === "success" ? (
              <Zap className="w-8 h-8 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-orange-400" />
            )}
            <p
              className={`text-lg ${
                alert.type === "success"
                  ? "text-emerald-300"
                  : "text-orange-300"
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
