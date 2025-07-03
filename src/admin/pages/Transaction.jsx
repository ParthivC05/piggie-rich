import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ userId: "", type: "", minAmount: "", maxAmount: "", startDate: "", endDate: "" });
  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([k, v]) => v && params.append(k, v));
    const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/transactions?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTransactions(data.transactions || []);
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleFilterChange = e => setFilter({ ...filter, [e.target.name]: e.target.value });
  const handleFilterSubmit = e => { e.preventDefault(); fetchTransactions(); };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <form className="flex flex-wrap gap-4 mb-4" onSubmit={handleFilterSubmit}>
        <input name="userId" placeholder="User ID" value={filter.userId} onChange={handleFilterChange} className="border p-2 rounded" />
        <select name="type" value={filter.type} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="redemption">Redemption</option>
          <option value="gameplay">Gameplay</option>
        </select>
        <input name="minAmount" type="number" placeholder="Min Amount" value={filter.minAmount} onChange={handleFilterChange} className="border p-2 rounded w-32" />
        <input name="maxAmount" type="number" placeholder="Max Amount" value={filter.maxAmount} onChange={handleFilterChange} className="border p-2 rounded w-32" />
        <input name="startDate" type="date" value={filter.startDate} onChange={handleFilterChange} className="border p-2 rounded" />
        <input name="endDate" type="date" value={filter.endDate} onChange={handleFilterChange} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Game</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td className="border px-2 py-1">{t.userId?.username}</td>
              <td className="border px-2 py-1">{t.type}</td>
              <td className="border px-2 py-1">{t.game}</td>
              <td className="border px-2 py-1">${t.amount}</td>
              <td className="border px-2 py-1">{new Date(t.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default Transactions;