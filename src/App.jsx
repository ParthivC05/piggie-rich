import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

import CashierLayout from "./cashier/CashierLayout";
import CashierUserList from "./cashier/UserList";
import CashierUserDetails from "./cashier/CashierUserDetails";
import CashierTransactions from "./cashier/Transactions";

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const isAdminPanel = location.pathname.startsWith("/admin");

  const toggleChatSidebar = () => setIsChatOpen((prev) => !prev);

  useEffect(() => {
    // Don't load chat in admin panel, login, or register pages
    const noChatPages = ['/admin', '/login', '/register'];
    const shouldLoadChat = !noChatPages.some(page => location.pathname.startsWith(page));
    
    let script = null;

    if (shouldLoadChat) {
      // Check if script already exists to avoid duplicates
      const existingScript = document.querySelector('script[src*="tawk.to"]');
      if (!existingScript) {
        script = document.createElement("script");
        script.src = "https://embed.tawk.to/6864c5d5988cbd190bbeb076/1iv4q9ion";
        script.async = true;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.body.appendChild(script);
      }

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
    }

    return () => {
      // Only remove the script we created in this effect
      if (script && script.parentNode) {
        try {
          script.parentNode.removeChild(script);
        } catch (error) {
          // Script might have been removed by another effect or doesn't exist
          console.log("Script cleanup: Script already removed or doesn't exist");
        }
      }
    };
  }, [location.pathname]);

  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/game-room" ||
    location.pathname === "/profile" ||
    location.pathname === "/register" ||
    location.pathname === "/login" ||
    location.pathname === "/terms" ||
    location.pathname === "/privacy";

  const showFooter =
    location.pathname === "/" ||
    location.pathname === "/game-room" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/terms" ||
    location.pathname === "/privacy";

  // Don't show chat on admin, login, or register pages
  const noChatPages = ['/admin', '/login', '/register'];
  const shouldShowChat = !noChatPages.some(page => location.pathname.startsWith(page));

  return (
    <div className="relative">
      {showNavbar && <Navbar toggleChatSidebar={shouldShowChat ? toggleChatSidebar : null} />}

      <Routes>
        {/* Public Routes - No Login Required */}
        <Route path="/" element={<HomePage />} />
        <Route path="/game-room" element={<GameRoomPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes - Login Required */}
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

       
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
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

        <Route path="/cashier" element={<CashierLayout />}>
          <Route path="users" element={<CashierUserList />} />
          <Route path="users/:id" element={<CashierUserDetails />} />
          <Route path="transactions" element={<CashierTransactions />} />
        </Route>

      </Routes>

      {showFooter && <Footer />}

    
      {shouldShowChat && isChatOpen && (
        <ChatSidebar onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;