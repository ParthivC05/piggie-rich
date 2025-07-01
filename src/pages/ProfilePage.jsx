import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => navigate("/login"));
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <div className="mb-3"><strong>Username:</strong> {user.username}</div>
        <div className="mb-3"><strong>First Name:</strong> {user.firstName}</div>
        <div className="mb-3"><strong>Last Name:</strong> {user.lastName}</div>
        <div className="mb-3"><strong>Email:</strong> {user.email}</div>
        <div className="mb-3"><strong>Phone:</strong> {user.phone}</div>
        <div className="mb-3"><strong>Date of Birth:</strong> {user.dob}</div>
      </div>
    </div>
  );
};

export default ProfilePage;