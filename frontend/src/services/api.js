// frontend/src/services/api.js

// URL base da API
// Em produção: usa a variável de ambiente definida no Netlify
// Em desenvolvimento: fallback para localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiService {
  token = localStorage.getItem("token") || null;

  setToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
    };
  }

  async request(endpoint, options = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
      credentials: "include", // IMPORTANTE para cookies (caso use sessões ou Google OAuth)
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = { error: "Resposta inválida do servidor" };
    }

    if (!res.ok) {
      throw new Error(data.error || data.message || `Erro HTTP ${res.status}`);
    }

    return data;
  }

  // ================================
  // Auth
  // ================================
  async register(userData) {
    const data = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    this.setToken(data.token);
    return data;
  }

  async login({ email, password }) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    return data;
  }

  logout() {
    this.removeToken();
  }

  // ================================
  // YouTube
  // ================================
  async startYouTubeLogin() {
    return await this.request("/youtube/login");
  }

  async getYouTubeStatus() {
    return await this.request("/youtube/status");
  }

  async getYouTubeData() {
    return await this.request("/youtube/data");
  }

  async disconnectYouTube() {
    return await this.request("/youtube/disconnect", {
      method: "POST",
    });
  }

  async getUserProfile() {
    return await this.request("/auth/me");
  }
}

export default new ApiService();
