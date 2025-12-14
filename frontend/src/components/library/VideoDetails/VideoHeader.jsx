// src/components/library/VideoDetails/VideoHeader.jsx
import { Youtube, Music, Instagram, Facebook } from "lucide-react";

const platformIcons = {
  YouTube: Youtube,
  TikTok: Music,
  Instagram: Instagram,
  Facebook: Facebook,
};

export default function VideoHeader({ content }) {
  const Icon = platformIcons[content.platform];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
      {/* Thumbnail grande */}
      <div className="lg:col-span-2">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={content.thumbnail}
            alt={content.title}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-10">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${content.platformGradient} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <span className="text-white font-bold text-2xl">
                  {content.platform}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                {content.title}
              </h1>
            </div>
          </div>
          <div className="absolute top-6 right-6 bg-black/70 px-5 py-3 rounded-full text-white flex items-center gap-3 text-lg font-bold">
            <Clock className="w-6 h-6" />
            {content.duration}
          </div>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="space-y-6">
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8">
            Desempenho Atual
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Eye className="w-9 h-9 text-cyan-400" />
                <span className="text-gray-300 text-lg">Visualizações</span>
              </div>
              <span className="text-3xl font-bold text-white">
                {content.views}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ThumbsUp className="w-9 h-9 text-emerald-400" />
                <span className="text-gray-300 text-lg">Likes</span>
              </div>
              <span className="text-3xl font-bold text-white">
                {content.likes}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MessageCircle className="w-9 h-9 text-purple-400" />
                <span className="text-gray-300 text-lg">Comentários</span>
              </div>
              <span className="text-3xl font-bold text-white">
                {content.comments}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Calendar className="w-9 h-9 text-orange-400" />
                <span className="text-gray-300 text-lg">Publicado</span>
              </div>
              <span className="text-xl font-bold text-white">
                {content.uploadDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
