import React, { useState } from 'react';
import logoImg from '../assets/logo.png'; 
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Dynamic classes
  const navBg = isHome ? 'bg-black text-white' : 'bg-white text-black';
  const linkBase = isHome ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-500';
  const btnBase = isHome
    ? 'bg-blue-500 hover:bg-blue-600 text-white'
    : 'bg-blue-500 hover:bg-blue-600 text-white';

  return (
    <nav className={`${navBg} px-6 py-4 flex items-center justify-between shadow relative transition-colors duration-300`}>
      <div className="flex items-center gap-2">
        <img src={logoImg} alt="Logo" className="h-8 w-auto" />
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FaTimes className={`text-2xl ${isHome ? 'text-white' : 'text-black'}`} />
          ) : (
            <FaBars className={`text-2xl ${isHome ? 'text-white' : 'text-black'}`} />
          )}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <a href="#" className={`${linkBase} font-semibold`}>Home</a>
        <a href="#" className={linkBase}>Deposit</a>
        <a href="#" className={linkBase}>Chat</a>
        <a href="#" className={linkBase}>Register</a>
        <button className={`${btnBase} px-4 py-2 rounded font-semibold`}>
          LOGIN
        </button>
      </div>

      {isOpen && (
        <div className={`${navBg} absolute top-full left-0 w-full px-6 py-4 flex flex-col gap-4 md:hidden z-10`}>
          <a href="#" className={`${linkBase} font-semibold`}>Home</a>
          <a href="#" className={linkBase}>Deposit</a>
          <a href="#" className={linkBase}>Chat</a>
          <a href="#" className={linkBase}>Register</a>
          <button className={`${btnBase} w-full text-left`}>
            LOGIN
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;