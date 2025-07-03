import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []));
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2">{u.username}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">{u.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      u.blocked
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {u.blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => navigate(`/admin/users/${u._id}`)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UserList;
