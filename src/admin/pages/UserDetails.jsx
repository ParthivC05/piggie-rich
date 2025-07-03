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

  if (!user) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">User Detail</h1>
      {editMode ? (
        <form onSubmit={handleEdit} className="mb-4 space-y-2">
          <div>
            <label className="block font-semibold">Username:</label>
            <input
              className="border p-2 rounded w-full"
              value={editForm.username}
              onChange={e => setEditForm(f => ({ ...f, username: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              className="border p-2 rounded w-full"
              value={editForm.email}
              onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Role:</label>
            <select
              className="border p-2 rounded w-full"
              value={editForm.role}
              onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
            </select>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setEditMode(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="mb-2"><strong>Username:</strong> {user.username}</div>
          <div className="mb-2"><strong>Email:</strong> {user.email}</div>
          <div className="mb-2"><strong>Role:</strong> {user.role}</div>
          <div className="mb-2"><strong>Status:</strong> {user.blocked ? "Blocked" : "Active"}</div>
          <div className="flex gap-2 mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            <button
              className={`px-4 py-2 rounded text-white ${user.blocked ? "bg-green-600" : "bg-yellow-500"}`}
              onClick={handleBlockToggle}
              disabled={loading}
            >
              {user.blocked ? "Unblock" : "Block"}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default UserDetail;