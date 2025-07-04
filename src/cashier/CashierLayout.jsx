import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CashierLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col ">
        <div>
          <div className="mb-12 text-3xl font-extrabold text-center text-blue-400">Cashier Panel</div>
          <nav className="flex flex-col gap-3">
            <NavLink to="/cashier/users" className="px-4 py-2 rounded hover:bg-gray-700">Users</NavLink>
            <NavLink to="/cashier/transactions" className="px-4 py-2 rounded hover:bg-gray-700">Transactions</NavLink>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className=" w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition-colors"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default CashierLayout;