// src/components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-center text-sm text-gray-400 py-6">
      <div className="container mx-auto">
        <p>
          Copyright 2025 | Prosperity Solutions Group LLC | All Rights Reserved
        </p>
        <div className="space-x-4 mt-2">
          <Link to="/terms" className="text-white hover:underline">
            Terms and Conditions
          </Link>
          <span>|</span>
          <Link to="/privacy" className="text-white hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
