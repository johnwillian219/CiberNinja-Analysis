// src/components/youtube/YouTubeHeader.jsx
export default function YouTubeHeader() {
  return (
    <div className="mb-8 sm:mb-10 lg:mb-12 text-center lg:text-left">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent mb-3 sm:mb-4">
        YouTube Analytics
      </h1>
      <p className="text-gray-400 text-sm sm:text-base lg:text-xl">
        Análise completa do seu canal • Últimos 30 dias
      </p>
    </div>
  );
}
