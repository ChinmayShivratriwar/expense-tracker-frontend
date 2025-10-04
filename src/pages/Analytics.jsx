import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../features/axiosInstance";
import batmanLogo from "../assets/batman-9.svg";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const navigate = useNavigate();
  const [topCategories, setTopCategories] = useState([]);
  const [spendsPerCategory, setSpendsPerCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryEmojiMap = {
    Food: "🍔",
    Leisure: "🎮",
    Vehicle: "🚗",
    Subscription: "📺",
    Shopping: "🛍️",
    Bills: "💡",
    Entertainment: "🎬",
    Travel: "✈️",
    Health: "💊",
    Education: "📚",
    Others: "🦇",
  };

  const COLORS = [
    "#FFBB28",
    "#FF8042",
    "#0088FE",
    "#00C49F",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#AA336A",
    "#44AA88",
    "#8855CC",
    "#FF6666",
    "#33CCFF",
    "#AAFF66",
    "#FFAA33",
  ];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // fetch top 3 categories
        const top3Res = await axiosInstance.get("/analytics/top3");
        const top3 = top3Res.data?.top3Categories || [];
        const sortedTop3 = top3.sort((a, b) => a.rank - b.rank);
        setTopCategories(sortedTop3);

        // fetch spends per category
        const spendsRes = await axiosInstance.get("/transactions/spends-per-category");
        const spends = spendsRes.data?.categorySpend || [];
        setSpendsPerCategory(spends);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6">
      {/* Logo */}
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute inset-0 rounded-full bg-yellow-500 blur-3xl opacity-20 animate-pulse"></div>
        <img
          src={batmanLogo}
          alt="Batman Logo"
          className="relative w-full h-full opacity-90 drop-shadow-[0_0_25px_rgba(255,255,0,0.7)]"
        />
      </div>

      <h1 className="text-3xl font-bold mb-2 text-yellow-400">Analytics Dashboard</h1>
      <p className="mb-8 text-gray-400">Insights into your spending habits in Gotham.</p>

      {loading && <p className="text-yellow-400 mb-4">Loading analytics...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Top 3 Categories */}
      <div className="w-full max-w-6xl mb-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">🏆 Top 3 Volume Categories (Income + Expense + Transfer)</h2>
        <p className="text-gray-400 mb-6">These categories account for most of your transactions this month.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-yellow-500/30 hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                {categoryEmojiMap[cat.category] || "🦇"} {cat.category}
              </h3>
              <p className="text-lg mb-1">
                💵 Total Volumes: <span className="text-green-400">₹{cat.totalAmount}</span>
              </p>
              <p className="text-sm text-gray-400">🛒 Transactions: {cat.txnCount}</p>
              <p className="text-sm text-gray-400">🏅 Rank: {cat.rank}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spends per Category (Pie Chart) */}
      <div className="w-full max-w-4xl mb-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">📊 Spends per Category</h2>
        <p className="text-gray-400 mb-6">Visual breakdown of your spending across categories includes only expense and transfer and not income.</p>
        {spendsPerCategory.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={spendsPerCategory}
                dataKey="totalAmount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={140}
                fill="#8884d8"
                label={(entry) => `${categoryEmojiMap[entry.category] || ""} ${entry.category}`}
              >
                {spendsPerCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No data available.</p>
        )}
      </div>
    </div>
  );
}
