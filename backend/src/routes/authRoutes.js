// backend/src/routes/authRoutes.js
import { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
} from "../controllers/authController.js"; // ← adiciona updateProfile
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protectRoute, getCurrentUser);
router.put("/me", protectRoute, updateProfile); // ← NOVA ROTA PARA ATUALIZAR

export default router;
