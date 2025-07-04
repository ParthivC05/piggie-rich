import React, { useEffect, useState } from "react";
import { FaEye, FaTimes } from "react-icons/fa";

const API = import.meta.env.VITE_AUTH_API_URL;

const CashierTransactions = () => {
  const [deposits, setDeposits] = useState([]);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/cashier/deposits`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDeposits(data.deposits || []));
  }, []);

  const handleViewDetails = (deposit) => {
    setSelectedDeposit(deposit);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDeposit(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Transactions</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit, idx) => (
              <tr key={deposit._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{deposit.userId?.username || "N/A"}</div>
                    <div className="text-sm text-gray-500">{deposit.userId?.email || "N/A"}</div>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold">${deposit.amount}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    deposit.status === 'completed' ? 'bg-green-100 text-green-600' :
                    deposit.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {deposit.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  {new Date(deposit.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleViewDetails(deposit)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
                  >
                    <FaEye className="inline mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Transaction Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">User Information</label>
                  <div className="bg-gray-50 p-3 rounded">
                    <div><strong>Name:</strong> {selectedDeposit.userId?.firstName} {selectedDeposit.userId?.lastName}</div>
                    <div><strong>Username:</strong> {selectedDeposit.userId?.username}</div>
                    <div><strong>Email:</strong> {selectedDeposit.userId?.email}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Transaction Information</label>
                  <div className="bg-gray-50 p-3 rounded">
                    <div><strong>Amount:</strong> ${selectedDeposit.amount}</div>
                    <div><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                        selectedDeposit.status === 'completed' ? 'bg-green-100 text-green-600' :
                        selectedDeposit.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {selectedDeposit.status}
                      </span>
                    </div>
                    <div><strong>Date:</strong> {new Date(selectedDeposit.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              {selectedDeposit.game && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Game Information</label>
                  <div className="bg-gray-50 p-3 rounded">
                    <div><strong>Game:</strong> {selectedDeposit.game}</div>
                  </div>
                </div>
              )}
              
              {selectedDeposit.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
                  <div className="bg-gray-50 p-3 rounded">
                    {selectedDeposit.notes}
                  </div>
                </div>
              )}
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

export default CashierTransactions;