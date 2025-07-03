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
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Username</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-2 py-1">{u.username}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
              <td className="border px-2 py-1">{u.blocked ? "Blocked" : "Active"}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => navigate(`/admin/users/${u._id}`)}
                  className="text-blue-600 underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default UserList;