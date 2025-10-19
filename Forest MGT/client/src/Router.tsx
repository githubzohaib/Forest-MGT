// import { createBrowserRouter, Navigate } from "react-router-dom";
// import Applayout from "./components/layouts/AppLayout";
// import NoMatch from "./pages/NoMatch";
// import Error500 from "./pages/Error500";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Applayout/>,
//   },
//   {
//     path: "/error", // ✅ NEW
//     element: <Error500 />,
//   },
//   {
//     path: "*",
//     element: <NoMatch />,
//   },
// ], {
//   basename: global.basename
// });

import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "./components/layouts/AppLayout";
import AuthLayout from "./components/layouts/AuthLayout";

import Login from "./components/layouts/Login";
// import Register from "./components/layouts/Register";
import Dashboard from "./components/layouts/Dashboard";
import AnimalsList from "./components/layouts/Animals";
import Reports from "./components/layouts/Reports";
import Weather from "./components/layouts/Weather";
import AnimalSearch from "./components/layouts/AnimalSearch";

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
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "animals", element: <AnimalsList /> },
      { path: "reports", element: <Reports /> },
      { path: "weather", element: <Weather /> },
      {path: "Animalsearch",element:<AnimalSearch/>}
    ],
  },
]);
