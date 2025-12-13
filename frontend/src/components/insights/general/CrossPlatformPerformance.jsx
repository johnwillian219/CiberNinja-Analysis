// src/components/insights/general/CrossPlatformPerformance.jsx
export default function CrossPlatformPerformance() {
  const topContent = [
    {
      rank: 1,
      title: "POV: Você entra no servidor errado",
      platform: "TikTok",
      metric: "2.1M views",
    },
    {
      rank: 2,
      title: "Hackeando o Algoritmo do YouTube em 2025",
      platform: "YouTube",
      metric: "215K views",
    },
    {
      rank: 3,
      title: "Aesthetic cyberpunk que você pediu",
      platform: "Instagram",
      metric: "456K alcance",
    },
    {
      rank: 4,
      title: "Live: Respondendo dúvidas",
      platform: "Facebook",
      metric: "178K alcance",
    },
    {
      rank: 5,
      title: "Reel: Tutorial rápido de phishing",
      platform: "Instagram",
      metric: "378K alcance",
    },
  ];

  const underperforming = [
    {
      title: "Post longo sem imagem no Facebook",
      platform: "Facebook",
      metric: "baixa interação",
    },
    {
      title: "Vídeo sem hook no YouTube",
      platform: "YouTube",
      metric: "retenção <30%",
    },
    {
      title: "Story sem poll no Instagram",
      platform: "Instagram",
      metric: "baixa resposta",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <div className="bg-gradient-to-br from-emerald-900/30 to-gray-900 border border-emerald-500/40 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-emerald-400 mb-8 text-center">
          Top Conteúdos Globais 🔥
        </h3>
        <div className="space-y-5">
          {topContent.map((item) => (
            <div key={item.rank} className="flex items-center gap-4 group">
              <span className="text-3xl font-bold text-emerald-400">
                #{item.rank}
              </span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {item.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {item.platform} • {item.metric}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-900/30 to-gray-900 border border-red-500/40 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-red-400 mb-8 text-center">
          Conteúdos com Baixo Desempenho 🧊
        </h3>
        <div className="space-y-5">
          {underperforming.map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <span className="text-3xl font-bold text-red-400">!</span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-red-300 transition-colors line-clamp-1">
                  {item.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {item.platform} • {item.metric}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
