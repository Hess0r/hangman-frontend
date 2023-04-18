import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authSelector } from "../lib/slices/authSlice";
import Navbar from "./Navbar";

const ProtectedLayout: React.FC = () => {
  const { status } = useSelector(authSelector);

  if (status !== "authenticated") {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-8 py-8 px-16 w-full max-w-5xl bg-white mx-auto rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
