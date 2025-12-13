// src/components/insights/general/CombinedRecommendations.jsx
export default function CombinedRecommendations() {
  const recommendations = [
    "Foquem em vídeos curtos (Reels, Shorts, TikTok) — eles representam 68% do seu crescimento recente em alcance e engajamento.",
    "Poste consistentemente entre 19h e 21h — horário com maior atividade em YouTube, TikTok e Instagram.",
    "Explore mais o tema 'hacking ético' — alto desempenho em salvamentos e shares no YouTube, Instagram e TikTok.",
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Recomendações Estratégicas Multi-Plataforma
      </h2>
      <div className="space-y-6">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-500/60 transition-all"
          >
            <p className="text-white text-lg leading-relaxed">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
