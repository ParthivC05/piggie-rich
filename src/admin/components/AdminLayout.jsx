import React from "react";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <AdminSidebar />
    <main className="flex-1 bg-gray-100 p-8">{children}</main>
  </div>
);

export default AdminLayout;