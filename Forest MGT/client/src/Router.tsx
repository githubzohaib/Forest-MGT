import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import AuthLayout from "./components/layouts/AuthLayout";

import Login from "./components/layouts/Login";
// import Register from "./components/layouts/Register";
import Dashboard from "./components/layouts/Dashboard";
import AnimalsList from "./components/layouts/Animals";
import Reports from "./components/layouts/Reports";

export const router = createBrowserRouter([
  // 🔓 Public routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      // { path: "register", element: <Register /> },
    ],
  },

  // 🔒 Private (authenticated) routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // Redirect root to login page instead of dashboard
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "animals", element: <AnimalsList /> },
      { path: "reports", element: <Reports /> },
    ],
  },
]);
