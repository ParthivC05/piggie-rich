import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GameRoomPage from "./pages/GameRoomPage";
import DepositPage from "./pages/DepositPage";
import LoginPage from "./pages/LoginPage";
import ForgotPage from "./pages/ForgotPass";
import ResetPassPage from "./pages/ResetPass";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import TermsAndConditions from "./pages/TermsPage";
import PrivacyPolicy from "./pages/PrivacyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AllGames from "./pages/AllGames";
import NewGames from "./pages/NewGames";
import OnlineGames from "./pages/OnlineGames";
import AboutUs from "./pages/AboutUs";
import CasinoPlatform from "./pages/CasinoPlatform";
import GameStudio from "./pages/GameStudio";
import LandBased from "./pages/LandBased";
import AdminProfile from "./admin/pages/AdminProfile";

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
import EditUser from "./admin/pages/EditUser";



function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const isAdminPanel = location.pathname.startsWith("/admin");

  const toggleChatSidebar = () => setIsChatOpen((prev) => !prev);

  useEffect(() => {
    const noChatPages = ["/admin", "/cashier", "/login", "/register", "/forgotPass", "/reset-password"];
    const shouldLoadChat = !noChatPages.some((page) =>
      location.pathname.startsWith(page)
    );

    let script = null;

    if (shouldLoadChat) {
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
      if (script && script.parentNode) {
        try {
          script.parentNode.removeChild(script);
        } catch (error) {
          console.log(
            "Script cleanup: Script already removed or doesn't exist"
          );
        }
      }
    };
  }, [location.pathname]);

  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/game-room" ||
    location.pathname === "/profile" ||
    location.pathname === "/register" ||
    location.pathname === "/terms" ||
    location.pathname === "/privacy" ||
    location.pathname==="/about"||
    location.pathname==="/games"||
    location.pathname==="/new-games"||
    location.pathname==="/online-games"||
    location.pathname==="/land-based"||
    location.pathname==="/casino-platform"||
    location.pathname==="/game-studio";

  const showFooter =
    location.pathname === "/" ||
    location.pathname === "/game-room" ||
    location.pathname === "/register" ||
    location.pathname === "/terms" ||
    location.pathname === "/privacy"||
    location.pathname==="/about"||
    location.pathname==="/games"||
    location.pathname==="/new-games"||
    location.pathname==="/online-games"||
    location.pathname==="/land-based"||
    location.pathname==="/casino-platform"||
    location.pathname==="/game-studio";

  const noChatPages = ["/admin", "/cashier", "/login", "/register", "/forgotPass", "/reset-password"];
  const shouldShowChat = !noChatPages.some((page) =>
    location.pathname.startsWith(page)
  );

  return (
    <div className="relative">
      {showNavbar && (
        <Navbar toggleChatSidebar={shouldShowChat ? toggleChatSidebar : null} />
      )}

      <Routes>
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
          path="/terms"
          element={
            <ProtectedRoute>
              <TermsAndConditions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacy"
          element={
            <ProtectedRoute>
              <PrivacyPolicy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/games"
          element={
            <ProtectedRoute>
              < AllGames/>
            </ProtectedRoute>
          }
        />
          <Route
          path="/new-games"
          element={
            <ProtectedRoute>
              < NewGames/>
            </ProtectedRoute>
          }
        />

          <Route
          path="/online-games"
          element={
            <ProtectedRoute>
              < OnlineGames/>
            </ProtectedRoute>
          }
        />
          <Route
          path="/land-based"
          element={
            <ProtectedRoute>
              < LandBased/>
            </ProtectedRoute>
          }
        />
          <Route
          path="/about"
          element={
            <ProtectedRoute>
              < AboutUs/>
            </ProtectedRoute>
          }
        />
        
         <Route
          path="/casino-platform"
          element={
            <ProtectedRoute>
              < CasinoPlatform/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/game-studio"
          element={
            <ProtectedRoute>
              < GameStudio/>
            </ProtectedRoute>
          }
        />
        
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotPass" element={<ForgotPage />} />
        <Route path="/reset-password/:token" element={<ResetPassPage />} />
        <Route path="/register" element={<RegisterPage />} />
     

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
          path="/admin/details"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id/edit"
          element={
            <ProtectedRoute>
              <EditUser />
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
         <Route
          path="/admin/adminprofile"
          element={
            <ProtectedRoute>
              <AdminProfile/>
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
