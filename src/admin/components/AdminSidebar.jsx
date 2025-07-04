import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/transactions", label: "Transactions" },
  { to: "/admin/cms", label: "CMS" },
  { to: "/admin/access-control", label: "Access Control" },
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg shadow-lg cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
      >
        {open ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 shadow-lg w-64
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-64 md:min-h-screen
        `}
      >
        <div className="mb-12 text-3xl font-extrabold text-center text-blue-400 tracking-wide select-none">
          Admin Panel
        </div>

        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-inner"
                    : "hover:bg-gray-700 hover:text-white text-gray-300"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-4 rounded-lg text-base font-semibold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
