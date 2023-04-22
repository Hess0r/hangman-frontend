import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { authSelector, logout } from "../lib/slices/authSlice";
import { useAppDispatch } from "../lib/store";

const Navbar: React.FC<{}> = () => {
  const { status, loading } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

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

          {status === "authenticated" ? (
            <>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `uppercase text-xs ${isActive ? "font-bold" : ""}`
                }
              >
                Admin
              </NavLink>
              <button
                className="uppercase text-xs"
                onClick={() => handleLogout()}
              >
                Sign out
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `uppercase text-xs ${isActive ? "font-bold" : ""}`
              }
            >
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
