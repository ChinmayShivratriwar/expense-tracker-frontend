import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  const [unauthorized, setUnauthorized] = useState(false);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded?.role;

    if (role === "ADMIN") {
      return children;
    } else {
      // show alert for 2s before redirect
      setTimeout(() => setUnauthorized(true), 2000);
      return (
        <div className="flex items-center justify-center h-screen bg-black text-yellow-400">
          <div className="p-6 rounded-xl bg-gray-900/80 border border-yellow-500/40 shadow-lg text-center max-w-md">
            <h1 className="text-2xl font-bold mb-3">🦇 Access Denied</h1>
            <p className="text-gray-300">
              You are not an <span className="text-yellow-400">Admin</span>.  
              Gotham’s Batcomputer is off-limits.
            </p>
            <p className="mt-2 text-sm text-gray-500">Redirecting you back to safety...</p>
          </div>
          {unauthorized && <Navigate to="/" replace />}
        </div>
      );
    }
  } catch (err) {
    console.error("Token decode failed:", err);
    return <Navigate to="/login" replace />;
  }
}
