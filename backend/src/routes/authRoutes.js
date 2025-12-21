// backend/src/routes/authRoutes.js
import { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  deleteAccount,
  changePassword, // ← ADICIONA ESTA LINHA
} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

// Rotas públicas
router.post("/register", register);
router.post("/login", login);

// Rotas protegidas
router.get("/me", protectRoute, getCurrentUser);
router.put("/me", protectRoute, updateProfile);
router.delete("/me", protectRoute, deleteAccount);
router.post("/change-password", protectRoute, changePassword); // ← ROTA CORRETA

export default router;
