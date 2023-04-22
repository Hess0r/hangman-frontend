import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { authSelector } from "../lib/slices/authSlice";

const ProtectedLayout: React.FC = () => {
  const { status } = useSelector(authSelector);

  if (status !== "authenticated") {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
