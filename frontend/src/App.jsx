import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPage from "./pages/RegisterPage";
import InsightsPage from "./pages/InsightsPage";
import SettingsPage from "./pages/SettingsPage";
import LogoutPage from "./pages/LogoutPage";
import ProfilePage from "./pages/ProfilePage";
import YouTubePage from "./pages/YouTubePage";
import TikTokPage from "./pages/TikTokPage";
import InstagramPage from "./pages/InstagramPage";
import FacebookPage from "./pages/FacebookPage";
import MonetizationPage from "./pages/MonetizationPage";
import FacebookMonetizationPage from "./pages/monetization/FacebookMonetizationPage";
import InstagramMonetizationPage from "./pages/monetization/InstagramMonetizationPage";
import YouTubeMonetizationPage from "./pages/monetization/YouTubeMonetizationPage";
import TikTokMonetizationPage from "./pages/monetization/TikTokMonetizationPage";
import LabPage from "./pages/LabPage";
import LibraryPage from "./pages/LibraryPage";
import CalendarPage from "./pages/CalendarPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/ai-insights" element={<InsightsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/youtube" element={<YouTubePage />} />
        <Route path="/tiktok" element={<TikTokPage />} />
        <Route path="/instagram" element={<InstagramPage />} />
        <Route path="/facebook" element={<FacebookPage />} />
        <Route path="/monetization" element={<MonetizationPage />} />
        <Route path="/library" element={<LibraryPage />} />

        <Route
          path="/monetization/facebook"
          element={<FacebookMonetizationPage />}
        />
        <Route
          path="/monetization/instagram"
          element={<InstagramMonetizationPage />}
        />
        <Route
          path="/monetization/youtube"
          element={<YouTubeMonetizationPage />}
        />
        <Route
          path="/monetization/tiktok"
          element={<TikTokMonetizationPage />}
        />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
}
