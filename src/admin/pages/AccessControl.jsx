import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaCheck, FaTimes, FaPen, FaTrash, FaSortDown, FaPlus, FaUserPlus } from "react-icons/fa";
import { IoIosArrowRoundDown } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

import AdminLayout from "../components/AdminLayout";

const AccessControl = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("cashier");
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users || []);
      } else {
        toast.error(data.error || "Failed to fetch users");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const handleAdd = async () => {
    if (!email.trim()) {
      toast.error('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!role) {
      toast.error('Role is required');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/add-user`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`User with role "${role}" added successfully!`);
        setEmail("");
        setPassword("");
        setRole("cashier");
        setShowAddForm(false);
        fetchUsers(); 
      } else {
        toast.error(`Failed to add user: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Network error occurred while adding user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("User deleted successfully");
        fetchUsers(); 
      } else {
        toast.error(data.error || "Failed to delete user");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };
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
      <ToastContainer />
      <div className="bg-white rounded-xl p-6 shadow-md max-w-6xl mx-auto mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Access Control</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
          >
            <FaUserPlus />
            {showAddForm ? "Cancel" : "Add New User"}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New User</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="cashier">Cashier</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAdd}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg transition-all duration-200 shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Add User
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Role Permissions</h3>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="text-gray-700 text-sm font-semibold border-gray-200 bg-gray-50">
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800">{user.username}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'cashier' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        user.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.blocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <button 
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AccessControl;
