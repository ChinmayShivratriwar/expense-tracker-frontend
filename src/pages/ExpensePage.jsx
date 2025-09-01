import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import batmanLogo from "../assets/batman-9.svg";
import { fetchTransactions } from "../features/transaction/transactionSlice";
import Pagination from "./Pagination";

export default function ExpensesPage() {
  const dispatch = useDispatch();

  const { transactions = [], loading, error, page, totalPages } = useSelector(
    (state) => state.transactions || {}
  );

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    dispatch(fetchTransactions({ page: 0, size: ITEMS_PER_PAGE }));
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      dispatch(fetchTransactions({ page: newPage, size: ITEMS_PER_PAGE }));
    }
  };

  // Totals by type
  const totals = transactions.reduce(
    (acc, txn) => {
      acc[txn.type] = (acc[txn.type] || 0) + txn.amount;
      return acc;
    },
    { EXPENSE: 0, INCOME: 0, TRANSFER: 0 }
  );

  // Category chart data
  const categoryData = transactions.reduce((acc, txn) => {
    const existing = acc.find((item) => item.category === txn.category);
    if (existing) existing.amount += txn.amount;
    else acc.push({ category: txn.category, amount: txn.amount });
    return acc;
  }, []);

  // Line chart: cumulative over time
  const lineData = transactions
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((txn, idx, arr) => ({
      date: format(new Date(txn.createdAt), "yyyy-MM-dd"),
      cumulativeAmount:
        txn.amount +
        arr.slice(0, idx).reduce((sum, t) => sum + t.amount, 0),
    }));

  const barColors = [
    "#FFD700",
    "#FF8C00",
    "#FF4500",
    "#ADFF2F",
    "#00FFFF",
    "#1E90FF",
    "#DA70D6",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-yellow-400 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={batmanLogo}
          alt="Batman Logo"
          className="w-16 h-16 animate-spin-slow drop-shadow-md"
        />
        <h1 className="text-4xl font-extrabold tracking-widest text-yellow-400">
          Gotham Expenses
        </h1>
      </div>

      {/* List View */}
      <div className="bg-gray-900/80 backdrop-blur-md border border-yellow-500/30 rounded-xl shadow-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4 text-yellow-300">
          📋 Transaction List
        </h2>
        {loading ? (
          <p className="text-yellow-400">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : transactions.length === 0 ? (
          <p className="text-yellow-300">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-yellow-500/30">
                  <th className="p-2">Date</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-yellow-500/20 hover:bg-gray-800/50 transition-all"
                  >
                    <td className="p-2">
                      {format(new Date(txn.createdAt), "yyyy-MM-dd HH:mm")}
                    </td>
                    <td className="p-2">{txn.type}</td>
                    <td className="p-2">{txn.category}</td>
                    <td className="p-2">{txn.amount}</td>
                    <td className="p-2">{txn.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Ellipsis + Jump Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["EXPENSE", "INCOME", "TRANSFER"].map((type) => (
          <div
            key={type}
            className="p-4 rounded-xl border border-yellow-500/30 shadow-md bg-gray-900/70 hover:scale-105 transform transition"
          >
            <h3 className="text-lg font-bold mb-2 text-yellow-400">
              {type === "EXPENSE"
                ? "💸 Expenses"
                : type === "INCOME"
                ? "💰 Income"
                : "🔁 Transfers"}
            </h3>
            <p className="text-2xl font-extrabold text-yellow-300">
              {totals[type] || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Bar */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-yellow-500/30 rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-yellow-300">
            📊 Category Totals (Bar)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" stroke="#FFD700" />
              <YAxis stroke="#FFD700" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  color: "#FFD700",
                }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cumulative Line */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-yellow-500/30 rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-yellow-300">
            📈 Cumulative Trend (Line)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" stroke="#FFD700" />
              <YAxis stroke="#FFD700" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  color: "#FFD700",
                }}
              />
              <Line
                type="monotone"
                dataKey="cumulativeAmount"
                stroke="#FFD700"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-yellow-500/30 rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-yellow-300">
            🥧 Category Breakdown (Pie)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                outerRadius={80}
                fill="#FFD700"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [value, name]}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  color: "#FFD700",
                }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{ color: "#FFD700" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Type Pie */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-yellow-500/30 rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-yellow-300">
            🥧 Type Breakdown (Pie)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { type: "EXPENSE", value: totals.EXPENSE },
                  { type: "INCOME", value: totals.INCOME },
                  { type: "TRANSFER", value: totals.TRANSFER },
                ]}
                dataKey="value"
                nameKey="type"
                outerRadius={80}
                fill="#FFD700"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {["EXPENSE", "INCOME", "TRANSFER"].map((t, i) => (
                  <Cell key={`cell-${i}`} fill={barColors[i % barColors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [value, name]}
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  color: "#FFD700",
                }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{ color: "#FFD700" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-yellow-500/30 rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-yellow-300">
            🕹 Type Comparison (Radar)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart
              data={[
                { type: "EXPENSE", value: totals.EXPENSE },
                { type: "INCOME", value: totals.INCOME },
                { type: "TRANSFER", value: totals.TRANSFER },
              ]}
            >
              <PolarGrid stroke="#FFD700" />
              <PolarAngleAxis dataKey="type" stroke="#FFD700" />
              <PolarRadiusAxis stroke="#FFD700" />
              <Radar
                dataKey="value"
                stroke="#FFD700"
                fill="#FFD700"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  color: "#FFD700",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
