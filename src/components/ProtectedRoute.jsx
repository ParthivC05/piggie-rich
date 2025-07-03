import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (!token) return <Navigate to="/login" />;

  // If user tries to access admin route but is not admin, redirect to home
  if (location.pathname.startsWith("/admin") && role !== "admin") {
    return <Navigate to="/" />;
  }

  // If admin tries to access user route, redirect to admin dashboard
  if (!location.pathname.startsWith("/admin") && role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;