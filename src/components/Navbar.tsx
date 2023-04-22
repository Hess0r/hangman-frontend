import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC<{}> = () => {
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between h-16 px-4 py-2">
        <div>
          <Link to="/">
            <img src="/attrecto-144x50.png" alt="logo" />
          </Link>
        </div>

        <div className="flex gap-4">
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `uppercase text-xs ${isActive ? "font-bold" : ""}`
            }
          >
            Leaderboard
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `uppercase text-xs ${isActive ? "font-bold" : ""}`
            }
          >
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
