import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC<{}> = () => {
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between h-16 px-4 py-2">
        <div>
          <Link to="/">
            <img src="/attrecto-144x50.png" alt="logo" />
          </Link>
        </div>
        <div className="flex">
          <Link to="/admin" className="text-gray-500 uppercase text-xs">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
