import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaSearch, FaFilter, FaDownload, FaEye, FaTimes } from "react-icons/fa";

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
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleViewDetails = (deposit) => {
    setSelectedDeposit(deposit);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDeposit(null);
  };



  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 text-white rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 shadow-lg">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-lg">💰 Transactions</h1>
        <p className="text-base sm:text-xl mt-2 opacity-90">Manage and monitor all deposit transactions</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
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

          <div className="text-left sm:text-right">
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

        {showFilters && (
          <form onSubmit={handleFilterSubmit} className="bg-gray-50 p-6 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "User ID", name: "userId", type: "text", placeholder: "Search by User ID" },
                { label: "Game", name: "game", type: "text", placeholder: "Search by Game" },
                { label: "Min Amount", name: "minAmount", type: "number", placeholder: "Min Amount" },
                { label: "Max Amount", name: "maxAmount", type: "number", placeholder: "Max Amount" },
                { label: "Start Date", name: "startDate", type: "date" },
                { label: "End Date", name: "endDate", type: "date" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-gray-700 font-medium mb-2">{label}</label>
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={filter[name]}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              ))}
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

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
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

        <div className="overflow-x-auto rounded-2xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading transactions...</p>
            </div>
          ) : deposits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-lg sm:text-xl text-gray-600">No transactions found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <table className="min-w-full">
                              <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm">
                  <tr>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">User</th>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">Game</th>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">Amount</th>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">Status</th>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">Date</th>
                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {deposits.map((deposit, idx) => (
                  <tr key={deposit._id} className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-3 py-3 sm:px-6 sm:py-4 break-words">
                      <div className="font-semibold text-gray-900">{deposit.userId?.username || deposit.gameUsername || "N/A"}</div>
                      <div className="text-xs text-gray-500">{deposit.userId?.email || deposit.customerEmail}</div>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {deposit.game}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4 font-bold text-green-600 text-base">
                      {formatAmount(deposit.amount)}
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(deposit.status)}`}>
                        {deposit.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4 text-gray-600 text-xs">
                      {formatDate(deposit.createdAt)}
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <button 
                        onClick={() => handleViewDetails(deposit)}
                        className="text-purple-600 hover:text-purple-800 transition-colors p-2 rounded-lg hover:bg-purple-50"
                        title="View Details"
                      >
                        <FaEye className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && selectedDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-3xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Transaction Details</h2>
                <p className="text-purple-100">ID: {selectedDeposit._id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="bg-white text-red-600 bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
                  title="Close"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {formatAmount(selectedDeposit.amount)}
                    </div>
                    <div className="text-sm text-gray-600">Amount</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedDeposit.game}
                    </div>
                    <div className="text-sm text-gray-600">Game</div>
                  </div>
                  <div className="text-center">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getStatusBadge(selectedDeposit.status)}`}>
                      {selectedDeposit.status}
                    </span>
                    <div className="text-sm text-gray-600 mt-1">Status</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">User Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Username:</span>
                      <div className="font-semibold">{selectedDeposit.userId?.username || selectedDeposit.gameUsername || "N/A"}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Email:</span>
                      <div className="font-semibold">{selectedDeposit.userId?.email || selectedDeposit.customerEmail}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Phone:</span>
                      <div className="font-semibold">{selectedDeposit.customerPhone}</div>
                    </div>
                    {selectedDeposit.userId?.firstName && (
                      <div>
                        <span className="text-sm text-gray-600">Full Name:</span>
                        <div className="font-semibold">{selectedDeposit.userId.firstName} {selectedDeposit.userId.lastName}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">PayPal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Order ID:</span>
                      <div className="font-mono text-sm">{selectedDeposit.paypalOrderId}</div>
                    </div>
                    {selectedDeposit.payer && (
                      <>
                        <div>
                          <span className="text-sm text-gray-600">Payer Name:</span>
                          <div className="font-semibold">
                            {selectedDeposit.payer.name?.given_name} {selectedDeposit.payer.name?.surname}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Payer Email:</span>
                          <div className="font-semibold">{selectedDeposit.payer.email_address}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Country:</span>
                          <div className="font-semibold">{selectedDeposit.payer.address?.country_code}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm text-gray-600">Transaction ID:</span>
                    <div className="font-mono text-sm">{selectedDeposit._id}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date & Time:</span>
                    <div className="font-semibold">{formatDate(selectedDeposit.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Transactions;
