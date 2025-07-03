import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", email: "", role: "" });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchUser = async () => {
    const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUser(data.user);
    setEditForm({
      username: data.user.username,
      email: data.user.email,
      role: data.user.role,
    });
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editForm),
    });
    setEditMode(false);
    await fetchUser();
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setLoading(false);
    navigate("/admin/users");
  };

  const handleBlockToggle = async () => {
    setLoading(true);
    await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}/block`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blocked: !user.blocked }),
    });
    await fetchUser();
    setLoading(false);
  };

  if (!user) {
    return (
      <AdminLayout>
        <div className="text-center py-12 text-xl text-gray-600">Loading user details...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 mb-8 shadow-inner">
        <h1 className="text-4xl font-extrabold text-blue-800">User Details</h1>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        {editMode ? (
          <form onSubmit={handleEdit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Username</label>
              <input
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editForm.username}
                onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editForm.email}
                onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Role</label>
              <select
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editForm.role}
                onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
                onClick={() => setEditMode(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="space-y-4 text-lg">
              <div><span className="font-semibold">Username:</span> {user.username}</div>
              <div><span className="font-semibold">Email:</span> {user.email}</div>
              <div><span className="font-semibold">Role:</span> {user.role}</div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  user.blocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                }`}>
                  {user.blocked ? "Blocked" : "Active"}
                </span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
              <button
                className={`px-5 py-2 rounded-lg text-white shadow-md ${
                  user.blocked
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
                onClick={handleBlockToggle}
                disabled={loading}
              >
                {user.blocked ? "Unblock" : "Block"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md"
                onClick={handleDelete}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserDetail;
