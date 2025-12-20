// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "chave_super_secreta_temporaria";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Acesso negado. Token não fornecido." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, username: true, fullName: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Token inválido." });
    }

    req.user = user; // Adiciona o usuário ao request
    next();
  } catch (error) {
    console.error("Erro no middleware de auth:", error);
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
