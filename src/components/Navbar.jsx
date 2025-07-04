import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import logoImg from "/logo.png";

const Navbar = ({ toggleChatSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navBg = isHome ? "bg-black text-white" : "bg-white text-black";
  const linkBase = isHome
    ? "text-white hover:text-blue-400"
    : "text-black hover:text-blue-500";
  const btnBase = "bg-blue-500 hover:bg-blue-600 text-white";

  return (
    <nav
      className={`${navBg} px-4 sm:px-6 py-4 flex items-center justify-between shadow-md relative`}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={logoImg} alt="Logo" className="h-20 w-auto" />
      </Link>

      <div className="md:hidden z-20">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className={`${linkBase} font-semibold`}>
          Home
        </Link>
        <Link to="/deposit" className={linkBase}>
          Deposit
        </Link>
        {toggleChatSidebar && (
          <button
            onClick={() => {
              if (
                window.Tawk_API &&
                typeof window.Tawk_API.maximize === "function"
              ) {
                window.Tawk_API.maximize();
              }
            }}
            className={`${linkBase} cursor-pointer`}
          >
            Chat
          </button>
        )}
        {!isLoggedIn && (
          <Link to="/register" className={linkBase}>
            Register
          </Link>
        )}
        {!isLoggedIn ? (
          <Link
            to="/login"
            className={`${btnBase} px-4 py-2 rounded font-semibold`}
          >
            LOGIN
          </Link>
        ) : (
          <>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded font-semibold bg-gray-200 text-black hover:bg-gray-300 hover:cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <FaUserCircle className="text-xl" /> Profile
            </button>
            <button
              className={`${btnBase} px-4 py-2 rounded font-semibold hover:cursor-pointer`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full ${navBg} shadow-md transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          <Link
            to="/"
            className={`${linkBase} text-left w-full font-semibold`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/deposit"
            className={`${linkBase} text-left w-full`}
            onClick={() => setIsOpen(false)}
          >
            Deposit
          </Link>
          {toggleChatSidebar && (
            <button
              onClick={() => {
                if (
                  window.Tawk_API &&
                  typeof window.Tawk_API.maximize === "function"
                ) {
                  window.Tawk_API.maximize();
                }
                setIsOpen(false);
              }}
              className={`${linkBase} text-left w-full cursor-pointer`}
            >
              Chat
            </button>
          )}
          {!isLoggedIn && (
            <Link
              to="/register"
              className={`${linkBase} text-left w-full`}
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          )}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className={`${btnBase} px-4 py-2 rounded font-semibold text-left w-full`}
              onClick={() => setIsOpen(false)}
            >
              LOGIN
            </Link>
          ) : (
            <>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded font-semibold bg-gray-200 text-black hover:bg-gray-300 hover:cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/profile");
                }}
              >
                <FaUserCircle className="text-xl" /> Profile
              </button>
              <button
                className={`${btnBase} px-4 py-2 rounded font-semibold text-left w-full hover:cursor-pointer`}
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
