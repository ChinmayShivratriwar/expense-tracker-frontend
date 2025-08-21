// Layout.jsx
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100">
      <div className="bg-yellow-500 text-black font-bold p-4 rounded-xl shadow-lg shadow-yellow-500/40 mb-6 text-center w-full max-w-2xl">
        🦇 Welcome to Gotham's Expense Tracker
      </div>
      <Outlet />
    </div>
  );
}
