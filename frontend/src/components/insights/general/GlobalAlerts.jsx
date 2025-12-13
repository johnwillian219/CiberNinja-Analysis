// src/components/insights/general/GlobalAlerts.jsx
import { AlertTriangle, TrendingUp, Zap, Flame } from "lucide-react";

const alerts = [
  {
    type: "success",
    icon: Flame,
    text: "Viral cruzado detectado: mesmo tema performando bem em TikTok, Instagram e YouTube",
  },
  {
    type: "success",
    icon: TrendingUp,
    text: "Crescimento acelerado: +32K seguidores em 30 dias em todas as plataformas",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    text: "Queda geral no alcance orgânico do Facebook (-22%)",
  },
  {
    type: "success",
    icon: Zap,
    text: "Oportunidade: tema 'hacking ético' em alta em 3 plataformas — considere série integrada",
  },
  {
    type: "info",
    icon: Zap,
    text: "Horário 19h-21h consistente como pico em YouTube, TikTok e Instagram",
  },
];

export default function GlobalAlerts() {
  const getStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-emerald-500/10 border-emerald-500/40";
      case "warning":
        return "bg-red-500/10 border-red-500/40";
      default:
        return "bg-cyan-500/10 border-cyan-500/40";
    }
  };

  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Alertas Globais Multi-Plataforma
      </h2>
      <div className="space-y-6">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className={`flex items-center gap-5 p-6 rounded-2xl border ${getStyles(
              alert.type
            )} hover:shadow-lg transition-all`}
          >
            <alert.icon
              className={`w-8 h-8 ${
                alert.type === "success"
                  ? "text-emerald-400"
                  : alert.type === "warning"
                  ? "text-red-400"
                  : "text-cyan-400"
              }`}
            />
            <p
              className={`text-lg ${
                alert.type === "success"
                  ? "text-emerald-300"
                  : alert.type === "warning"
                  ? "text-red-300"
                  : "text-cyan-300"
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
