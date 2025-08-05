import { useLocation } from "react-router-dom";

import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const pathTitleMap = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "User Management",
  "/admin/users/edituser": "Edit User",
  "/admin/details": "User Management",
  "/admin/cms": "Content Management",
  "/admin/transactions": "Transactions",
  "/admin/settings": "Settings",
  "/admin/cashiers": "Cashiers",
  "/admin/admins": "Admins",
};

function AdminHeader() {
  const location = useLocation();
  const title = pathTitleMap[location.pathname] || "Admin Panel";
  const navigate = useNavigate()

  const showAdminProfile = () => {
  navigate("/admin/adminProfile")
  }

  return (
    <div className="bg-white py-4 px-6 flex justify-between items-center rounded-bl-[32px]">
      {/* Left: Title */}
      <h2 className="text-2xl font-bold text-black">{title}</h2>

      {/* Right: Search, Notification, Profile, Dropdown */}
      

        {/* Profile with dropdown */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/profilePic.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
            onClick={showAdminProfile}
          />
          <FaChevronDown className="text-sm text-gray-700" />
        </div>
      </div>

  );
}

export default AdminHeader;
