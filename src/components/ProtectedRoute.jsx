import { Navigate, useLocation } from "react-router-dom";

const publicPaths = ["/", "/game-room", "/terms", "/privacy"];

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (publicPaths.includes(location.pathname) && !token) {
    return children;
  }

  if (publicPaths.includes(location.pathname) && token) {
    if (role === "admin") return <Navigate to="/admin/dashboard" />;
    if (role === "cashier") return <Navigate to="/cashier/users" />;
  }

  if (!token) return <Navigate to="/login" />;

  if (role === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" />;
  }
  if (location.pathname.startsWith("/admin") && role !== "admin") {
      return <Navigate to="/" />;
  }

  if (role === "cashier" && !location.pathname.startsWith("/cashier")) {
    return <Navigate to="/cashier/users" />;
  }
  if (location.pathname.startsWith("/cashier") && role !== "cashier") {
    return <Navigate to="/" />;
  }

  if (role === "user" && (location.pathname.startsWith("/admin") || location.pathname.startsWith("/cashier"))) {
    return <Navigate to="/" />;
  }

  if (!role || !["admin", "cashier", "user"].includes(role)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;