import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/transactions", label: "Transactions" },
  { to: "/admin/cms", label: "CMS" },
  { to: "/admin/access-control", label: "Access Control" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-6 shadow-lg">
      <div className="mb-12 text-3xl font-extrabold text-center text-blue-400 tracking-wide">
        Admin Panel
      </div>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-inner"
                  : "hover:bg-gray-700 hover:text-white text-gray-300"
              }`
            }
          >
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 pt-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
