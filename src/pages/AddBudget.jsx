import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBudget } from "../features/budget/budgetSlice";
import batmanLogo from "../assets/batman-9.svg";

export default function AddBudget() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.budgets);

  const now = new Date();
  const [month, year] = [
    now.toLocaleString("en-IN", { month: "numeric" }),
    now.toLocaleString("en-IN", { year: "numeric" }),
  ];

  const [form, setForm] = useState({
    category: "",
    limitAmount: "",
    month: Number(month),
    year: Number(year),
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addBudget(form)).unwrap(); // 🔗 dispatch to backend
      navigate("/view-budgets"); // go back to dashboard
    } catch (err) {
      console.error("Failed to add budget:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6">
      {/* Logo hologram */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full bg-yellow-500 blur-3xl opacity-20 animate-pulse"></div>
        <img
          src={batmanLogo}
          alt="Batman Logo"
          className="relative w-full h-full opacity-90 drop-shadow-[0_0_25px_rgba(255,255,0,0.7)]"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2 text-yellow-400">Add New Budget</h1>
      <p className="mb-8 text-gray-400">
        Plan Gotham’s resources with precision and foresight.
      </p>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-yellow-500/30"
      >
        {/* Category */}
        <div className="mb-4">
          <label className="block text-yellow-400 mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">-- Select Category --</option>
            <option value="Food">🍔 Food</option>
            <option value="Leisure">🎮 Leisure</option>
            <option value="Vehicle">🚗 Vehicle</option>
            <option value="Subscription">📺 Subscription</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Bills">💡 Bills</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Travel">✈️ Travel</option>
            <option value="Health">💊 Health</option>
            <option value="Education">📚 Education</option>
            <option value="Others">🦇 Others</option>
          </select>
        </div>

        {/* Limit Amount and Month/Year next to each other */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-yellow-400 mb-1">Limit Amount</label>
            <input
              type="number"
              name="limitAmount"
              value={form.limitAmount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-yellow-400 mb-1">Month</label>
            <input
              type="number"
              name="month"
              value={form.month}
              onChange={handleChange}
              required
              min="1"
              max="12"
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-yellow-400 mb-1">Year</label>
            <input
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              min="2000"
              max="2100"
              className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate("/budgets")}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition"
          >
            {loading ? "Saving..." : "Save Budget"}
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </form>
    </div>
  );
}
