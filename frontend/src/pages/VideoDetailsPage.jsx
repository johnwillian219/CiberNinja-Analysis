// src/pages/VideoDetailsPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  FileText,
  MessageCircle,
  Edit3,
} from "lucide-react";

import VideoDetailsLayout from "../components/library/VideoDetails/VideoDetailsLayout";
import VideoHeader from "../components/library/VideoDetails/VideoHeader";
import VideoMetrics from "../components/library/VideoDetails/VideoMetrics";
import VideoContent from "../components/library/VideoDetails/VideoContent";
import VideoComments from "../components/library/VideoDetails/VideoComments";
import VideoNotes from "../components/library/VideoDetails/VideoNotes";

// Tabs com ícones corretos
const tabs = [
  { id: "metrics", label: "Métricas", icon: TrendingUp },
  { id: "content", label: "Conteúdo", icon: FileText },
  { id: "comments", label: "Comentários", icon: MessageCircle },
  { id: "notes", label: "Notas", icon: Edit3 },
];

export default function VideoDetailsPage() {
  const { id } = useParams();

  // Dados simulados do conteúdo (em produção viria da API/store)
  const content = {
    id,
    platform: "YouTube",
    platformGradient: "from-red-500 to-pink-500",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    title: "Como Hackear o Algoritmo do YouTube em 2025 (Prova Real)",
    description: `Neste vídeo eu revelo as estratégias que usei para explodir meu canal em 2025. Tudo baseado em testes reais e mudanças no algoritmo.

⏰ TIMESTAMPS:
00:00 - Introdução
01:15 - O maior erro que 90% dos creators cometem
03:42 - A técnica de hook que triplicou meu CTR
06:28 - Como usar thumbnails para dobrar as views
09:15 - O segredo dos títulos que o YouTube AMA
12:50 - Tags que realmente funcionam em 2025
15:30 - Conclusão e dica final

🛠 Ferramentas mencionadas:
• TubeBuddy: https://www.tubebuddy.com/ciberninja
• VidIQ: https://vidiq.com/ciberninja

🚀 Quer aprender cibersegurança do zero?
Curso completo: https://ciberninja.com.br/curso

#YouTube2025 #HackingÉtico #CrescernoYouTube #AlgoritmoYouTube #Cibersegurança`,
    tags: [
      "YouTube2025",
      "hacking ético",
      "crescimento",
      "algoritmo youtube",
      "cibersegurança",
    ],
    views: "215K",
    likes: "12.4K",
    comments: "842",
    duration: "15:42",
    uploadDate: "10 Dezembro 2025",
    ctr: "8.2%",
    retention: "58%",
    engagement: "14.2%",
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 min-h-screen">
        {/* Botão voltar */}
        <Link
          to="/library"
          className="inline-flex items-center gap-3 text-gray-400 hover:text-white mb-10 transition-colors text-lg font-medium"
        >
          <ArrowLeft className="w-6 h-6" />
          Voltar para Biblioteca
        </Link>

        {/* Cabeçalho com thumbnail grande */}
        <VideoHeader content={content} />

        {/* Layout com abas */}
        <VideoDetailsLayout>
          {(activeTab) => (
            <>
              {activeTab === "metrics" && <VideoMetrics content={content} />}
              {activeTab === "content" && <VideoContent content={content} />}
              {activeTab === "comments" && <VideoComments contentId={id} />}
              {activeTab === "notes" && <VideoNotes contentId={id} />}
            </>
          )}
        </VideoDetailsLayout>
      </div>
    </DashboardLayout>
  );
}
