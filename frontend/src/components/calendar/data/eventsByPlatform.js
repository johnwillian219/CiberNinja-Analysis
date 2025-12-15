// src/components/calendar/data/eventsByPlatform.js

const eventsByPlatform = {
  YouTube: [
    {
      id: 1,
      date: "2025-12-15",
      title: "Tutorial Avançado de Kali Linux",
      type: "video",
      time: "18:00",
      status: "scheduled",
      isBestTime: true,
      description: "Ferramentas avançadas do Kali",
      platform: "YouTube",
    },
    {
      id: 2,
      date: "2025-12-17",
      title: "Live: Respondendo dúvidas",
      type: "live",
      time: "20:00",
      status: "scheduled",
      description: "Sessão ao vivo",
      platform: "YouTube",
    },
  ],
  TikTok: [
    {
      id: 3,
      date: "2025-12-18",
      title: "Dica rápida: proteger senha",
      type: "short",
      time: "12:00",
      status: "published",
      description: "3 dicas em 60s",
      platform: "TikTok",
    },
  ],
  Instagram: [
    {
      id: 4,
      date: "2025-12-16",
      title: "Reel: Hack do dia",
      type: "reel",
      time: "14:00",
      status: "scheduled",
      description: "Dica rápida de segurança",
      platform: "Instagram",
    },
  ],
  Facebook: [
    {
      id: 5,
      date: "2025-12-19",
      title: "Post: Ferramentas gratuitas",
      type: "post",
      time: "10:00",
      status: "scheduled",
      description: "Lista com links",
      platform: "Facebook",
    },
  ],
};

export default eventsByPlatform;
