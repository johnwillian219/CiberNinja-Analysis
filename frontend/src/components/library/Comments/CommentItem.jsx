// src/components/library/Comments/CommentItem.jsx
import { ThumbsUp, MessageCircle } from "lucide-react";
import ReplySuggestion from "./ReplySuggestion";
import CommentStatusBadge from "./CommentStatusBadge";

export default function CommentItem({ comment }) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/40 transition-all">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-14 h-14 rounded-full object-cover"
        />

        {/* Conteúdo */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <p className="text-white font-bold text-lg">{comment.author}</p>
            <p className="text-gray-400 text-sm">{comment.date}</p>
            <CommentStatusBadge
              sentiment={comment.sentiment}
              isUrgent={comment.isUrgent}
            />
          </div>

          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            {comment.text}
          </p>

          {/* Ações rápidas */}
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm">{comment.likes}</span>
            </button>

            <button className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Responder</span>
            </button>
          </div>

          {/* Sugestão de resposta da IA */}
          {comment.hasReplySuggestion && (
            <ReplySuggestion commentId={comment.id} />
          )}
        </div>
      </div>
    </div>
  );
}
