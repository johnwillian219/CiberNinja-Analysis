// backend/src/utils/googleClient.js

import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Configuração centralizada do OAuth2Client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Scopes necessários para o YouTube Analytics e dados do canal
export const YOUTUBE_SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly", // Informações do canal e vídeos
  "https://www.googleapis.com/auth/yt-analytics.readonly", // Dados de analytics (views, watch time, etc.)
  "https://www.googleapis.com/auth/yt-analytics-monetary.readonly", // Opcional: dados de monetização
];

// Função auxiliar para gerar a URL de autenticação
export function generateAuthUrl(userId) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline", // Obrigatório para receber refresh_token
    prompt: "consent", // Força a tela de consentimento (garante refresh_token na primeira vez)
    scope: YOUTUBE_SCOPES,
    state: JSON.stringify({ userId }), // Passamos o ID do usuário de forma segura
    include_granted_scopes: true,
  });
}

// Exportamos a instância configurada para uso nos controllers
export default oauth2Client;
