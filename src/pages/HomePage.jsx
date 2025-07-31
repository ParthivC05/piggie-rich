import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FreeToPlaySection from "../components/FreeToPlaySection";
import SweepstakesPlatforms from "../components/SweepStakes";
import HowToPlay from "../components/HowToPlay";
import Footer from "../components/Footer";
import RedemptionRules from "../components/RedemptionRules";

const HomePage = () => {
  return (
    <div>
      
      <HeroSection />
      <FreeToPlaySection />
      <SweepstakesPlatforms />
      <HowToPlay/>
      <RedemptionRules/>
    </div>
  );
};

export default HomePage;
