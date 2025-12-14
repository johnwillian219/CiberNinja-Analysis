// src/components/library/ContentGrid/ContentGrid.jsx
import ContentCard from "./ContentCard";

// Dados simulados (em produção viria da API filtrada)
const mockContents = [
  {
    id: "1",
    platform: "YouTube",
    type: "long",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    title: "Como Hackear o Algoritmo do YouTube em 2025 (Prova Real)",
    views: "215K",
    likes: "12.4K",
    comments: "842",
    date: "10 Dez 2025",
    duration: "15:42",
    isFavorite: true,
  },
  {
    id: "2",
    platform: "TikTok",
    type: "short",
    thumbnail:
      "https://p16-sign.tiktokcdn.com/tos-maliva-p-0068/placeholder.jpg", // placeholder real do TikTok
    title: "POV: Você entra no servidor errado 😂",
    views: "2.1M",
    likes: "185K",
    comments: "8.2K",
    date: "08 Dez 2025",
    duration: "0:58",
    isFavorite: false,
  },
  {
    id: "3",
    platform: "Instagram",
    type: "reel",
    thumbnail: "https://via.placeholder.com/1080x1920.png?text=Reel+Instagram",
    title: "Tutorial rápido de phishing em 60s",
    views: "456K",
    likes: "32K",
    comments: "1.2K",
    date: "07 Dez 2025",
    duration: "1:00",
    isFavorite: true,
  },
  // ... mais itens
];

export default function ContentGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
      {mockContents.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  );
}
