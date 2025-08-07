import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "/hero-bg.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <section
      className="relative w-full bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="min-h-[550px] flex items-center justify-start px-4 sm:px-8 md:px-16 py-10">
        <div className="bg-[#212121] rounded-xl max-w-md p-8 md:p-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-yellow-400 text-3xl md:text-4xl lg:text-5xl font-bold">
              America's #1
            </h1>
            <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold">
              Sweepstakes Experience
            </p>
          </div>
          <p className="text-gray-300 text-sm md:text-base">
            Redeem Rules changed as of July 1, 2025
          </p>

          <div className="flex gap-4 pt-6">
            {!isLoggedIn && (
              <button
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-200 bg-transparent"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            )}
     
            {
              isLoggedIn ? "" : <button
              className="bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold px-8 py-3 rounded-full transition-all duration-200 shadow-lg"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            }
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        <span className="w-3 h-3 rounded-full bg-white opacity-80"></span>
        <span className="w-3 h-3 rounded-full bg-white opacity-40"></span>
        <span className="w-3 h-3 rounded-full bg-white opacity-40"></span>
      </div>
    </section>
  );
};

export default HeroSection;
