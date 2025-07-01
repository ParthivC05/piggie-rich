import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/register", {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input name="username" required placeholder="Username" className="mb-3 w-full border rounded px-3 py-2" value={form.username} onChange={handleChange} />
        <input name="password" type="password" required placeholder="Password" className="mb-3 w-full border rounded px-3 py-2" value={form.password} onChange={handleChange} />
        <input name="confirmPassword" type="password" required placeholder="Confirm Password" className="mb-3 w-full border rounded px-3 py-2" value={form.confirmPassword} onChange={handleChange} />
        <input name="dob" type="date" required placeholder="Date of Birth" className="mb-3 w-full border rounded px-3 py-2" value={form.dob} onChange={handleChange} />
        <input name="firstName" required placeholder="First Name" className="mb-3 w-full border rounded px-3 py-2" value={form.firstName} onChange={handleChange} />
        <input name="lastName" required placeholder="Last Name" className="mb-3 w-full border rounded px-3 py-2" value={form.lastName} onChange={handleChange} />
        <input name="email" type="email" required placeholder="Email" className="mb-3 w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} />
        <input name="phone" required placeholder="Phone" className="mb-6 w-full border rounded px-3 py-2" value={form.phone} onChange={handleChange} />
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;