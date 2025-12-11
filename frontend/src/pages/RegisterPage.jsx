// src/pages/RegisterPage.jsx (ou onde estiver)
import { Link } from "react-router-dom";
import { useState } from "react";
import SuccessModal from "../components/Modal/SuccessModal"; // Ajuste o caminho se necessário

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Novo estado

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    // Simula criação da conta com sucesso
    console.log("Registro enviado:", { email, password });
    setError("");
    setShowSuccessModal(true); // Mostra o modal
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Criar Conta 🚀
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Registre-se para acessar o painel CiberNinja
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* ... seus inputs iguais ... */}
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

            <div>
              <label className="text-gray-300 text-sm">Confirmar Senha</label>
              <input
                type="password"
                className="w-full mt-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Criar Conta
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-2 text-sm text-gray-400">
            <div className="flex gap-1">
              <span>Já tem conta?</span>
              <Link to="/login" className="text-blue-400 hover:underline">
                Faça Login
              </Link>
            </div>
          </div>

          <p className="text-gray-500 text-center text-xs mt-6">
            © {new Date().getFullYear()} CiberNinja – Todos os direitos
            reservados
          </p>
        </div>
      </div>

      {/* Modal de sucesso */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
}
