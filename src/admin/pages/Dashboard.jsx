import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    transactionCount: 0,
    totalDeposits: 0,
    blockedCount: 0,
    cashierCount: 0,
    adminCount: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <ul className="space-y-2">
            <li>
              <strong>Total Users:</strong> {stats.userCount}
            </li>
            <li>
              <strong>Total Deposits/Transactions:</strong> {stats.transactionCount}
            </li>
            <li>
              <strong>Total Deposited Amount:</strong> ${stats.totalDeposits}
            </li>
            <li>
              <strong>Blocked Users:</strong> {stats.blockedCount}
            </li>
            <li>
              <strong>Cashiers:</strong> {stats.cashierCount}
            </li>
            <li>
              <strong>Admins:</strong> {stats.adminCount}
            </li>
          </ul>
        </div>
        
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;