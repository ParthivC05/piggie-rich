import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";

function ResetPass() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/reset-password/${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      }
    );

    const data = await res.json();
    setMessage(data.message || "Password updated.");
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#f6f7fb] overflow-hidden px-4">
      {/* ... your top images ... */}

      <form
        onSubmit={handleReset}
        className="mt-3 relative z-10 bg-white w-full max-w-xs sm:max-w-sm md:max-w-md p-6 sm:p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-1">
          Reset Your Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Your new password must be different from the previous one.
        </p>

        <div className="relative mb-6">
          <label
            htmlFor="newpassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <input
            id="newpassword"
            name="newpassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••••"
            required
            className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="relative mb-8">
          <label
            htmlFor="conpassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="conpassword"
            name="conpassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••"
            required
            className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold py-2 rounded hover:opacity-90 transition"
        >
          Update
        </button>

        {message && (
          <p className="text-center text-green-600 mt-4">{message}</p>
        )}
      </form>

    </div>
  );
}

export default ResetPass;
