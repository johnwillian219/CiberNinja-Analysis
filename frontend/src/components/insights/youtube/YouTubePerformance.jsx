// src/components/insights/youtube/YouTubePerformance.jsx
export default function YouTubePerformance() {
  const topVideos = [
    {
      title: "Hackeando o Algoritmo do YouTube em 2025",
      views: "215K",
      engagement: "9.8%",
    },
    { title: "Live: Invadindo a Deep Web", views: "148K", engagement: "8.7%" },
    {
      title: "Como Instalar Kali Linux 2025",
      views: "98K",
      engagement: "8.1%",
    },
  ];

  const flopVideos = [
    { title: "Review de ferramenta antiga", views: "12K", engagement: "2.1%" },
    {
      title: "Vídeo sem thumbnail personalizada",
      views: "18K",
      engagement: "2.8%",
    },
    { title: "Tutorial longo sem capítulos", views: "25K", engagement: "3.4%" },
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
      <div className="bg-gray-800/70 backdrop-blur-sm border border-red-500/40 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-red-400 mb-8 text-center">
          Precisa Melhorar 🧊
        </h3>
        <div className="space-y-5">
          {flopVideos.map((video, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <span className="text-3xl font-bold text-red-400">#{i + 1}</span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-red-300 transition-colors line-clamp-1">
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
