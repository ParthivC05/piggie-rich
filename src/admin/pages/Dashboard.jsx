import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

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
        console.log("Dashboard stats received:", data);
        setStats(data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats:", error);
      });
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const statCards = [
    {
      label: "Total User",
      value: stats.userCount,
      icon: <img src="/users.png" className="w-10 h-10" alt="Users" />,
      bg: "bg-white border-l-2 border-[#4a55a2]",
    },
    {
      label: "Blocked User",
      value: stats.blockedCount,
      icon: <img src="/blocked.png" className="w-10 h-10" alt="Blocked" />,
      bg: "bg-white border-l-2 border-[#f87171]",
    },
    {
      label: "Cashiers",
      value: stats.cashierCount,
      icon: <img src="/cashier.png" className="w-10 h-10" alt="Cashier" />,
      bg: "bg-white border-l-2 border-[#39A1EA]",
    },
    {
      label: "Admins",
      value: stats.adminCount,
      icon: (
        <div
          className="w-[35px] h-[35px] p-2 rounded-[8px] border-2 flex items-center justify-center"
          style={{ borderColor: "#FFFFFF", backgroundColor: "#fbbf24" }}
        >
          <img
            src="/admin.png"
            alt="Admin"
            className="w-full h-full object-contain"
          />
        </div>
      ),
      bg: "bg-white border-l-2 border-[#fbbf24]",
      borderColor: "#fbbf24",
    },
    {
      label: "Total Deposits",
      value: stats.totalDeposits,
      icon: <img src="/deposits.png" className="w-10 h-10" alt="Deposits" />,
      bg: "bg-white border-l-2 border-[#CD2790]",
    },
    {
      label: "Total Transactions",
      value: stats.depositCount,
      icon: (
        <div
          className="w-[40px] h-[40px] p-2 rounded-[8px] border-2 flex items-center justify-center"
          style={{ borderColor: "#FFFFFF", backgroundColor: "#058003" }}
        >
          <img
            src="/transactions.png"
            className="w-10 h-10"
            alt="Transactions"
          />
        </div>
      ),
      bg: "bg-white border-l-2 border-[#058003]",
    },
  ];

  return (
    <AdminLayout>

      <div className="flex flex-wrap gap-4 px-4">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className={`flex items-center ${stat.bg} rounded-[12px] shadow-sm px-4 py-4 w-[260.5px] h-[88px] gap-4`}
          >
            <div className="shrink-0">{stat.icon}</div>
            <div>
              <div className="text-sm font-medium text-gray-500">
                {stat.label}
              </div>
              <div className="text-xl font-bold text-gray-900">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
