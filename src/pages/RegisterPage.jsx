import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    dob: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!form.username.trim()) return "Username is required.";
    if (!form.password) return "Password is required.";
    if (form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match.";
    if (!form.dob) return "Date of Birth is required.";
    if (!form.firstName.trim()) return "First Name is required.";
    if (!form.lastName.trim()) return "Last Name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Invalid email address.";
    if (!form.phone.trim()) return "Phone is required.";
    if (!/^\d{10,}$/.test(form.phone))
      return "Phone must be at least 10 digits.";
    return null;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast.error(data.error || "Registration failed.");
      }
    } catch (err) {
      toast.error("Server error.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
          className="mb-3 w-full border rounded px-3 py-2"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          required
          placeholder="Confirm Password"
          className="mb-3 w-full border rounded px-3 py-2"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <input
          name="dob"
          type="date"
          required
          placeholder="Date of Birth"
          className="mb-3 w-full border rounded px-3 py-2"
          value={form.dob}
          onChange={handleChange}
        />
        <input
          name="firstName"
          required
          placeholder="First Name"
          className="mb-3 w-full border rounded px-3 py-2"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          required
          placeholder="Last Name"
          className="mb-3 w-full border rounded px-3 py-2"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="mb-3 w-full border rounded px-3 py-2"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          required
          placeholder="Phone"
          className="mb-6 w-full border rounded px-3 py-2"
          value={form.phone}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 flex items-center justify-center"
          disabled={loading}
        >
         
          {loading ? <span className="loader mr-2"></span> : null}
          {loading ? "Registering..." : "Register"}
        </button>
         <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </div>
      </form>
      <style>
        {`
          .loader {
            border: 2px solid #f3f3f3;
            border-top: 2px solid #3498db;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            animation: spin 1s linear infinite;
            display: inline-block;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};

export default RegisterPage;
