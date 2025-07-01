import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FreeToPlaySection from "../components/FreeToPlaySection";
import SweepstakesPlatforms from "../components/SweepStakes";
import HowToPlay from "../components/HowToPlay";

const HomePage = () => {
  return (
    <div>
      
      {/* <Navbar /> */}
      <HeroSection />
      <FreeToPlaySection />
      <SweepstakesPlatforms />
      <HowToPlay/>
    </div>
  );
};

export default HomePage;
