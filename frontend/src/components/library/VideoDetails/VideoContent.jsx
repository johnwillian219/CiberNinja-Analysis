// src/components/library/VideoDetails/VideoContent.jsx
import { Hash } from "lucide-react";

export default function VideoContent({ content }) {
  return (
    <div>
      <h3 className="text-3xl font-bold text-white mb-10">
        Conteúdo Publicado
      </h3>

      <div className="space-y-12">
        {/* Título */}
        <div>
          <p className="text-gray-400 text-lg mb-4">Título</p>
          <p className="text-3xl font-bold text-white leading-relaxed">
            {content.title}
          </p>
        </div>

        {/* Descrição */}
        <div>
          <p className="text-gray-400 text-lg mb-4">Descrição</p>
          <pre className="text-gray-200 text-lg leading-relaxed bg-gray-800/50 p-8 rounded-3xl whitespace-pre-wrap font-sans">
            {content.description}
          </pre>
        </div>

        {/* Tags */}
        <div>
          <p className="text-gray-400 text-lg mb-6 flex items-center gap-3">
            <Hash className="w-6 h-6" />
            Tags Utilizadas
          </p>
          <div className="flex flex-wrap gap-4">
            {content.tags.map((tag, i) => (
              <span
                key={i}
                className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-2xl text-purple-300 font-medium text-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
