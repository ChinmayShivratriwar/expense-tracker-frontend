import { useState } from "react";
import { useNavigate } from "react-router-dom";
import batmanLogo from "../assets/batman-9.svg";

export default function Budgets() {
  const navigate = useNavigate();

  // Dummy data (replace with Redux or API later)
  const [budgets, setBudgets] = useState([
    { id: 1, name: "Housing", amount: 20000, category: "🏠 Housing", description: "Rent + utilities" },
    { id: 2, name: "Food", amount: 8000, category: "🍔 Food", description: "Groceries and dining out" },
    { id: 3, name: "Savings", amount: 10000, category: "💎 Savings", description: "Emergency fund + investments" },
  ]);

  const handleAddBudget = () => {
    navigate("/add-budget");
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

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {budgets.map((budget) => (
          <div
            key={budget.id}
            className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-yellow-500/30 hover:scale-105 transition cursor-pointer"
          >
            <h2 className="text-xl font-bold text-yellow-400 mb-2">
              {budget.category} {budget.name}
            </h2>
            <p className="text-lg mb-1">💵 Amount: <span className="text-green-400">₹{budget.amount}</span></p>
            <p className="text-sm text-gray-400">{budget.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
