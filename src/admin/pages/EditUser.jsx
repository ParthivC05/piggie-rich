import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "",
    phone: "",
    dob: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setForm({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          username: data.user.username || "",
          email: data.user.email || "",
          role: data.user.role || "",
          phone: data.user.phone || "",
          dob: data.user.dob ? data.user.dob.split('T')[0] : "",
        });
      } else {
        toast.error(data.error || "Failed to fetch user");
        navigate("/admin/users");
      }
    } catch (err) {
      toast.error("Server error");
      navigate("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCancel = () => {
    navigate("/admin/users");
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("User updated successfully");
        setTimeout(() => navigate("/admin/users"), 1500);
      } else {
        toast.error(data.error || "Failed to update user");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          <span className="ml-4 text-lg">Loading user data...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <ToastContainer />
      <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-4xl mx-auto mt-4">
        <h2 className="text-xl font-semibold mb-6 text-center md:text-left">
          Edit User
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={form.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">User Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter User Name"
              value={form.username}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select the Role</option>
              <option value="admin">Admin</option>
              <option value="cashier">Cashier</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-gradient-to-b from-yellow-400 to-yellow-600 text-white rounded hover:brightness-110 transition"
          >
            Update
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditUser;
