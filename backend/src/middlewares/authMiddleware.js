// backend/src/middleware/auth.middleware.js

import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

// ================================
// Middleware 1: Protege rotas gerais (login do teu sistema)
// ================================
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Acesso negado. Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }, // Ajusta se o campo no JWT for diferente (ex: id, sub, userId)
      select: { id: true, email: true, username: true, fullName: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado." });
    }

    req.user = user; // Anexa o usuário autenticado à requisição
    next();
  } catch (error) {
    console.error("Erro no middleware protectRoute:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado." });
    }

    return res.status(401).json({ error: "Token inválido." });
  }
};

// ================================
// Middleware 2: Verifica se o usuário tem conexão ativa com o YouTube
// Usar apenas em rotas que precisam de dados reais (ex: /api/youtube/data)
// ================================
export const requireYouTubeConnection = async (req, res, next) => {
  try {
    const youtubeToken = await prisma.youTubeToken.findUnique({
      where: { userId: req.user.id },
    });

    if (!youtubeToken || !youtubeToken.accessToken) {
      return res.status(403).json({
        error: "Conexão com o YouTube não encontrada.",
        message: "Faça login com o YouTube para acessar dados reais.",
      });
    }

    // Anexa os tokens à requisição para uso no controller
    req.youtubeTokens = youtubeToken;

    next();
  } catch (error) {
    console.error("Erro ao verificar conexão YouTube:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  } finally {
    // Boa prática: fechar conexão em middlewares (especialmente com Neon serverless)
    await prisma.$disconnect();
  }
};
