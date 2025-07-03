import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", email: "", role: "", phone: "" });
  const [logs, setLogs] = useState([]);
  const [logsUser, setLogsUser] = useState(null);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [usersRes, depositsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/deposits`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const usersData = await usersRes.json();
        const depositsData = await depositsRes.json();

        setUsers(usersData.users || []);
        setDeposits(depositsData.deposits || []);
      } catch (err) {
        console.error("Error fetching data", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u._id !== userId));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${userId}/block`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blocked: !isBlocked }),
      });
      setUsers(users.map((u) => (u._id === userId ? { ...u, blocked: !isBlocked } : u)));
    } catch (error) {
      console.error("Block/Unblock failed:", error);
    }
  };

  const handleEdit = (u) => {
    setEditUser(u);
    setEditForm({ username: u.username, email: u.email, role: u.role, phone: u.phone });
  };

  const handleEditSave = async () => {
    try {
      await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${editUser._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });
      setUsers(users.map(u => u._id === editUser._id ? { ...u, ...editForm } : u));
      setEditUser(null);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const handleLogs = async (u) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${u._id}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLogs(data.logs || []);
      setLogsUser(u);
    } catch (error) {
      setLogs([]);
      setLogsUser(u);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold animate-pulse">Loading Admin Data...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-md"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, idx) => (
                <tr key={u._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border px-4 py-2">{u.username}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2 capitalize">{u.role}</td>
                  <td className="border px-4 py-2">
                    {u.blocked ? (
                      <span className="text-red-500">Blocked</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleBlockToggle(u._id, u.blocked)}
                      className={`px-3 py-1 text-sm ${
                        u.blocked ? "bg-green-500" : "bg-yellow-500"
                      } text-white rounded hover:opacity-90`}
                    >
                      {u.blocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => handleLogs(u)}
                      className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Logs
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <input
              className="border p-2 mb-2 w-full"
              value={editForm.username}
              onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))}
              placeholder="Username"
            />
            <input
              className="border p-2 mb-2 w-full"
              value={editForm.email}
              onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
              placeholder="Email"
            />
            <input
              className="border p-2 mb-2 w-full"
              value={editForm.phone}
              onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="Phone"
            />
            <select
              className="border p-2 mb-2 w-full"
              value={editForm.role}
              onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
            </select>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Modal */}
      {logsUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Activity Logs for {logsUser.username}</h2>
            <ul>
              {logs.length === 0 && <li>No logs found.</li>}
              {logs.map(log => (
                <li key={log._id}>
                  Deposit: ${log.amount} on {new Date(log.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
            <button
              className="bg-gray-300 px-4 py-2 rounded mt-4"
              onClick={() => setLogsUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Deposits Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Deposits</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Game</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((d, idx) => (
                <tr key={d._id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border px-4 py-2">{d.userId?.username}</td>
                  <td className="border px-4 py-2">{d.userId?.email}</td>
                  <td className="border px-4 py-2">{d.game}</td>
                  <td className="border px-4 py-2 text-green-600">${d.amount}</td>
                  <td className="border px-4 py-2">{new Date(d.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;