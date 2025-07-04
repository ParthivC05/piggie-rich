import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const CashierLayout = () => (
  <div className="flex">
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <div className="mb-12 text-3xl font-extrabold text-center text-blue-400">Cashier Panel</div>
      <nav className="flex flex-col gap-3">
        <NavLink to="/cashier/users" className="px-4 py-2 rounded hover:bg-gray-700">Users</NavLink>
        <NavLink to="/cashier/transactions" className="px-4 py-2 rounded hover:bg-gray-700">Transactions</NavLink>
      </nav>
    </aside>
    <main className="flex-1 p-8">
      <Outlet />
    </main>
  </div>
);

export default CashierLayout;