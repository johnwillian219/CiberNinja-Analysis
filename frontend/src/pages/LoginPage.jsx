// src/pages/LoginPage.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.login({ email, password });
      console.log("Login sucesso:", response); // Para depuração (podes remover depois)

      // Redireciona para o dashboard após sucesso
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err.message);
      setError(
        err.message || "Credenciais inválidas. Verifique email e senha."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
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
            <label className="text-gray-300 text-sm block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
              placeholder="seu@email.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <Link
            to="/forgot-password"
            className="hover:text-purple-400 transition"
          >
            Esqueceu a senha?
          </Link>
          <div className="mt-2">
            Não tem conta?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:underline transition"
            >
              Registre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
