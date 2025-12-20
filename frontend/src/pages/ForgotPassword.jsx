// src/pages/ForgotPassword.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!email) {
      setError("Insira o teu email!");
      setLoading(false);
      return;
    }

    try {
      // Simulação de envio (depois conectas ao backend real)
      console.log("Enviando link de recuperação para:", email);

      // Simula delay de envio
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage("Link de recuperação enviado! Verifica o teu email 📧");
    } catch (err) {
      setError("Erro ao enviar email. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Recuperar Senha 🔑
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Insira o teu email para receber o link de redefinição
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-400 text-center">{error}</p>}
          {message && (
            <p className="text-green-400 text-center font-medium">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-70"
          >
            {loading ? "Enviando..." : "Enviar Link de Recuperação"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          <Link to="/login" className="text-purple-400 hover:underline">
            ← Voltar ao Login
          </Link>
        </div>

        <p className="text-gray-500 text-center text-xs mt-8">
          © 2025 CiberNinja – Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
