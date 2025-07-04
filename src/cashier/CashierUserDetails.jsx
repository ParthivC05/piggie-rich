import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaTimes, FaArrowLeft } from "react-icons/fa";

const API = import.meta.env.VITE_AUTH_API_URL;

const CashierUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userRes, transactionsRes] = await Promise.all([
          fetch(`${API}/cashier/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/cashier/deposits?userId=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const userData = await userRes.json();
        const transactionsData = await transactionsRes.json();

        setUser(userData.user);
        setUserTransactions(transactionsData.deposits || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, token]);

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div className="text-center py-12 text-xl text-gray-600 animate-pulse">Loading user details...</div>;
  }

  if (!user) {
    return <div className="text-center py-12 text-xl text-red-600">User not found</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/cashier/users')}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                <div className="text-lg font-semibold">{user.username}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <div className="text-lg">{user.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <div className="text-lg">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : "Not provided"
                  }
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
                <div className="text-lg">
                  {user.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <div className="text-lg">{user.phone || "Not provided"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                <div className="text-lg capitalize">{user.role}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  user.blocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                }`}>
                  {user.blocked ? "Blocked" : "Active"}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Account Created</label>
                <div className="text-lg">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <button
              onClick={handleViewDetails}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <FaEye />
              View Detailed Information
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          {userTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userTransactions.slice(0, 5).map((transaction) => (
                    <tr key={transaction._id} className="border-b">
                      <td className="py-2 font-semibold">${transaction.amount}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-600' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-2 text-sm">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No transactions found for this user.</p>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Detailed User Information</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Username:</strong> {user.username}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>First Name:</strong> {user.firstName || "Not provided"}</div>
                    <div><strong>Last Name:</strong> {user.lastName || "Not provided"}</div>
                    <div><strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}</div>
                    <div><strong>Phone:</strong> {user.phone || "Not provided"}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Role:</strong> <span className="capitalize">{user.role}</span></div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                        user.blocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                      }`}>
                        {user.blocked ? "Blocked" : "Active"}
                      </span>
                    </div>
                    <div><strong>Account Created:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleString() : "Unknown"}</div>
                    <div><strong>Last Updated:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "Unknown"}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Transaction History</h4>
                {userTransactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border px-3 py-2 text-left">Amount</th>
                          <th className="border px-3 py-2 text-left">Status</th>
                          <th className="border px-3 py-2 text-left">Game</th>
                          <th className="border px-3 py-2 text-left">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userTransactions.map((transaction) => (
                          <tr key={transaction._id}>
                            <td className="border px-3 py-2 font-semibold">${transaction.amount}</td>
                            <td className="border px-3 py-2">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                transaction.status === 'completed' ? 'bg-green-100 text-green-600' :
                                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-red-100 text-red-600'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td className="border px-3 py-2">{transaction.game || "N/A"}</td>
                            <td className="border px-3 py-2 text-sm">
                              {new Date(transaction.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No transactions found for this user.</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end p-6 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierUserDetails; 