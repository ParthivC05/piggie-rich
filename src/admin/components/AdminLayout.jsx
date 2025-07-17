import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => (
  // <div className="flex min-h-screen bg-[#f6f7fb]">

  //
  // </div>
  <div className="flex min-h-screen bg-[#f6f7fb]">
    <AdminSidebar />

    <div className="flex flex-col flex-1">
      <AdminHeader />

      <div className="p-4">
        <main className="flex-1 bg-gray-100 ">{children}</main>
      </div>
    </div>
  </div>
);

export default AdminLayout;
