import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

const AppLayout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Watch for token changes (login/logout updates)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Redirect logic
  useEffect(() => {
    if (!token) {
      // Not logged in → Go to login
      navigate("/auth/login");
    } else if (window.location.pathname === "/") {
      // Logged in but still on root → Go to dashboard
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;


