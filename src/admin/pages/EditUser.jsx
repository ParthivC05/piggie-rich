import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";

const EditUser = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    role: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleStatusChange = (status) => {
    setForm({ ...form, status });
  };

  const handleCancel = () => {
    setForm({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      role: "",
      status: "",
    });
  };

  const handleUpdate = () => {
    console.log("Form submitted:", form);
  };

  return (
    <AdminLayout>
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
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="User">User</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Status</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.status === "Active"}
                  onChange={() => handleStatusChange("Active")}
                />
                <span>Active</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.status === "Inactive"}
                  onChange={() => handleStatusChange("Inactive")}
                />
                <span>Inactive</span>
              </label>
            </div>
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
