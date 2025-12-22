// frontend/src/pages/YouTubeCallbackPage.jsx

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Youtube, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function YouTubeCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshYouTubeStatus } = useAuth();

  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState(
    "Processando conexão com o YouTube..."
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const connected = params.get("connected");
    const error = params.get("error");

    if (connected === "true") {
      setStatus("success");
      setMessage("Conexão com o YouTube realizada com sucesso!");

      // Atualiza o status no contexto
      refreshYouTubeStatus();

      // Redireciona após 3 segundos
      setTimeout(() => {
        navigate("/youtube", { replace: true });
      }, 3000);
    } else if (error) {
      setStatus("error");
      setMessage("Falha na conexão com o YouTube. Tente novamente.");

      setTimeout(() => {
        navigate("/youtube", { replace: true });
      }, 5000);
    } else {
      setStatus("error");
      setMessage("Parâmetros inválidos. Redirecionando...");

      setTimeout(() => {
        navigate("/youtube", { replace: true });
      }, 3000);
    }
  }, [location, navigate, refreshYouTubeStatus]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-full border-2 border-red-500/50 mb-6">
            <Youtube className="w-12 h-12 text-red-400" />
          </div>

          {status === "processing" && (
            <>
              <Loader className="w-16 h-16 text-red-400 animate-spin mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-3">
                Conectando...
              </h2>
              <p className="text-gray-400">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-3">Sucesso!</h2>
              <p className="text-emerald-300 text-lg">{message}</p>
              <p className="text-gray-400 text-sm mt-6">
                Redirecionando para o dashboard em 3 segundos...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-3">
                Erro na conexão
              </h2>
              <p className="text-red-300 text-lg">{message}</p>
              <p className="text-gray-400 text-sm mt-6">
                Você será redirecionado em alguns segundos.
              </p>
              <button
                onClick={() => navigate("/youtube")}
                className="mt-8 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
              >
                Voltar agora
              </button>
            </>
          )}
        </div>

        <div className="pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            Seus dados são acessados com segurança via Google OAuth.
          </p>
        </div>
      </div>
    </div>
  );
}
