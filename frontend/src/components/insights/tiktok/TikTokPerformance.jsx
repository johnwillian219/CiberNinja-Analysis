// src/components/insights/tiktok/TikTokPerformance.jsx
export default function TikTokPerformance() {
  const topVideos = [
    {
      title: "POV: Você entra no servidor errado",
      views: "2.1M",
      engagement: "18.4%",
    },
    {
      title: "Quando o beat dropa e vira meme",
      views: "1.6M",
      engagement: "16.2%",
    },
    {
      title: "Hackeando o algoritmo em 15 segundos",
      views: "1.2M",
      engagement: "14.8%",
    },
  ];

  const flopVideos = [
    { title: "Vídeo longo sem hook", views: "98K", engagement: "4.2%" },
    { title: "Post com texto excessivo", views: "145K", engagement: "5.1%" },
    { title: "Vídeo sem música trending", views: "210K", engagement: "6.3%" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      {/* Top Performers */}
      <div className="bg-gray-800/70 backdrop-blur-sm border border-emerald-500/40 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-emerald-400 mb-8 text-center">
          Melhores Performances 🔥
        </h3>
        <div className="space-y-5">
          {topVideos.map((video, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <span className="text-3xl font-bold text-emerald-400">
                #{i + 1}
              </span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {video.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {video.views} views • {video.engagement} engajamento
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flops */}
      <div className="bg-gray-800/70 backdrop-blur-sm border border-pink-500/40 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-pink-400 mb-8 text-center">
          Precisa Melhorar 🧊
        </h3>
        <div className="space-y-5">
          {flopVideos.map((video, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <span className="text-3xl font-bold text-pink-400">#{i + 1}</span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-pink-300 transition-colors line-clamp-1">
                  {video.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {video.views} views • {video.engagement} engajamento
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
