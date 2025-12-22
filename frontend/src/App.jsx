// src/App.jsx

import { HashRouter, Routes, Route } from "react-router-dom";
import { EventsProvider } from "./components/calendar/context/EventsContext";
import { AuthProvider } from "./context/AuthContext";

// Componente de proteção de rotas
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Páginas
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPage from "./pages/RegisterPage";
import InsightsPage from "./pages/InsightsPage";
import SettingsPage from "./pages/SettingsPage";
import LogoutPage from "./pages/LogoutPage";
import ProfilePage from "./pages/ProfilePage";
import YouTubePage from "./pages/YouTubePage";
import YouTubeCallbackPage from "./pages/YouTubeCallbackPage";
import TikTokPage from "./pages/TikTokPage";
import InstagramPage from "./pages/InstagramPage";
import FacebookPage from "./pages/FacebookPage";
import MonetizationPage from "./pages/MonetizationPage";
import FacebookMonetizationPage from "./pages/monetization/FacebookMonetizationPage";
import InstagramMonetizationPage from "./pages/monetization/InstagramMonetizationPage";
import YouTubeMonetizationPage from "./pages/monetization/YouTubeMonetizationPage";
import TikTokMonetizationPage from "./pages/monetization/TikTokMonetizationPage";
import LabPage from "./pages/LabPage";
//import LibraryPage from "./pages/LibraryPage";
import CalendarPage from "./pages/CalendarPage";
import SchedulingPage from "./pages/SchedulingPage";

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <EventsProvider>
          <Routes>
            {/* =================================== */}
            {/* ROTAS PÚBLICAS - Não precisam de login */}
            {/* =================================== */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/logout" element={<LogoutPage />} />

            {/* Callback do OAuth do YouTube - deve ser público */}
            <Route path="/youtube-callback" element={<YouTubeCallbackPage />} />

            {/* =================================== */}
            {/* ROTAS PROTEGIDAS - Exigem login no sistema */}
            {/* =================================== */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ai-insights"
              element={
                <ProtectedRoute>
                  <InsightsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Plataformas principais */}
            <Route
              path="/youtube"
              element={
                <ProtectedRoute>
                  <YouTubePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tiktok"
              element={
                <ProtectedRoute>
                  <TikTokPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/instagram"
              element={
                <ProtectedRoute>
                  <InstagramPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/facebook"
              element={
                <ProtectedRoute>
                  <FacebookPage />
                </ProtectedRoute>
              }
            />

            {/* Monetização */}
            <Route
              path="/monetization"
              element={
                <ProtectedRoute>
                  <MonetizationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/monetization/facebook"
              element={
                <ProtectedRoute>
                  <FacebookMonetizationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/monetization/instagram"
              element={
                <ProtectedRoute>
                  <InstagramMonetizationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/monetization/youtube"
              element={
                <ProtectedRoute>
                  <YouTubeMonetizationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/monetization/tiktok"
              element={
                <ProtectedRoute>
                  <TikTokMonetizationPage />
                </ProtectedRoute>
              }
            />

            {/* Outras páginas protegidas */}
            {/* <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              }
            />*/}

            <Route
              path="/lab"
              element={
                <ProtectedRoute>
                  <LabPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/scheduling"
              element={
                <ProtectedRoute>
                  <SchedulingPage />
                </ProtectedRoute>
              }
            />

            {/* Opcional: Página não encontrada */}
            {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
          </Routes>
        </EventsProvider>
      </AuthProvider>
    </HashRouter>
  );
}
