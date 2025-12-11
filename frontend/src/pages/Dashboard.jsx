// src/pages/DashboardPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Mensagem de boas-vindas temporária */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">
          Bem-vindo de volta, CiberNinja! 🗡️
        </h2>
        <p className="text-gray-400">
          Aqui está a visão geral das suas redes sociais nos últimos 30 dias.
        </p>
      </div>

      {/* Placeholder para os cards das plataformas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-gray-700 rounded-full mb-4 animate-pulse"></div>
            <h3 className="text-xl font-semibold mb-2">Plataforma {i}</h3>
            <p className="text-3xl font-bold text-gray-500">—</p>
            <p className="text-gray-400 mt-2">Carregando dados...</p>
          </div>
        ))}
      </div>

      {/* Seção de gráficos placeholder */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-6">Crescimento das Redes</h3>
        <div className="h-80 bg-gray-700/50 rounded-lg animate-pulse"></div>
      </div>
    </DashboardLayout>
  );
}
