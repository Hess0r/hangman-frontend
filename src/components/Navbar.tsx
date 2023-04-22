import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { authSelector, logout } from "../lib/slices/authSlice";
import { useAppDispatch } from "../lib/store";

const Navbar: React.FC<{}> = () => {
  const { status } = useSelector(authSelector);
  const dispatch = useAppDispatch();

  const location = useLocation();

  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  React.useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between h-16 px-4 py-2">
        <div>
          <Link to="/">
            <img src="/attrecto-144x50.png" alt="logo" />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setShowMobileMenu(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex gap-4">
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

      {showMobileMenu && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-10"></div>
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-end">
              <button type="button" onClick={() => setShowMobileMenu(false)}>
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-6 items-end">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
