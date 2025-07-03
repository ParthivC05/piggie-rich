import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/transactions", label: "Transactions" },
  { to: "/admin/cms", label: "CMS" },
  { to: "/admin/access-control", label: "Access Control" },
];

const AdminSidebar = () => (
  <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">
    <div className="mb-10 text-2xl font-bold text-center">Admin Panel</div>
    <nav className="flex flex-col gap-4">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 transition ${
              isActive ? "bg-blue-700" : ""
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;