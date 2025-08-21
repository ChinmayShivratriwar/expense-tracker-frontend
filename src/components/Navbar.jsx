import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-black shadow-lg shadow-yellow-500/20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-yellow-400 tracking-wide hover:text-yellow-300 transition"
          >
            GothamTracker 🦇
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <React.Fragment>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 rounded bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition shadow-md shadow-yellow-500/30"
                >
                  Register
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span className="text-gray-300">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-500 transition shadow-md shadow-red-600/30"
                >
                  Logout
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}