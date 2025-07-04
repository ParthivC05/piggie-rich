import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { FaUsers, FaLock, FaUserShield, FaCashRegister, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    blockedCount: 0,
    cashierCount: 0,
    adminCount: 0,
    depositCount: 0,
    totalDeposits: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Dashboard stats received:', data);
        setStats(data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard stats:', error);
      });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const statCards = [
    {
      label: "Total Users",
      value: stats.userCount,
      icon: <FaUsers className="text-3xl text-blue-500" />,
      bg: "from-blue-100 to-blue-200",
    },
    {
      label: "Blocked Users",
      value: stats.blockedCount,
      icon: <FaLock className="text-3xl text-red-500" />,
      bg: "from-red-100 to-red-200",
    },
    {
      label: "Cashiers",
      value: stats.cashierCount,
      icon: <FaCashRegister className="text-3xl text-purple-500" />,
      bg: "from-purple-100 to-purple-200",
    },
    {
      label: "Admins",
      value: stats.adminCount,
      icon: <FaUserShield className="text-3xl text-indigo-500" />,
      bg: "from-indigo-100 to-indigo-200",
    },
    {
      label: "Total Deposits",
      value: formatCurrency(stats.totalDeposits),
      icon: <FaMoneyBillWave className="text-3xl text-green-500" />,
      bg: "from-green-100 to-green-200",
    },
    {
      label: "Total Transactions",
      value: stats.depositCount,
      icon: <FaChartLine className="text-3xl text-teal-500" />,
      bg: "from-teal-100 to-teal-200",
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`p-6 rounded-xl shadow-md bg-gradient-to-br ${stat.bg} hover:scale-[1.02] transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
