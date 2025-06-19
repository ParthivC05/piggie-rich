import React, { useState } from 'react';
import logoImg from '../assets/logo.png'; 
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logoImg} alt="Logo" className="h-8 w-auto" />
      </div>

      {/* Hamburger Icon - Mobile Only */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <FaTimes className="text-2xl text-white" />
          ) : (
            <FaBars className="text-2xl text-white" />
          )}
        </button>
      </div>

      {/* Menu Links - Desktop */}
      <div className="hidden md:flex items-center gap-6">
        <a href="#" className="text-white font-semibold hover:text-blue-400">Home</a>
        <a href="#" className="text-blue-500 hover:text-blue-400">Deposit</a>
        <a href="#" className="text-blue-500 hover:text-blue-400">Chat</a>
        <a href="#" className="text-blue-500 hover:text-blue-400">Register</a>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold">
          LOGIN
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black px-6 py-4 flex flex-col gap-4 md:hidden z-10">
          <a href="#" className="text-white font-semibold hover:text-blue-400">Home</a>
          <a href="#" className="text-blue-500 hover:text-blue-400">Deposit</a>
          <a href="#" className="text-blue-500 hover:text-blue-400">Chat</a>
          <a href="#" className="text-blue-500 hover:text-blue-400">Register</a>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold w-full text-left">
            LOGIN
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
