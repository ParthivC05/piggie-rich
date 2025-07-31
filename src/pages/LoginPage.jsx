import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "/login-image.jpg";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        toast.success("Login successful!");
        if (data.user.role === "admin") {
          setTimeout(() => navigate("/admin/dashboard"), 1500);
        } else if (data.user.role === "cashier") {
          setTimeout(() => navigate("/cashier/users"), 1500);
        } else {
          setTimeout(() => navigate("/"), 1500);
        }
      } else {
        toast.error(data.error || "Login failed.");
      }
    } catch (err) {
      toast.error("Server error.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Casino Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={loginImage}
          alt="Casino Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Yourname@gmail.com"
                required
                value={form.username}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 border border-gray-700 focus:border-yellow-400 focus:outline-none transition-colors"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <CiAt />
              </span>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 border border-gray-700 focus:border-yellow-400 focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
              <FcGoogle className="text-xl" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
              <FaFacebook className="text-xl text-blue-500" />
              <span>Facebook</span>
            </button>
          </div>

          {/* Terms Text */}
          <p className="text-center text-gray-400 text-sm mt-6">
            By registering you agree to our{" "}
            <Link to="/terms" className="text-yellow-400 hover:text-yellow-300">
              Terms and Conditions
            </Link>
          </p>
          
          {/* Register Link */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow-400 hover:text-yellow-300 underline">
              Register here
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
