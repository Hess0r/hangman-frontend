import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-8 py-8 px-4 sm:px-16 w-full md:w-4/6 bg-white mx-auto rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
