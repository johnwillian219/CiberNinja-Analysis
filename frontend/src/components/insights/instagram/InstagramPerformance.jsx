// src/components/insights/instagram/InstagramPerformance.jsx
export default function InstagramPerformance() {
  const topPosts = [
    {
      title: "Aesthetic cyberpunk que você pediu",
      reach: "456K",
      engagement: "18.9%",
    },
    {
      title: "Reel: Tutorial rápido de phishing",
      reach: "378K",
      engagement: "16.2%",
    },
    {
      title: "Carrossel: 10 ferramentas essenciais",
      reach: "285K",
      engagement: "14.1%",
    },
  ];

  const flopPosts = [
    { title: "Post sem legenda longa", reach: "45K", engagement: "3.4%" },
    { title: "Imagem única sem carrossel", reach: "68K", engagement: "4.1%" },
    { title: "Story sem interação", reach: "92K", engagement: "5.2%" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      {/* Top Performers */}
      <div className="bg-gray-800/70 backdrop-blur-sm border border-emerald-500/40 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-emerald-400 mb-8 text-center">
          Melhores Performances 🔥
        </h3>
        <div className="space-y-5">
          {topPosts.map((post, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <span className="text-3xl font-bold text-emerald-400">
                #{i + 1}
              </span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {post.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {post.reach} alcance • {post.engagement} engajamento
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flops */}
      <div className="bg-gray-800/70 backdrop-blur-sm border border-orange-500/40 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-orange-400 mb-8 text-center">
          Precisa Melhorar 🧊
        </h3>
        <div className="space-y-5">
          {flopPosts.map((post, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <span className="text-3xl font-bold text-orange-400">
                #{i + 1}
              </span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-orange-300 transition-colors line-clamp-1">
                  {post.title}
                </p>
                <p className="text-gray-400 text-sm">
                  {post.reach} alcance • {post.engagement} engajamento
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
