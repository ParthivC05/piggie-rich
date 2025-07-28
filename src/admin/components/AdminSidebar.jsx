import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUsers,
  FaUser,
  FaSignOutAlt,
  FaMoneyCheckAlt,
  FaCogs,
  FaUserShield,
  FaHome,
} from "react-icons/fa";
import ConfirmModal from "./ConfirmModal";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
  { to: "/admin/users", label: "User Management", icon: <FaUsers /> },
  // { to: "/admin/details", label: "User Details", icon: <FaUser /> },
  {
    to: "/admin/transactions",
    label: "Transaction Logs",
    icon: <FaMoneyCheckAlt />,
  },
  { to: "/admin/cms", label: "Content Management", icon: <FaCogs /> },
  {
    to: "/admin/access-control",
    label: "Admin User Role",
    icon: <FaUserShield />,
  },
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    // your delete logic here
    console.log("Item deleted");
    setShowModal(false);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
    fixed top-0 left-0 z-40 h-full w-64 p-5 text-white bg-black overflow-y-auto
    transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static md:min-h-screen
  `}
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 mx-auto rounded-full mb-2"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-inner"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-10 pt-6 border-t border-gray-700">
          <button
            onClick={(handleLogout, () => setShowModal("logout"))}
            className="flex w-50 items-center gap-2 mb-5 px-6 py-2 rounded-md text-white font-medium
                   bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 
                   shadow-sm transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Modal */}
      <ConfirmModal
        isOpen={!!showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={showModal === "logout" ? handleLogout : handleDelete}
        message={`you want to ${showModal === "logout" ? "Logout" : "Delete"}?`}
        confirmLabel={showModal === "logout" ? "Logout" : "Delete"}
        type={showModal}
      />
    </>
  );
};

export default AdminSidebar;
