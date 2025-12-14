// src/components/library/Content/ContentCard.jsx
import { Link } from "react-router-dom";
import ContentThumbnail from "./ContentThumbnail";
import ContentHeader from "./ContentHeader";
import ContentFooter from "./ContentFooter";
import ContentOverlay from "./ContentOverlay";

export default function ContentCard({ content }) {
  return (
    <div className="group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500">
      <Link to={`/library/${content.id}`} className="block">
        <div className="relative">
          <ContentThumbnail
            thumbnailUrl={content.thumbnail}
            duration={content.duration}
          />
          <ContentOverlay />
          <ContentHeader content={content} />
        </div>
      </Link>
      <ContentFooter content={content} />
    </div>
  );
}
