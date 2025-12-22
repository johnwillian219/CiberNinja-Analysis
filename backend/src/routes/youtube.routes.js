// backend/src/routes/youtube.routes.js

import express from "express";
import {
  startYouTubeLogin,
  youtubeCallback,
  getYouTubeData,
  disconnectYouTube,
  getYouTubeConnectionStatus,
} from "../controllers/youtube.controller.js";
import {
  protectRoute,
  requireYouTubeConnection,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// ================================
// 1. Iniciar o fluxo de login com YouTube
// Protegido: usuário precisa estar logado no teu sistema
// ================================
router.get("/login", protectRoute, startYouTubeLogin);

// ================================
// 2. Callback do Google (público - não precisa de JWT)
// Esta rota recebe o code do Google e salva os tokens
// ================================
router.get("/callback", youtubeCallback);

// ================================
// 3. Buscar dados reais da Analytics API
// Protegido + precisa de conexão ativa com YouTube
// ================================
router.get("/data", protectRoute, requireYouTubeConnection, getYouTubeData);

// ================================
// 4. Verificar status da conexão com YouTube
// Protegido: só retorna se está conectado ou não
// ================================
router.get("/status", protectRoute, getYouTubeConnectionStatus);

// ================================
// 5. Desconectar do YouTube (remove tokens)
// Protegido
// ================================
router.post("/disconnect", protectRoute, disconnectYouTube);

export default router;
