// src/components/library/Filters/ContentTypeFilter.jsx
const typeMap = {
  YouTube: ["Todos", "Vídeos Longos", "Shorts", "Lives"],
  TikTok: ["Todos", "Vídeos", "Lives"],
  Instagram: ["Todos", "Reels", "Posts", "Stories"],
  Facebook: ["Todos", "Vídeos", "Reels", "Posts"],
  null: ["Todos", "Vídeos Longos", "Shorts", "Reels", "Posts", "Lives"], // Todas
};

export default function ContentTypeFilter({ platform, selected, onChange }) {
  const types = typeMap[platform] || typeMap.null;

  return (
    <div className="flex flex-wrap gap-4">
      {types.map((type) => {
        const isSelected =
          selected === type || (selected === null && type === "Todos");

        return (
          <button
            key={type}
            onClick={() => onChange(type === "Todos" ? null : type)}
            className={`px-6 py-4 rounded-2xl font-medium transition-all ${
              isSelected
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-700/70 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
