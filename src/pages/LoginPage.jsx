import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
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
    <div className="mt-3 relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f6f7fb] overflow-hidden px-4">
      <img
        src="/group.png"
        alt=""
        className="absolute w-20 sm:w-24 md:w-[94px] top-6 sm:top-10 md:top-24 left-4 sm:left-5 md:left-[54px] pointer-events-none select-none"
      />

      <img
        src="/vector.png"
        alt=""
        className="hidden lg:block absolute w-4  xl:w-6 top-24 xl:top-[183px] left-[58%] xl:left-[572px] pointer-events-none"
      />

      <img
        src="/group14036192.png"
        alt=""
        className="hidden xl:block absolute w-40 2xl:w-[300px] top-8 2xl:top-[100px] left-[70%] 2xl:left-[800px] pointer-events-none"
      />
      <form
        onSubmit={handleSubmit}
        className="mt-3 relative z-10 bg-white w-full max-w-sm sm:max-w-sm md:max-w-md p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-1">Log in account</h2>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please enter your details.
        </p>
        <div className="relative mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email / Phone
          </label>
          <input
            id="username"
            name="username"
            placeholder="Enter Email"
            required
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 pr-10"
          />
          <span className="absolute right-3 top-9 text-gray-400">
            <CiAt />
          </span>
        </div>

        <div className="relative mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 pr-10"
          />
          <span className="absolute right-3 top-9 text-gray-400">
            <FaEye />
          </span>
        </div>

        <Link to="/forgotPass">
          <div className="text-right mb-6 text-sm text-yellow-600 hover:underline cursor-pointer">
            Forgot Password?
          </div>
        </Link>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-2 rounded hover:opacity-90 transition"
        >
          Login
        </button>
      </form>

      <img
        src="/group7.png"
        alt=""
        className="hidden sm:block absolute bottom-0 left-0 w-24 sm:w-32 md:w-40 pointer-events-none select-none"
      />

      <img
        src="/undraw_login_re_4vu2.png"
        alt=""
        className="mt-12 lg:mt-0 w-56 sm:w-64 md:w-80 md:top-[130px] lg:w-[410px] lg:absolute lg:top-147 lg:-translate-y-1/2 lg:right-0 pointer-events-none select-none"
      />
    </div>
  );
};

export default LoginPage;
