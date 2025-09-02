import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBudgets } from "../features/budget/budgetSlice";
import axiosInstance from "../features/axiosInstance"; // make sure this exists
import batmanLogo from "../assets/batman-9.svg";

export default function Budgets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: budgets, loading, error } = useSelector((state) => state.budgets);

  // Fetch budgets on component mount
  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  const handleAddBudget = () => {
    navigate("/add-budget");
  };

  // Delete budget function
  const handleDeleteBudget = async (category, month, year) => {
    if (!window.confirm(`Are you sure you want to delete the budget for ${category} (${month}/${year})?`)) return;

    try {
      await axiosInstance.delete(`budgets/${category}/${month}/${year}/remove-budget`);
      // Refresh budgets
      dispatch(fetchBudgets());
    } catch (err) {
      console.error("Failed to delete budget:", err);
      alert("Failed to delete budget. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6">
      {/* Logo hologram */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full bg-yellow-500 blur-2xl opacity-20 animate-pulse"></div>
        <img
          src={batmanLogo}
          alt="Batman Logo"
          className="relative w-full h-full opacity-90 drop-shadow-[0_0_25px_rgba(255,255,0,0.7)]"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 text-yellow-400">Budgets Dashboard</h1>
      <p className="mb-6 text-gray-400">Track and manage Gotham’s resources like Batman.</p>

      {/* Add Budget Button */}
      <button
        onClick={handleAddBudget}
        className="mb-8 px-5 py-2 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition"
      >
        ➕ Add New Budget
      </button>

      {/* Loading / Error */}
      {loading && <p className="text-yellow-400 mb-4">Loading budgets...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {budgets.map((budget) => (
          <div
            key={budget.id}
            className={`p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border 
              ${budget.remainingAmount < 0 ? "border-red-500/50" : "border-yellow-500/30"} 
              hover:scale-105 transition`}
          >
            <h2 className="text-xl font-bold text-yellow-400 mb-2">
              {budget.category} ({budget.month}/{budget.year})
            </h2>
            <p className="text-lg mb-1">
              💵 Limit: <span className="text-green-400">₹{budget.limitAmount}</span>
            </p>
            <p className="text-lg mb-1">
              🛒 Spent: <span className="text-red-400">₹{budget.spentAmount}</span>
            </p>
            <p className="text-lg mb-1">
              💰 Remaining: <span className={budget.remainingAmount < 0 ? "text-red-500" : "text-green-400"}>
                ₹{budget.remainingAmount}
              </span>
            </p>
            <p className="text-lg mb-1">
              Status: <span className={budget.status === "UNDER_BUDGET" ? "text-green-400" : "text-red-500"}>
                {budget.status.replace("_", " ")}
              </span>
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full ${budget.percentageUsed > 100 ? "bg-red-500" : "bg-yellow-400"}`}
                style={{ width: `${Math.min(budget.percentageUsed, 100)}%` }}
              />
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteBudget(budget.category, budget.month, budget.year)}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
            >
              🗑️ Delete Budget
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
