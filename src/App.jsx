import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GameRoomPage from "./pages/GameRoomPage";
import DepositPage from "./pages/DepositPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import ChatSidebar from "./pages/ChatSidebar";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import TermsAndConditions from "./pages/TermsPage";
import PrivacyPolicy from "./pages/PrivacyPage";
import ProtectedRoute from "./components/ProtectedRoute";

// --- Admin Dashboard import ---
import AdminDashboard from "./admin/pages/Dashboard";

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const toggleChatSidebar = () => setIsChatOpen((prev) => !prev);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/6864c5d5988cbd190bbeb076/1iv4q9ion";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    const setupTawkListeners = () => {
      if (window.Tawk_API) {
        window.Tawk_API.onChatStarted = function () {
          console.log("Chat started!");
        };
        window.Tawk_API.onChatEnded = function () {
          console.log("Chat ended!");
        };
        window.Tawk_API.onMessageReceived = function (message) {
          console.log("Message received from agent:", message);
        };
      } else {
        setTimeout(setupTawkListeners, 500);
      }
    };
    setupTawkListeners();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/game-room" ||
    location.pathname === "/profile" ||
    location.pathname === "/register" ||
    location.pathname === "/terms" ||
    location.pathname === "/privacy";

  const showFooter =
    location.pathname === "/" ||
    location.pathname === "/game-room" ||
    location.pathname === "/terms" ||
    location.pathname === "/privacy";

  return (
    <div className="relative">
      {showNavbar && <Navbar toggleChatSidebar={toggleChatSidebar} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-room" element={<GameRoomPage />} />

        <Route
          path="/deposit"
          element={
            <ProtectedRoute>
              <DepositPage />
            </ProtectedRoute>
          }
        />

        {/* --- Admin Dashboard Route --- */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>

      {showFooter && <Footer />}

      {isChatOpen && <ChatSidebar onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;