// backend/src/controllers/youtube.controller.js

import oauth2Client, {
  generateAuthUrl,
  YOUTUBE_SCOPES,
} from "../utils/googleClient.js";
import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";

const prisma = new PrismaClient();

// ================================
// 1. Iniciar login com YouTube
// ================================
export const startYouTubeLogin = async (req, res) => {
  try {
    const userId = req.user.id;

    const authUrl = generateAuthUrl(userId);

    res.json({ authUrl });
  } catch (error) {
    console.error("Erro ao gerar URL de login YouTube:", error);
    res.status(500).json({ error: "Falha ao iniciar login com YouTube." });
  }
};

// ================================
// 2. Callback do Google OAuth
// ================================
export const youtubeCallback = async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    return res.status(400).json({ error: "Código ou estado ausente." });
  }

  let userId;
  try {
    const parsedState = JSON.parse(state);
    userId = parsedState.userId;
  } catch (error) {
    return res.status(400).json({ error: "Estado inválido." });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    await prisma.youTubeToken.upsert({
      where: { userId: userId },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || undefined,
        expiryDate: tokens.expiry_date ? BigInt(tokens.expiry_date) : undefined,
        scope: tokens.scope || YOUTUBE_SCOPES.join(" "),
        tokenType: tokens.token_type,
        idToken: tokens.id_token || undefined,
        updatedAt: new Date(),
      },
      create: {
        userId: userId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || undefined,
        expiryDate: tokens.expiry_date ? BigInt(tokens.expiry_date) : undefined,
        scope: tokens.scope || YOUTUBE_SCOPES.join(" "),
        tokenType: tokens.token_type,
        idToken: tokens.id_token || undefined,
      },
    });

    res.redirect(`${process.env.FRONTEND_URL}/youtube?connected=true`);
  } catch (error) {
    console.error("Erro no callback YouTube:", error);
    res.redirect(`${process.env.FRONTEND_URL}/youtube?error=auth_failed`);
  }
};

// ================================
// 3. Buscar dados reais da Analytics API
// ================================
export const getYouTubeData = async (req, res) => {
  try {
    const tokens = req.youtubeTokens;

    // Configura o cliente com os tokens salvos
    oauth2Client.setCredentials({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken || undefined,
      expiry_date: tokens.expiryDate ? Number(tokens.expiryDate) : undefined,
    });

    // Renova automaticamente se necessário — CORRIGIDO
    try {
      const { token: newAccessToken, res: refreshResponse } =
        await oauth2Client.getAccessToken();

      if (newAccessToken) {
        await prisma.youTubeToken.update({
          where: { userId: req.user.id },
          data: {
            accessToken: newAccessToken,
            expiryDate: refreshResponse?.expiry_date
              ? BigInt(refreshResponse.expiry_date)
              : undefined,
          },
        });
        // Atualiza o cliente com o novo token
        oauth2Client.setCredentials({ access_token: newAccessToken });
      }
    } catch (refreshError) {
      console.warn(
        "Token não foi renovado (pode estar válido ainda):",
        refreshError.message
      );
      // Continua com o token atual – não é erro fatal
    }

    const youtubeAnalytics = google.youtubeAnalytics({
      version: "v2",
      auth: oauth2Client,
    });

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const response = await youtubeAnalytics.reports.query({
      ids: "channel==MINE",
      startDate: thirtyDaysAgo.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
      metrics:
        "views,estimatedMinutesWatched,subscribersGained,subscribersLost,likes,comments,shares",
      dimensions: "day",
      sort: "day",
    });

    const data = response.data;

    res.json({
      success: true,
      data: data.rows || [],
      headers: data.columnHeaders || [],
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro ao buscar dados YouTube Analytics:", error);

    if (error.response?.data) {
      console.error("Detalhes do erro Google:", error.response.data);
    }

    res.status(500).json({
      error: "Falha ao buscar dados do YouTube.",
      message: error.message,
    });
  }
};

// ================================
// 4. Desconectar do YouTube
// ================================
export const disconnectYouTube = async (req, res) => {
  try {
    const userId = req.user.id;

    await prisma.youTubeToken.delete({
      where: { userId },
    });

    res.json({
      success: true,
      message: "Desconectado do YouTube com sucesso.",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(400)
        .json({ error: "Nenhuma conexão com YouTube encontrada." });
    }

    console.error("Erro ao desconectar YouTube:", error);
    res.status(500).json({ error: "Falha ao desconectar." });
  }
};

// ================================
// 5. Verificar status da conexão
// ================================
export const getYouTubeConnectionStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const tokenRecord = await prisma.youTubeToken.findUnique({
      where: { userId },
    });

    if (!tokenRecord) {
      return res.json({ connected: false });
    }

    res.json({
      connected: true,
      scopes: tokenRecord.scope.split(" "),
      updatedAt: tokenRecord.updatedAt,
    });
  } catch (error) {
    console.error("Erro ao verificar status:", error);
    res.status(500).json({ error: "Erro interno." });
  }
};
