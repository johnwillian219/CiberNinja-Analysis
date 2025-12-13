// src/components/insights/facebook/FacebookRecommendations.jsx
export default function FacebookRecommendations() {
  const recommendations = [
    "Priorize vídeos nativos (upload direto) — alcance orgânico 2.8x maior que links externos.",
    "Crie posts com chamadas claras para ação: 'Compartilhe se concorda', 'Marque um amigo'.",
    "Poste entre 13h e 15h durante a semana — pico de atividade do público.",
    "Use imagens de alta qualidade com texto curto — melhor taxa de engajamento.",
    "Crie eventos e lives — alto potencial de alcance e interação.",
    "Evite links externos diretos — algoritmo penaliza em até 40%. Use texto + link no comentário.",
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Recomendações da IA para Facebook
      </h2>
      <div className="space-y-6">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all"
          >
            <p className="text-white text-lg leading-relaxed">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
