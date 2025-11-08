import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AppLayout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // ✅ Listen for changes in localStorage (like logout or login)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Handle redirection based on login status and role
  useEffect(() => {
    if (!token) {
      // If not logged in → go to login page
      navigate("/auth/login", { replace: true });
      return;
    }

    // Redirect to correct dashboard if user is at root or /dashboard
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/dashboard"
    ) {
      switch (role) {
        case "Visitor":
          navigate("/DashboardUser", { replace: true });
          break;
        case "Ranger":
          navigate("/DashboardRanger", { replace: true });
          break;
        case "Admin":
          navigate("/DashboardAdmin", { replace: true });
          break;
        default:
          navigate("/auth/login", { replace: true });
      }
    }
  }, [token, role, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <main className="p-6 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
