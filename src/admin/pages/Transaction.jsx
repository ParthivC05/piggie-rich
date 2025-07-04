import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaSearch, FaFilter, FaDownload, FaEye } from "react-icons/fa";

const Transactions = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    userId: "",
    game: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const token = localStorage.getItem("token");

  const fetchDeposits = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filter).forEach(([k, v]) => v && params.append(k, v));

      const res = await fetch(
        `${import.meta.env.VITE_AUTH_API_URL}/admin/deposits?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setDeposits(data.deposits || []);
    } catch (error) {
      console.error("Error fetching deposits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleFilterChange = (e) =>
    setFilter({ ...filter, [e.target.name]: e.target.value });

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchDeposits();
  };

  const clearFilters = () => {
    setFilter({
      userId: "",
      game: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
      status: "",
    });
    fetchDeposits();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-white rounded-3xl p-8 mb-10 shadow-lg">
        <h1 className="text-5xl font-black tracking-tight drop-shadow-lg">💰 Transactions</h1>
        <p className="text-xl mt-2 opacity-90">Manage and monitor all deposit transactions</p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-2xl space-y-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={fetchDeposits}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              <FaSearch />
              Refresh
            </button>
          </div>
          
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-700">
              Total Transactions: <span className="text-purple-600">{deposits.length}</span>
            </p>
            <p className="text-sm text-gray-500">
              Total Amount: <span className="text-green-600 font-semibold">
                {formatAmount(deposits.reduce((sum, deposit) => sum + deposit.amount, 0))}
              </span>
            </p>
          </div>
        </div>

        {/* Filter Form */}
        {showFilters && (
          <form onSubmit={handleFilterSubmit} className="bg-gray-50 p-6 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">User ID</label>
                <input
                  name="userId"
                  placeholder="Search by User ID"
                  value={filter.userId}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Game</label>
                <input
                  name="game"
                  placeholder="Search by Game"
                  value={filter.game}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Min Amount</label>
                <input
                  name="minAmount"
                  type="number"
                  placeholder="Min Amount"
                  value={filter.minAmount}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Max Amount</label>
                <input
                  name="maxAmount"
                  type="number"
                  placeholder="Max Amount"
                  value={filter.maxAmount}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                <input
                  name="startDate"
                  type="date"
                  value={filter.startDate}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  value={filter.endDate}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={filter.status}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl transition-all duration-300"
              >
                Clear Filters
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </form>
        )}

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading transactions...</p>
            </div>
          ) : deposits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-xl text-gray-600">No transactions found</p>
              <p className="text-gray-500">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">User</th>
                    <th className="px-6 py-4 text-left font-semibold">Game</th>
                    <th className="px-6 py-4 text-left font-semibold">Amount</th>
                    <th className="px-6 py-4 text-left font-semibold">PayPal Order ID</th>
                    <th className="px-6 py-4 text-left font-semibold">Payer Info</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {deposits.map((deposit, idx) => (
                    <tr key={deposit._id} className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {deposit.userId?.username || deposit.gameUsername || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {deposit.userId?.email || deposit.customerEmail}
                          </div>
                          <div className="text-xs text-gray-400">
                            {deposit.userId?.firstName} {deposit.userId?.lastName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {deposit.game}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600 text-lg">
                          {formatAmount(deposit.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-mono text-gray-700">{deposit.paypalOrderId}</div>
                          <div className="text-gray-500">Phone: {deposit.customerPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-semibold">
                            {deposit.payer?.name?.given_name} {deposit.payer?.name?.surname}
                          </div>
                          <div className="text-gray-500">{deposit.payer?.email_address}</div>
                          <div className="text-gray-400">{deposit.payer?.address?.country_code}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(deposit.status)}`}>
                          {deposit.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(deposit.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-purple-600 hover:text-purple-800 transition-colors">
                          <FaEye className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Transactions; 