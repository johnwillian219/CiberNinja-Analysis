// src/components/insights/tiktok/TikTokRecommendations.jsx
export default function TikTokRecommendations() {
  const recommendations = [
    "Aumente a frequência de postagens para 5-7 vídeos por semana — algoritmo favorece consistência.",
    "Use áudio original ou trending — vídeos com som original têm 3.8x mais chance de viralizar.",
    "Comece com hook forte nos primeiros 3 segundos — retenção inicial é crucial no TikTok.",
    "Adicione texto na tela apenas nos primeiros 5 segundos — depois remove para aumentar watch time.",
    "Experimente duets e stitches com vídeos virais — alto potencial de alcance orgânico.",
    "Poste entre 20h e 22h — pico de atividade do seu público-alvo.",
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">
        Recomendações da IA para TikTok
      </h2>
      <div className="space-y-6">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-2xl p-6 hover:border-pink-500/60 transition-all"
          >
            <p className="text-white text-lg leading-relaxed">{rec}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
