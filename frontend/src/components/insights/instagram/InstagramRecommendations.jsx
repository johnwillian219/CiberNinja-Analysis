// src/components/insights/instagram/InstagramRecommendations.jsx
export default function InstagramRecommendations() {
  const recommendations = [
    "Aumente a frequência de Reels para 4-6 por semana — algoritmo prioriza conteúdo em vídeo.",
    "Use música trending nos Reels — aumenta alcance orgânico em até 68%.",
    "Adicione polls, questions e sliders nos Stories diariamente — alto engajamento interativo.",
    "Crie carrosséis educativos com 6-8 slides — maior tempo na tela e mais salvamentos.",
    "Poste entre 19h e 21h — pico de atividade do seu público.",
    "Use hashtags estratégicas (5-9 por post) — evite mais de 10 para não penalizar alcance.",
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Recomendações da IA para Instagram
      </h2>
      <div className="space-y-6">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all"
          >
            <p className="text-white text-lg leading-relaxed">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
