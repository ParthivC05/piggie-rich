import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaCalendar, FaIdCard } from "react-icons/fa";

const API = import.meta.env.VITE_AUTH_API_URL;

const CashierUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await fetch(`${API}/cashier/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id, token]);

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: "bg-purple-100 text-purple-800",
      cashier: "bg-blue-100 text-blue-800",
      user: "bg-gray-100 text-gray-800",
    };
    return roleConfig[role] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <div className="text-center py-12 text-xl text-red-600">User not found</div>
      </div>
    );
  }

  let dobDisplay = "Not provided";
  if (user.dob) {
    const date = new Date(user.dob);
    dobDisplay = isNaN(date.getTime()) ? user.dob : date.toLocaleDateString();
  }

  return (
    <div className="p-6">
      <div className="bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 text-white rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/cashier/users')}
            className="p-2 text-white hover:text-gray-200 transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-lg">👤 User Details</h1>
        </div>
        <p className="text-base sm:text-xl opacity-90">View detailed user information</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FaUser className="text-purple-600" />
              <div>
                <span className="font-semibold text-gray-600">Username:</span>
                <div className="font-bold text-gray-900">{user.username}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-purple-600" />
              <div>
                <span className="font-semibold text-gray-600">Email:</span>
                <div className=" font-bold  text-gray-900 break-all">{user.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaIdCard className="text-purple-600" />
              <div>
                <span className="font-semibold text-gray-600">Full Name:</span>
                <div className="font-bold text-gray-900">
                  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Not provided"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendar className="text-purple-600" />
              <div>
                <span className="font-semibold text-gray-600">Date of Birth:</span>
                <div className="font-bold text-gray-900">{dobDisplay}</div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FaPhone className="text-purple-600" />
              <div>
                <span className="font-semibold text-gray-600">Phone:</span>
                <div className="font-bold text-gray-900">{user.phone || "Not provided"}</div>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Role:</span>
              <span className={`ml-2 inline-block px-3 py-1 rounded-full text-xs font-bold ${getRoleBadge(user.role)}`}>
                {user.role}
              </span>
            </div>
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
      </div>
    </div>
  );
};

export default CashierUserDetails; 