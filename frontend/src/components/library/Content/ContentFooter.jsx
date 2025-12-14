// src/components/library/Content/ContentFooter.jsx
import ContentMeta from "./ContentMeta";

export default function ContentFooter({ content }) {
  return (
    <div className="p-6">
      <Link to={`/library/${content.id}`}>
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {content.title}
        </h3>
      </Link>
      <ContentMeta uploadDate={content.date} duration={content.duration} />
      {/* Métricas */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div>
          <p className="text-gray-400 text-xs mb-1">Views</p>
          <p className="text-white font-bold text-lg">{content.views}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Likes</p>
          <p className="text-white font-bold text-lg">{content.likes}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Comentários</p>
          <p className="text-white font-bold text-lg">{content.comments}</p>
        </div>
      </div>
    </div>
  );
}
