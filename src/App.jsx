import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GameRoomPage from './pages/GameRoomPage';
import DepositPage from './pages/DepositPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useState } from 'react';
import ChatSidebar from './pages/ChatSidebar';
import ProfilePage from './pages/ProfilePage';

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  const toggleChatSidebar = () => setIsChatOpen(prev => !prev);

  const showNavbar = location.pathname === "/" || location.pathname === "/game-room" || location.pathname === "/profile" || location.pathname === "/register";

  return (
    <div className="relative">
      {showNavbar && <Navbar toggleChatSidebar={toggleChatSidebar} />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game-room" element={<GameRoomPage />} />
        <Route path="/deposit" element={<DepositPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

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