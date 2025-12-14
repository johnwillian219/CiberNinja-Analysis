// src/components/library/VideoDetails/VideoDetailsLayout.jsx
import { useState } from "react";

const tabs = [
  { id: "metrics", label: "Métricas", icon: TrendingUp },
  { id: "content", label: "Conteúdo", icon: FileText },
  { id: "comments", label: "Comentários", icon: MessageCircle },
  { id: "notes", label: "Notas", icon: Edit3 },
];

export default function VideoDetailsLayout({ children }) {
  const [activeTab, setActiveTab] = useState("metrics");

  return (
    <div>
      {/* Abas */}
      <div className="border-b border-gray-700/50 mb-12">
        <div className="flex gap-10 overflow-x-auto pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-2 pb-4 border-b-4 transition-all font-bold text-xl whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              <tab.icon className="w-7 h-7" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo da aba ativa */}
      <div>{children(activeTab)}</div>
    </div>
  );
}
