import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="mt-8 py-8 px-4 sm:px-16 w-full md:w-4/6 max-w-5xl bg-white mx-auto rounded-lg">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
