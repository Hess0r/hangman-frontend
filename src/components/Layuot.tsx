import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout: React.FC = () => {

  return (
    <div>
      <Navbar />
      <div className="mt-8 py-8 px-16 w-full max-w-5xl bg-white mx-auto rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
