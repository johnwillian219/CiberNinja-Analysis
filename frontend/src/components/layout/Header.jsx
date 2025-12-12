// src/components/layout/Header.jsx
import { RefreshCw, Settings } from "lucide-react";
import { useState } from "react";

// Função para gerar cor consistente a partir do email (sempre a mesma cor pro mesmo usuário)
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

// Exemplo de usuário (substitua pelo seu contexto/auth depois)
const user = {
  name: "CiberNinja",
  email: "admin@ciberninja.com.br", // ← muda isso que a cor muda automaticamente
};

export default function Header() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000); // simula atualização
  };

  const firstLetter = user.email.charAt(0).toUpperCase();
  const avatarBgColor = stringToColor(user.email);

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 lg:px-8 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Título e subtítulo */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
          Visão Geral da CiberNinja
        </h1>
        <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          Últimos 30 dias • Dados atualizados automaticamente
        </p>
      </div>

      {/* Botões de ação */}
      <div className="flex items-center gap-3">
        {/* Botão Atualizar */}
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all text-sm font-medium text-gray-100 group"
          aria-label="Atualizar dados"
        >
          <RefreshCw
            size={18}
            className={`transition-transform duration-700 ${
              isRefreshing ? "rotate-180" : ""
            } group-hover:rotate-180`}
          />
          Atualizar dados
        </button>

        {/* Avatar com inicial do email + cor aleatória */}
        <button
          className="relative p-0.5 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 shadow-lg hover:scale-105 transition-transform"
          aria-label="Configurações do usuário"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner"
            style={{ backgroundColor: avatarBgColor }}
            //rediciona para /settings ao clicar
            onClick={() => (window.location.href = "/profile")}
          >
            {firstLetter}
          </div>
          {/* Pequeno glow neon (opcional, mas fica foda) */}
          <div className="absolute inset-0 rounded-full blur-lg bg-gradient-to-tr from-emerald-500/30 to-cyan-400/30 -z-10"></div>
        </button>
      </div>
    </header>
  );
}
