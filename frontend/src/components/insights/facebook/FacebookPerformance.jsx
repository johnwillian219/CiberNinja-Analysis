// src/components/insights/facebook/FacebookPerformance.jsx
export default function FacebookPerformance() {
  const topPosts = [
    {
      title: "Dicas de segurança para iniciantes",
      reach: "215K",
      engagement: "12.8%",
    },
    {
      title: "Live: Respondendo dúvidas de cibersegurança",
      reach: "178K",
      engagement: "11.2%",
    },
    { title: "Meme do dia sobre hackers", reach: "148K", engagement: "9.8%" },
  ];

  const flopPosts = [
    { title: "Link externo sem imagem", reach: "28K", engagement: "2.9%" },
    { title: "Post apenas com texto longo", reach: "35K", engagement: "3.4%" },
    { title: "Anúncio sem botão claro", reach: "42K", engagement: "4.1%" },
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
      <div className="bg-gray-800/70 backdrop-blur-sm border border-blue-500/40 rounded-3xl p-8">
        <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center">
          Precisa Melhorar 🧊
        </h3>
        <div className="space-y-5">
          {flopPosts.map((post, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <span className="text-3xl font-bold text-blue-400">#{i + 1}</span>
              <div className="flex-1">
                <p className="text-white font-medium group-hover:text-blue-300 transition-colors line-clamp-1">
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
