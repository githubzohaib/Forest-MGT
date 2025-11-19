import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import AuthLayout from "./components/layouts/AuthLayout";

import Login from "./components/layouts/Login";
import DashboardUser from "./components/layouts/DashboardUser";
import DashboardRanger from "./components/layouts/DashboardRanger";
import DashboardAdmin from "./components/layouts/DashboardAdmin";
import Weather from "./components/layouts/Weather";
import AnimalsList from "./components/layouts/Animals";
import Reports from "./components/layouts/Reports";
import AdminEdit from "./components/layouts/Adminedit"; // ✅ import AdminEdit
import LandingPage from "./components/layouts/landingpage";
import Chat from "./components/layouts/Chat";
export const router = createBrowserRouter([
  // 🔓 PUBLIC ROUTES
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { index: true, element: <Navigate to="/auth/login" replace /> },
    ],
  },

  // 🔒 PROTECTED ROUTES
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // ✅ Role-based dashboards
      { path: "DashboardUser", element: <DashboardUser /> },
      { path: "DashboardRanger", element: <DashboardRanger /> },
      { path: "DashboardAdmin", element: <DashboardAdmin /> },

      // ✅ Common pages
      { path: "weather", element: <Weather /> },
      { path: "animals", element: <AnimalsList /> },
      { path: "reports", element: <Reports /> },

      // ✅ Admin Edit page
      { path: "adminedit", element: <AdminEdit /> },
      { path: "landingpage", element: <LandingPage /> },
      { path: "chat", element: <Chat userEmail="admin@gmail.com" userRole="admin" /> },

     


      // Default redirect (root → login)
      { index: true, element: <Navigate to="/auth/login" replace /> },

    ],
  },
]);
