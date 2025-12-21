// backend/src/controllers/authController.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "chave_super_secreta_temporaria";

// ========================
// REGISTER
// ========================
export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      fullName,
      displayName,
      username,
      profession,
      website,
      location,
      bio,
      profilePhoto,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: "Este email já está em uso" });
    }

    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUsername) {
        return res.status(400).json({ error: "Este username já está em uso" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        displayName: displayName || fullName,
        username,
        profession,
        website,
        location,
        bio,
        profilePhoto: profilePhoto || null,
      },
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Usuário criado com sucesso",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        displayName: user.displayName,
        username: user.username,
        profession: user.profession,
        website: user.website,
        location: user.location,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Erro no register:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// ========================
// LOGIN
// ========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Atualiza o último acesso
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login bem-sucedido",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        displayName: user.displayName,
        username: user.username,
        profession: user.profession,
        website: user.website,
        location: user.location,
        bio: user.bio,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
        lastLogin: new Date(), // atualizado agora
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// ========================
// GET CURRENT USER (ME)
// ========================
export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        displayName: true,
        username: true,
        profession: true,
        website: true,
        location: true,
        bio: true,
        profilePhoto: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// ========================
// UPDATE PROFILE (PUT /me)
// ========================
export const updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      displayName,
      username,
      profession,
      website,
      location,
      bio,
      profilePhoto,
    } = req.body;

    if (username && username !== req.user.username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUsername) {
        return res.status(400).json({ error: "Este username já está em uso" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        fullName,
        displayName,
        username,
        profession,
        website,
        location,
        bio,
        profilePhoto: profilePhoto ?? undefined,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        displayName: true,
        username: true,
        profession: true,
        website: true,
        location: true,
        bio: true,
        profilePhoto: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    res.status(500).json({ error: "Erro ao salvar perfil" });
  }
};

// ========================
// CHANGE PASSWORD (POST /change-password)
// ========================
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Senhas são obrigatórias" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Senha atual incorreta" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Nova senha deve ter pelo menos 6 caracteres" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedNewPassword },
    });

    res.json({ message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    res.status(500).json({ error: "Erro ao alterar senha" });
  }
};

// ========================
// DELETE ACCOUNT (DELETE /me)
// ========================
export const deleteAccount = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.user.id },
    });

    res.status(200).json({ message: "Conta eliminada com sucesso" });
  } catch (error) {
    console.error("Erro ao eliminar conta:", error);
    res.status(500).json({ error: "Erro ao eliminar conta" });
  }
};
