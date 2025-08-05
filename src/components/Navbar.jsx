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

  const linkBase = "uppercase text-white hover:text-yellow-400 font-semibold";
  const activeLink = "text-yellow-400";
  const btnBase =
    "bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold uppercase px-6 py-2 rounded-full shadow";

  return (
    <nav className="bg-black text-white px-4 sm:px-6 py-4 flex items-center justify-between z-50">
      <Link to="/" className="flex items-center gap-2">
        <img src={logoImg} alt="Logo" className="h-20 w-auto" />
      </Link>

      <div className="md:hidden z-20">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? (
            <FaTimes className="text-2xl text-white" />
          ) : (
            <FaBars className="text-2xl text-white" />
          )}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className={`${linkBase} ${
            location.pathname === "/" ? activeLink : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/deposit"
          className={`${linkBase} ${
            location.pathname === "/deposit" ? activeLink : ""
          }`}
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
            }}
            className={linkBase}
          >
            Chat
          </button>
        )}
        {!isLoggedIn && (
          <Link
            to="/register"
            className={`${linkBase} ${
              location.pathname === "/register" ? activeLink : ""
            }`}
          >
            Register
          </Link>
        )}
        {!isLoggedIn ? (
          <Link to="/login" className={btnBase}>
            Login
          </Link>
        ) : (
          <>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded font-semibold bg-gray-200 text-black hover:bg-gray-300 hover:cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <FaUserCircle className="text-xl" /> Profile
            </button>
            <button className={btnBase} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      <div
           className={`
    md:hidden fixed top-0 left-0 z-40 h-full w-64 p-5 text-white bg-black overflow-y-auto
    transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static md:min-h-screen
  `}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          <Link
            to="/"
            className={`${linkBase} text-left w-full ${
              location.pathname === "/" ? activeLink : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/deposit"
            className={`${linkBase} text-left w-full ${
              location.pathname === "/deposit" ? activeLink : ""
            }`}
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
              className={`${linkBase} text-left w-full`}
            >
              Chat
            </button>
          )}
          {!isLoggedIn && (
            <Link
              to="/register"
              className={`${linkBase} text-left w-full ${
                location.pathname === "/register" ? activeLink : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          )}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className={`${btnBase} text-left ml-[-7px] w-full`}
              onClick={() => setIsOpen(false)}
            >
              Login
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
                className={`${btnBase} text-left w-full`}
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
