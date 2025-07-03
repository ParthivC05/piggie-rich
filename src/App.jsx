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

// --- Admin Panel imports ---
import AdminDashboard from "./admin/pages/Dashboard";
import UserList from "./admin/pages/UserList";
import UserDetail from "./admin/pages/UserDetails";
import Transactions from "./admin/pages/Transaction";
import CMS from "./admin/pages/CMS";
import AccessControl from "./admin/pages/AccessControl";

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const isAdminPanel = location.pathname.startsWith("/admin");

  const toggleChatSidebar = () => setIsChatOpen((prev) => !prev);

  useEffect(() => {
    if (isAdminPanel) return; // Don't load chat in admin panel

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
  }, [isAdminPanel]);

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
        {/* User routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game-room"
          element={
            <ProtectedRoute>
              <GameRoomPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deposit"
          element={
            <ProtectedRoute>
              <DepositPage />
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

        {/* --- Admin Panel Routes --- */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cms"
          element={
            <ProtectedRoute>
              <CMS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/access-control"
          element={
            <ProtectedRoute>
              <AccessControl />
            </ProtectedRoute>
          }
        />

        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>

      {showFooter && <Footer />}

      {/* Only show chat sidebar if not in admin panel */}
      {!isAdminPanel && isChatOpen && (
        <ChatSidebar onClose={() => setIsChatOpen(false)} />
      )}
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