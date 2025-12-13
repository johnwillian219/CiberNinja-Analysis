// src/components/insights/youtube/YouTubeRecommendations.jsx
export default function YouTubeRecommendations() {
  const recommendations = [
    "Aumente a frequência de Shorts — eles estão convertendo 28% melhor em inscritos.",
    "Use thumbnails com fundo vermelho e texto branco — CTR médio +62% nos últimos testes.",
    "Adicione end screens com call-to-action 'inscreva-se' em todos os vídeos longos.",
    "Experimente vídeos de 8-12 minutos — equilíbrio perfeito entre retenção e watch time.",
    "Crie séries (playlists) sobre 'hacking ético' — tema com maior taxa de conclusão.",
    "Evite postar aos domingos — alcance 34% menor que a média semanal.",
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Recomendações da IA para YouTube
      </h2>
      <div className="space-y-6">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-2xl p-6 hover:border-red-500/60 transition-all"
          >
            <p className="text-white text-lg leading-relaxed">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
