import { useState } from "react";
import { useNavigate } from "react-router-dom";
import batmanLogo from "../assets/batman-9.svg";

export default function AddBudget() {
  const [form, setForm] = useState({
    name: "",
    amount: "",
    category: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Budget Added:", form); // 🔗 replace with API call
    navigate("/budgets"); // redirect back to budget dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
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
        {/* Budget Name */}
        <div className="mb-4">
          <label className="block text-yellow-400 mb-1">Budget Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-yellow-400 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

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
            <option value="Housing">🏠 Housing</option>
            <option value="Food">🍔 Food</option>
            <option value="Transportation">🚗 Transportation</option>
            <option value="Entertainment">🎭 Entertainment</option>
            <option value="Savings">💎 Savings</option>
            <option value="Other">⚡ Other</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-yellow-400 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/budgets")}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition"
          >
            Save Budget
          </button>
        </div>
      </form>
    </div>
  );
}
