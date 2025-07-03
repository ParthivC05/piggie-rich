import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";

const AccessControl = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier");
  const token = localStorage.getItem("token");

  const handleAdd = async () => {
    await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/add-user`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    alert("User added!");
    setEmail("");
    setPassword("");
  };

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-6 mb-8 shadow-inner">
        <h1 className="text-3xl font-extrabold text-pink-800">Access Control</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Email</label>
          <input
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Password</label>
          <input
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Role</label>
          <select
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="cashier">Cashier</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition shadow-md"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AccessControl;
