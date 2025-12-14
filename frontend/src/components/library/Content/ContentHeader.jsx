// src/components/library/Content/ContentHeader.jsx
import ContentBadges from "../Favorites/FavoritesBadge";

export default function ContentHeader({ content }) {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex justify-between">
      <ContentBadges
        platform={content.platform}
        type={content.type}
        isFavorite={content.isFavorite}
        isViral={content.viewsNumber > 1000000}
      />
      <ContentActions content={content} />
    </div>
  );
}
