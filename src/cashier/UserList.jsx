import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaFilter } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

const API = import.meta.env.VITE_AUTH_API_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterData,setFilterData] = useState(users)
  const [filter, setFilter] = useState({
    username: "",
    email: "",
    role: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filter).forEach(([k, v]) => v && params.append(k, v));

      const res = await fetch(
        `${API}/cashier/users?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setUsers(data.users || []);
      setFilterData(data.users || [])
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (e) =>
    setFilter({ ...filter, [e.target.name]: e.target.value });

const handleFilterSubmit = (e) => {
  e.preventDefault();

  const filteredUsers = users.filter((user) => {
    const usernameMatch = !filter.username || user.username === filter.username;
    const emailMatch = !filter.email || user.email === filter.email;
    const roleMatch = !filter.role || user.role === filter.role;
    const statusMatch =
      !filter.status ||
      (filter.status === "active" && !user.blocked) ||
      (filter.status === "blocked" && user.blocked);

    // All active filters must match
    return usernameMatch && emailMatch && roleMatch && statusMatch;
  });


  setFilterData(filteredUsers)
  
};

console.log(filterData)


  const clearFilters = () => {
    setFilter({
      username: "",
      email: "",
      role: "",
      status: "",
    });
    fetchUsers();
  };

  const getStatusBadge = (blocked) => {
    return blocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: "bg-purple-100 text-purple-800",
      cashier: "bg-blue-100 text-blue-800",
      user: "bg-gray-100 text-gray-800",
    };
    return roleConfig[role] || "bg-gray-100 text-gray-800";
  };

  
  console.log(users)
  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 shadow-lg">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-lg">👥 Users</h1>
        <p className="text-base sm:text-xl mt-2 opacity-90">View all registered users</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            <button
              onClick={fetchUsers}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
            <IoMdRefresh/>
              Refresh
            </button>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-lg font-semibold text-gray-700">
              Total Users: <span className="text-purple-600">{users.length}</span>
            </p>
            <p className="text-sm text-gray-500">
              Active Users: <span className="text-green-600 font-semibold">
                {users.filter(user => !user.blocked).length}
              </span>
            </p>
          </div>
        </div>

        {showFilters && (
          <form onSubmit={handleFilterSubmit} className="bg-gray-50 p-6 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Username", name: "username", type: "text", placeholder: "Search by Username" },
                { label: "Email", name: "email", type: "email", placeholder: "Search by Email" },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-gray-700 font-medium mb-2">{label}</label>
                  <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={filter[name]}
                    onChange={handleFilterChange}
                    className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Role</label>
                <select
                  name="role"
                  value={filter.role}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">All Roles</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={filter.status}
                  onChange={handleFilterChange}
                  className="border border-gray-300 bg-white p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={clearFilters}
                className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl transition-all duration-300"
              >
                Clear Filters
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto rounded-2xl">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading users...</p>
            </div>
          ) : filterData.length === 0 && showFilters ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-lg sm:text-xl text-gray-600">No users found</p>
              <p className="text-gray-500 text-sm">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-sm">
                <tr>
                  <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">User</th>
                  <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">Role</th>
                  <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">Status</th>
                  <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {
                  showFilters ?
filterData.map((user, idx) => (
                  <tr key={user._id} className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-3 py-3 sm:px-6 sm:py-4 break-words">
                      <div className="font-semibold text-gray-900">{user.username}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      {user.firstName && user.lastName && (
                        <div className="text-xs text-gray-400">{user.firstName} {user.lastName}</div>
                      )}
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(user.blocked)}`}>
                        {user.blocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <button 
                        onClick={() => navigate(`/cashier/users/${user._id}`)}
                        className="text-purple-600 hover:text-purple-800 transition-colors p-2 rounded-lg hover:bg-purple-50"
                        title="View Details"
                      >
                        <FaEye className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))
                  :
users.map((user, idx) => (
                  <tr key={user._id} className={`hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-3 py-3 sm:px-6 sm:py-4 break-words">
                      <div className="font-semibold text-gray-900">{user.username}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      {user.firstName && user.lastName && (
                        <div className="text-xs text-gray-400">{user.firstName} {user.lastName}</div>
                      )}
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(user.blocked)}`}>
                        {user.blocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <button 
                        onClick={() => navigate(`/cashier/users/${user._id}`)}
                        className="text-purple-600 hover:text-purple-800 transition-colors p-2 rounded-lg hover:bg-purple-50"
                        title="View Details"
                      >
                        <FaEye className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;