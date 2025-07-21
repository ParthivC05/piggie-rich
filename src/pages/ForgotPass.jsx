import React, { useState } from "react";
import { CiAt } from "react-icons/ci";

function ForgotPass() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username }),
    });
    const data = await res.json();
    setMessage(data.message || "Check your email for reset link.");
  };

  return (
    <div className="mt-3 relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f6f7fb] overflow-hidden px-4">
 

      <form
        onSubmit={handleSubmit}
        className="mt-3 relative z-10 bg-white  sm:max-w-sm md:max-w-md p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-1">
          Forgot Your Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          No worries, we’ll send you reset instructions
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 pr-10"
          />
          <span className="absolute right-3 top-9 text-gray-400">
            <CiAt />
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-2 rounded hover:opacity-90 transition"
        >
          Continue
        </button>

        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}

export default ForgotPass;
