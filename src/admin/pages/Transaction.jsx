import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({
    userId: "",
    type: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });
  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([k, v]) => v && params.append(k, v));

    const res = await fetch(
      `${import.meta.env.VITE_AUTH_API_URL}/admin/transactions?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setTransactions(data.transactions || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleFilterChange = (e) =>
    setFilter({ ...filter, [e.target.name]: e.target.value });

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-6 mb-8 shadow-inner">
        <h1 className="text-3xl font-extrabold text-green-800">Transactions</h1>
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6"
        onSubmit={handleFilterSubmit}
      >
        <input
          name="userId"
          placeholder="User ID"
          value={filter.userId}
          onChange={handleFilterChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select
          name="type"
          value={filter.type}
          onChange={handleFilterChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="redemption">Redemption</option>
          <option value="gameplay">Gameplay</option>
        </select>
        <input
          name="minAmount"
          type="number"
          placeholder="Min Amount"
          value={filter.minAmount}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="maxAmount"
          type="number"
          placeholder="Max Amount"
          value={filter.maxAmount}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="startDate"
          type="date"
          value={filter.startDate}
          onChange={handleFilterChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          name="endDate"
          type="date"
          value={filter.endDate}
          onChange={handleFilterChange}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </form>

      <button
        onClick={handleFilterSubmit}
        className="mb-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
      >
        Apply Filters
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Game</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr key={t._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2">{t.userId?.username || "-"}</td>
                <td className="px-4 py-2 capitalize">{t.type}</td>
                <td className="px-4 py-2">{t.game || "-"}</td>
                <td className="px-4 py-2 text-green-600">${t.amount}</td>
                <td className="px-4 py-2">{new Date(t.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Transactions;
