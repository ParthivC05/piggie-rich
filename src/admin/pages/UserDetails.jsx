import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AdminLayout from "../components/AdminLayout";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    role: "",
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
  });
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
      firstName: data.user.firstName || "",
      lastName: data.user.lastName || "",
      dob: data.user.dob || "",
      phone: data.user.phone || "",
    });
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    
    if (!editForm.username.trim()) {
      toast.error('Username is required');
      return;
    }
    
    if (!editForm.email.trim()) {
      toast.error('Email is required');
      return;
    }
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (editForm.phone && editForm.phone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(editForm.phone.replace(/[\s\-\(\)]/g, ''))) {
        toast.error('Please enter a valid phone number');
        return;
      }
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });
      
      if (response.ok) {
        const roleChangeMessage = editForm.role !== user.role 
          ? `User role changed from "${user.role}" to "${editForm.role}" successfully!`
          : 'User details updated successfully!';
        toast.success(roleChangeMessage);
        setEditMode(false);
        await fetchUser();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to update user: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Network error occurred while updating user');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        toast.success(`User "${user.username}" has been deleted successfully!`);
        navigate("/admin/users");
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete user: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error('Network error occurred while deleting user');
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async () => {
    const action = user.blocked ? 'unblock' : 'block';
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}/block`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blocked: !user.blocked }),
      });
      
      if (response.ok) {
        const actionText = user.blocked ? 'unblocked' : 'blocked';
        toast.success(`User "${user.username}" has been ${actionText} successfully!`);
        await fetchUser();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to ${action} user: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error(`Network error occurred while ${action}ing user`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <AdminLayout>
        <div className="text-center py-12 text-xl text-gray-600 animate-pulse">Loading user details...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white rounded-3xl p-8 mb-10 shadow-lg">
        <h1 className="text-5xl font-black tracking-tight drop-shadow-lg">👤 User Details</h1>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-2xl space-y-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">

        {editMode ? (
          <form onSubmit={handleEdit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Username", value: editForm.username, key: "username" },
                { label: "Email", value: editForm.email, key: "email" },
                { label: "First Name", value: editForm.firstName, key: "firstName" },
                { label: "Last Name", value: editForm.lastName, key: "lastName" },
                { label: "Date of Birth", value: editForm.dob, key: "dob", type: "date" },
                { label: "Phone", value: editForm.phone, key: "phone" },
              ].map(({ label, value, key, type }) => (
                <div key={key}>
                  <label className="block text-gray-700 font-medium mb-2">{label}</label>
                  <input
                    type={type || "text"}
                    className="border border-gray-300 bg-gray-50 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={value}
                    onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))}
                    required={["username", "email"].includes(key)}
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Role</label>
                <select
                  className="border border-gray-300 bg-gray-50 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={editForm.role}
                  onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="cashier">Cashier</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl transition-all duration-300"
                onClick={() => setEditMode(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
              <div className="space-y-5">
                <div><span className="font-semibold text-gray-600">Username:</span> {user.username}</div>
                <div><span className="font-semibold text-gray-600">Email:</span> {user.email}</div>
                <div><span className="font-semibold text-gray-600">First Name:</span> {user.firstName || "Not provided"}</div>
                <div><span className="font-semibold text-gray-600">Last Name:</span> {user.lastName || "Not provided"}</div>
              </div>
              <div className="space-y-5">
                <div><span className="font-semibold text-gray-600">Date of Birth:</span> {user.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}</div>
                <div><span className="font-semibold text-gray-600">Phone:</span> {user.phone || "Not provided"}</div>
                <div><span className="font-semibold text-gray-600">Role:</span> <span className="capitalize">{user.role}</span></div>
                <div>
                  <span className="font-semibold text-gray-600">Status:</span>{" "}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    user.blocked ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                  }`}>
                    {user.blocked ? "Blocked" : "Active"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
                onClick={() => setEditMode(false)}
              >
                Edit
              </button>
              <button
                className={`px-6 py-3 rounded-xl text-white shadow-lg transition-all duration-300 ${
                  user.blocked ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
                }`}
                onClick={handleBlockToggle}
                disabled={false}
              >
                {user.blocked ? "Unblock" : "Block"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
                onClick={handleDelete}
                disabled={false}
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
