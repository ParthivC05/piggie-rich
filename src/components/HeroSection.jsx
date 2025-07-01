import React from 'react';
import ImageSlider from './ImageSlider';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <section className="bg-black text-white flex flex-col md:flex-row items-center justify-between gap-10 px-4 md:px-16 ">
      <div className="flex justify-center w-full md:w-auto">
        <ImageSlider />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-10 md:mb-12 leading-tight">
          America’s #1 Sweepstakes Experience
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {!isLoggedIn && (
            <button
              className="bg-blue-500 hover:bg-blue-600 px-10 py-3 rounded font-semibold hover:cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-600 px-10 py-3 rounded font-semibold hover:cursor-pointer"
            onClick={() => navigate('/deposit')}
          >
            Deposit
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;