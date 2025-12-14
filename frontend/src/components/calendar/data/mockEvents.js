// src/components/calendar/data/mockEvents.js

export const mockEvents = [
  {
    id: 1,
    date: "2025-12-15",
    title: "Tutorial Avançado de Kali Linux",
    platform: "YouTube",
    type: "video",
    time: "18:00",
    status: "scheduled",
    isBestTime: true,
    description:
      "Explorando ferramentas avançadas do Kali para pentest profissional",
    thumbnail: "https://img.youtube.com/vi/kali123/maxresdefault.jpg",
  },
  {
    id: 2,
    date: "2025-12-17",
    title: "Live: Respondendo dúvidas de cibersegurança",
    platform: "YouTube",
    type: "live",
    time: "20:00",
    status: "scheduled",
    description: "Sessão ao vivo tirando dúvidas da comunidade",
    thumbnail: "https://img.youtube.com/vi/live456/maxresdefault.jpg",
  },
  {
    id: 3,
    date: "2025-12-18",
    title: "Dica rápida: como proteger sua senha",
    platform: "TikTok",
    type: "short",
    time: "12:00",
    status: "published",
    description: "3 dicas infalíveis em 60 segundos",
    thumbnail:
      "https://p16-sign.tiktokcdn.com/tos-maliva-p-0068/placeholder.jpg",
  },
  {
    id: 4,
    date: "2025-12-20",
    title: "Análise de phishing real time",
    platform: "Instagram",
    type: "reel",
    time: "19:00",
    status: "scheduled",
    description: "Desmontando um ataque de phishing ao vivo",
    thumbnail: "https://via.placeholder.com/1080x1920.png?text=Phishing+Reel",
  },
  {
    id: 5,
    date: "2025-12-22",
    title: "Post: 5 ferramentas gratuitas de segurança",
    platform: "Facebook",
    type: "post",
    time: "10:00",
    status: "scheduled",
    description: "Lista com links e dicas de uso",
  },
];

// Sugestões da IA (não são eventos fixos, mas sugestões dinâmicas)
export const aiSuggestions = [
  {
    suggestedDate: "2025-12-20",
    time: "18:00",
    type: "video",
    titleSuggestion: "O maior ataque de phishing de 2025 (análise completa)",
    reason:
      "Seu público está mais ativo às 18h neste dia. Tema em alta com baixa concorrência.",
  },
  {
    suggestedDate: "2025-12-23",
    time: "12:00",
    type: "short",
    titleSuggestion: "Nunca clique nesse tipo de link! (exemplo real)",
    reason: "Shorts com alerta de segurança têm 3x mais retenção no seu canal.",
  },
];
