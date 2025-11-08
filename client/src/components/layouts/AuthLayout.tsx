import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
