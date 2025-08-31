import { useDispatch, useSelector } from "react-redux";
import { logout, logoutUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import batmanLogo from "../assets/batman-9.svg"

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Rotating hologram logo */}
      <div className="relative w-48 h-48 mb-12 animate-spin-slow">
            {/* Glow background */}
            <div className="absolute inset-0 rounded-full bg-yellow-500 blur-3xl opacity-30 animate-pulse"></div>

                {/* Logo */}
                <img
                    src={batmanLogo}
                    alt="Batman Logo"
                    className="relative w-full h-full opacity-90 drop-shadow-[0_0_35px_rgba(255,255,0,0.8)]"
                />
      </div>
      

      {/* Welcome text */}
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {user?.username || "Dark Knight"}
      </h1>
      <p className="mb-12 text-yellow-400">
        Gotham’s Watchful Protector of Finances
      </p>

      {/* Batcomputer style dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
        <div className="p-6 bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-yellow-500/30 hover:scale-105 transition">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">💰 Expenses</h2>
          <p>View and track your daily expenses like a true detective.</p>
        </div>
        <div className="p-6 bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-yellow-500/30 hover:scale-105 transition">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">➕ Add Expense</h2>
          <p>Log a new expense directly into Gotham’s Batcomputer.</p>
        </div>
        <div
          onClick={handleLogout}
          className="p-6 bg-red-700/70 backdrop-blur-md rounded-xl shadow-lg border border-red-500/40 hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-bold text-red-300 mb-2">🚪 Logout</h2>
          <p>Exit securely and return when Gotham needs you.</p>
        </div>
      </div>
    </div>
  );
}

