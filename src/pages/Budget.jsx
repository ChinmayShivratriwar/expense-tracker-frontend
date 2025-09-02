import { useNavigate } from "react-router-dom";
import batmanLogo from "../assets/batman-9.svg";

export default function BudgetDashboard() {
  const navigate = useNavigate();

  const handleAddBudget = () => {
    navigate("/add-budget");
  };

  const handleViewBudgets = () => {
    navigate("/view-budgets");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Rotating hologram bat logo */}
      <div className="relative w-40 h-40 mb-12 animate-spin-slow">
        <div className="absolute inset-0 rounded-full bg-yellow-500 blur-3xl opacity-30 animate-pulse"></div>
        <img
          src={batmanLogo}
          alt="Batman Logo"
          className="relative w-full h-full opacity-90 drop-shadow-[0_0_35px_rgba(255,255,0,0.8)]"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">Budget Control Center</h1>
      <p className="mb-12 text-yellow-400">
        Manage your Gotham funds wisely, Dark Knight.
      </p>

      {/* Batcomputer style dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-6">
        {/* Add Budget */}
        <div
          onClick={handleAddBudget}
          className="p-6 bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-yellow-500/30 hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-bold text-yellow-400 mb-2">➕ Add Budget</h2>
          <p>Allocate funds for a category and set limits for the month.</p>
        </div>

        {/* View Budgets */}
        <div
          onClick={handleViewBudgets}
          className="p-6 bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-yellow-500/30 hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-bold text-yellow-400 mb-2">📊 View Budgets</h2>
          <p>Check allocated, spent, and remaining funds with Bat precision.</p>
        </div>
      </div>
    </div>
  );
}
