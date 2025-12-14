// src/components/library/ContentGrid/ContentCard.jsx
import { Link } from "react-router-dom";

// Imports dos componentes reutilizáveis da pasta Content/
import ContentThumbnail from "../Content/ContentThumbnail"; // se existir, ou usar o anterior
import ContentHeader from "../Content/ContentHeader";
import ContentFooter from "../Content/ContentFooter";
import ContentOverlay from "../Content/ContentOverlay";

// Outros imports (badges, actions, etc)
import ContentBadges from "../Favorites/FavoritesBadge";
import ContentActions from "../Actions/ContentActions";

export default function ContentCard({ content }) {
  return (
    <div className="group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500">
      {/* Área da thumbnail com overlay, header e actions */}
      <div className="relative">
        <Link to={`/library/${content.id}`}>
          <ContentThumbnail
            thumbnailUrl={content.thumbnail}
            title={content.title}
            duration={content.duration}
          />
        </Link>

        {/* Overlay de play no hover */}
        <ContentOverlay />

        {/* Header com badges e ações */}
        <ContentHeader content={content} />

        {/* Actions rápidas (já incluídas no Header ou separadas) */}
        {/* Se preferir separado, pode deixar aqui também */}
      </div>

      {/* Footer com título, meta e métricas */}
      <ContentFooter content={content} />
    </div>
  );
}
