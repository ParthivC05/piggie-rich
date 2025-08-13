import React from 'react';
import { Link } from "react-router-dom";
import logoImg from "/logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Logo" className="h-16 w-auto" />
            </div>

            <p className="text-white text-sm">
              Copyright 2025 | Prosperity Solutions Group LLC | All Rights Reserved
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <Link to="/privacy" className="text-white text-sm hover:text-yellow-400">
                  Privacy Policy
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <Link to="/terms" className="text-white text-sm hover:text-yellow-400">
                  Terms & Conditions
                </Link>
              </div>
            </div>

            <p className="text-white text-xs leading-relaxed">
              High 5 Games, LLC is a limited liability company duly registered under the laws of the State of Delaware with registration number 2593119 and having a registered address at 251 Little Falls Drive, Wilmington, DE 19808.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <h3 className="text-yellow-400 font-semibold">Game</h3>
              </div>
              <div className="space-y-2 pl-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/game-room" className="text-white text-sm hover:text-yellow-400">All Game</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/game-room" className="text-white text-sm hover:text-yellow-400">New Game</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/game-room" className="text-white text-sm hover:text-yellow-400">Online Game</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/game-room" className="text-white text-sm hover:text-yellow-400">Land Based</Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <h3 className="text-yellow-400 font-semibold">About</h3>
              </div>
              <div className="space-y-2 pl-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/" className="text-white text-sm hover:text-yellow-400">Home</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/about" className="text-white text-sm hover:text-yellow-400">About Us</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/privacy" className="text-white text-sm hover:text-yellow-400">Privacy Policy</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/terms" className="text-white text-sm hover:text-yellow-400">Terms & Conditions</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/deposit" className="text-white text-sm hover:text-yellow-400">Deposit</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/chat" className="text-white text-sm hover:text-yellow-400">Chat</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/register" className="text-white text-sm hover:text-yellow-400">Register</Link>
                </div>
              </div>
            </div>
      
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <h3 className="text-yellow-400 font-semibold">Our Solution</h3>
              </div>
              <div className="space-y-2 pl-5">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/game-room" className="text-white text-sm hover:text-yellow-400">Casino Platform</Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white"></div>
                  <Link to="/game-room" className="text-white text-sm hover:text-yellow-400">Game Studio</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
