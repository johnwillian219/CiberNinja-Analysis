// src/pages/LoginPage.jsx
import { Link, useNavigate } from "react-router-dom"; // Adicione useNavigate
import { useState } from "react";
import WelcomeModal from "../components/Modal/WelcomeModal"; // Ajuste o caminho

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const navigate = useNavigate(); // Para redirecionamento manual (opcional)

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    // Simulação de login bem-sucedido
    console.log("Login enviado:", { email, password });
    setError("");

    // Mostra o modal de boas-vindas
    setShowWelcomeModal(true);

    // O redirecionamento acontece automaticamente no modal após 5s
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            CiberNinja 🔐
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Acesse o painel de desempenho
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <input
                type="email"
                className="w-full mt-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Senha</label>
              <input
                type="password"
                className="w-full mt-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-2 text-sm text-gray-400">
            <Link
              to="/forgot-password"
              className="hover:text-blue-400 transition"
            >
              Esqueceu a senha?
            </Link>

            <div className="flex gap-1">
              <span>Não tem conta?</span>
              <Link to="/register" className="text-blue-400 hover:underline">
                Registre-se
              </Link>
            </div>
          </div>

          <p className="text-gray-500 text-center text-xs mt-6">
            © {new Date().getFullYear()} CiberNinja – Todos os direitos
            reservados
          </p>
        </div>
      </div>

      {/* Modal de Boas-vindas */}
      <WelcomeModal isOpen={showWelcomeModal} userEmail={email} />
    </>
  );
}
