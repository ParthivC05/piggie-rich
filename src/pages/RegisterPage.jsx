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
    confirmEmail: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    // Check only the fields that are present in the current form state
    if (form.hasOwnProperty('firstName') && !form.firstName.trim()) return "First Name is required.";
    if (form.hasOwnProperty('lastName') && !form.lastName.trim()) return "Last Name is required.";
    if (form.hasOwnProperty('username') && !form.username.trim()) return "Username is required.";
    if (form.hasOwnProperty('phone') && !form.phone.trim()) return "Phone is required.";
    if (form.hasOwnProperty('phone') && !/^\d{10,}$/.test(form.phone)) return "Phone must be at least 10 digits.";
    if (form.hasOwnProperty('email') && !form.email.trim()) return "Email is required.";
    if (form.hasOwnProperty('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Invalid email address.";
    if (form.hasOwnProperty('email') && form.hasOwnProperty('confirmEmail') && form.email !== form.confirmEmail) return "Emails do not match.";
    if (form.hasOwnProperty('password') && !form.password) return "Password is required.";
    if (form.hasOwnProperty('password') && form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.hasOwnProperty('password') && form.hasOwnProperty('confirmPassword') && form.password !== form.confirmPassword) return "Passwords do not match.";
    if (form.hasOwnProperty('dob') && !form.dob) return "Date of Birth is required.";
    if (form.hasOwnProperty('dob') && new Date(form.dob) > new Date()) return "Date of Birth cannot be in the future.";

    if (!agreeToTerms) return "You must agree to Terms and Conditions.";
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
    <div className="min-h-screen bg-black text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Register</h1>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                name="firstName"
                required
                placeholder="First Name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                name="lastName"
                required
                placeholder="Last Name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                User Name <span className="text-red-500">*</span>
              </label>
              <input
                name="username"
                required
                placeholder="User Name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                required
                placeholder="Phone"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Email <span className="text-red-500">*</span>
              </label>
              <input
                name="confirmEmail"
                type="email"
                required
                placeholder="Confirm Email"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                value={form.confirmEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm Password"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none transition-colors"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              name="dob"
              type="date"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition-colors"
              value={form.dob}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-yellow-400 bg-gray-800 border-gray-700 rounded focus:ring-yellow-400 focus:ring-2"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
              I agree to{" "}
              <Link to="/terms" className="text-yellow-400 hover:text-yellow-300 underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-yellow-400 hover:text-yellow-300 underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Registering...
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
