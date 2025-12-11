import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Insira o seu email!");
      return;
    }

    setError("");
    setMessage("Enviamos um link de recuperação para o seu email.");
    console.log("Solicitada recuperação para:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Recuperar Senha 🔑
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Insira seu email para receber um link de redefinição
        </p>

        <form onSubmit={handleReset} className="space-y-5">
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

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {message && (
            <p className="text-green-400 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Enviar Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-gray-400 hover:text-blue-400 text-sm transition"
          >
            Voltar ao Login
          </Link>
        </div>

        <p className="text-gray-500 text-center text-xs mt-6">
          © {new Date().getFullYear()} CiberNinja – Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
