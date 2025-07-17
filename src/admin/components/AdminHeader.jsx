import { useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";

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

  return (
    <div className="bg-white py-4 px-6 flex justify-between items-center rounded-bl-[32px]">
      {/* Left: Title */}
      <h2 className="text-2xl font-bold text-black">{title}</h2>

      {/* Right: Search, Notification, Profile, Dropdown */}
      <div className="flex items-center gap-6">
        <CiSearch className="text-[24px] text-gray-600 cursor-pointer" />
        <IoIosNotificationsOutline className="text-[26px] text-gray-600 cursor-pointer" />

        {/* Profile with dropdown */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="/profilePic.png"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <FaChevronDown className="text-sm text-gray-700" />
        </div>
      </div>

    </div>
  );
}

export default AdminHeader;
