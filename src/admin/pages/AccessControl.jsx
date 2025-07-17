import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaPen, FaTrash, FaSortDown } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";

import AdminLayout from "../components/AdminLayout";

const AccessControl = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("cashier");
  // const token = localStorage.getItem("token");

  // const handleAdd = async () => {
  //   if (!email.trim()) {
  //     toast.error('Email is required');
  //     return;
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     toast.error('Please enter a valid email address');
  //     return;
  //   }

  //   if (!password.trim()) {
  //     toast.error('Password is required');
  //     return;
  //   }

  //   if (password.length < 6) {
  //     toast.error('Password must be at least 6 characters long');
  //     return;
  //   }

  //   if (!role) {
  //     toast.error('Role is required');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/add-user`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ email, password, role }),
  //     });

  //     if (response.ok) {
  //       toast.success(`User with role "${role}" added successfully!`);
  //       setEmail("");
  //       setPassword("");
  //       setRole("cashier");
  //     } else {
  //       const errorData = await response.json();
  //       toast.error(`Failed to add user: ${errorData.error || 'Unknown error'}`);
  //     }
  //   } catch (error) {
  //     toast.error('Network error occurred while adding user');
  //   }
  // };
  const rolesData = [
    {
      role: "User",
      accessUserDetails: true,
      accessTransactions: true,
      cms: true,
    },
    {
      role: "Admin",
      accessUserDetails: true,
      accessTransactions: false,
      cms: false,
    },
    {
      role: "Cashier",
      accessUserDetails: false,
      accessTransactions: true,
      cms: true,
    },
  ];

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl p-4 shadow-sm max-w-6xl mx-auto mt-10">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-700 text-sm font-semibold border-gray-200">
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  ROLE <IoIosArrowRoundDown />
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  ACCESS TO USER DETAILS <IoIosArrowRoundDown />
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  ACCESS TO USER TRANSACTIONS <IoIosArrowRoundDown />
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  CMS <IoIosArrowRoundDown />
                </div>
              </th>
              <th className="px-4 py-3">
                <div className="flex items-center gap-1">
                  ACTIONS <IoIosArrowRoundDown />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {rolesData.map((item, index) => (
              <tr key={index} className="border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{item.role}</td>
                <td className="px-4 py-3 text-center">
                  {item.accessUserDetails ? (
                    <FaCheck className="text-green-500 inline" />
                  ) : (
                    <FaTimes className="text-red-500 inline" />
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.accessTransactions ? (
                    <FaCheck className="text-green-500 inline" />
                  ) : (
                    <FaTimes className="text-red-500 inline" />
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {item.cms ? (
                    <FaCheck className="text-green-500 inline" />
                  ) : (
                    <FaTimes className="text-red-500 inline" />
                  )}
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-2">
                  <button className="p-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
                    <RiEdit2Line />
                  </button>
                  <button className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Email</label>
          <input
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Password</label>
          <input
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-gray-700">Role</label>
          <select
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="cashier">Cashier</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg transition shadow-md"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      </div> */}
    </AdminLayout>
  );
};

export default AccessControl;
