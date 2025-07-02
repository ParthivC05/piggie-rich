import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
          setTimeout(() => navigate("/cashier/dashboard"), 1500);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          name="username"
          required
          placeholder="Username"
          className="mb-3 w-full border rounded px-3 py-2"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="mb-6 w-full border rounded px-3 py-2"
          value={form.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 hover:cursor-pointer"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Link
            to="/register"
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
