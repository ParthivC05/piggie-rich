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
      <h1 className="text-2xl font-bold mb-4">Access Control</h1>
      <div className="mb-4">
        <input className="border p-2 mr-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 mr-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <select className="border p-2 mr-2" value={role} onChange={e => setRole(e.target.value)}>
          <option value="cashier">Cashier</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>Add</button>
      </div>
    </AdminLayout>
  );
};

export default AccessControl;