// src/components/tiktok/TikTokHeader.jsx
export default function TikTokHeader() {
  return (
    <div className="mb-8 sm:mb-10 lg:mb-12 text-center lg:text-left">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
        TikTok Analytics
      </h1>
      <p className="text-gray-400 text-sm sm:text-base lg:text-xl">
        Análise completa do seu perfil • Últimos 30 dias
      </p>
    </div>
  );
}
