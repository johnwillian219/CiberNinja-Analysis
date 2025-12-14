// src/components/library/Comments/CommentsSection.jsx
import { MessageCircle } from "lucide-react";

import CommentList from "./CommentList";

export default function CommentsSection({ contentId }) {
  // Simulação (em produção: fetch da API)
  const comments = [
    {
      id: 1,
      author: "João Silva",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Cara, esse vídeo mudou minha visão sobre o algoritmo! Obrigado pelas dicas reais.",
      likes: 42,
      sentiment: "positive",
      date: "há 2 dias",
    },
    {
      id: 2,
      author: "Maria Oliveira",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Alguém conseguiu aplicar a técnica do hook? Não tô conseguindo o mesmo resultado...",
      likes: 18,
      sentiment: "neutral",
      date: "há 5 horas",
      hasReplySuggestion: true,
    },
    {
      id: 3,
      author: "Pedro Troll",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      text: "Isso tudo é mentira, ninguém cresce assim no YouTube kkk",
      likes: 3,
      sentiment: "negative",
      date: "há 1 dia",
      isUrgent: true,
    },
  ];

  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-10">
        <MessageCircle className="w-10 h-10 text-purple-400" />
        <h3 className="text-3xl font-bold text-white">
          Comentários ({comments.length})
        </h3>
      </div>

      <CommentList comments={comments} />
    </div>
  );
}
