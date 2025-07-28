import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import ConfirmModal from "../components/ConfirmModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
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
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email} ${user.role} ${user.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredUsers.length);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleToggle = async (userId, currentBlocked) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${userId}/block`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ blocked: !currentBlocked }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(currentBlocked ? "User unblocked" : "User blocked");
        fetchUsers(); 
      } else {
        toast.error(data.error || "Failed to update user status");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${selectedUserId}`, {
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
    setShowModal(false);
    setSelectedUserId(null);
  };

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <p className="text-sm md:text-base">
            {loading ? "Loading..." : `${filteredUsers.length} Records Found`}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-end">
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by username, email, role or status"
                className="px-4 py-2 outline-none w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <FaSearch className="text-gray-500 mx-2" />
            </div>
            <img
              src="/filter.png"
              alt="Filter"
              className="w-10 h-10 cursor-pointer"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-separate border-spacing-y-2">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">USERNAME ↓</th>
                <th className="px-4 py-2">EMAIL ↓</th>
                <th className="px-4 py-2">ROLE ↓</th>
                <th className="px-4 py-2">STATUS ↓</th>
                <th className="px-4 py-2">TOGGLE</th>
                <th className="px-4 py-2">ACTIONS ↓</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-red-500">
                    No users match your search.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user._id} className="bg-white shadow rounded-lg">
                    <td className="px-4 py-2 font-medium">{user.username}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`font-semibold ${
                          !user.blocked
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {user.blocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleToggle(user._id, user.blocked)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                          !user.blocked
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                            !user.blocked
                              ? "translate-x-6"
                              : "translate-x-0"
                          }`}
                        ></div>
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link to={`/admin/users/${user._id}`}>
                          <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">
                            <FaEye />
                          </button>
                        </Link>
                        <Link to={`/admin/users/${user._id}/edit`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setShowModal(true);
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex gap-2 items-center">
            <label htmlFor="rows">Show rows:</label>
            <select
              id="rows"
              value={rowsPerPage}
              onChange={handleRowsChange}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="page">Go to:</label>
            <input
              type="number"
              id="page"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => goToPage(Number(e.target.value))}
              className="w-14 h-10 text-center font-semibold text-yellow-600 rounded-lg bg-yellow-50 focus:outline-none border"
            />
            <span className="text-sm">
              {startIndex + 1} - {endIndex} of {filteredUsers.length}
            </span>

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 border rounded-lg flex items-center justify-center disabled:opacity-50"
            >
              <FaChevronLeft className="text-gray-700" />
            </button>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 border rounded-lg flex items-center justify-center disabled:opacity-50"
            >
              <FaChevronRight className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
        message="You want to delete this user?"
        confirmLabel="Delete"
        type="delete"
      />
    </AdminLayout>
  );
};

export default UserTable;
