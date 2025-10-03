import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import batmanLogo from "../assets/batman-9.svg";
// You’ll need API slices for these, just placeholders here:
import { fetchAdminStats } from "../features/admin/adminSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6">
      {/* Logo hologram */}
      <div className="relative w-40 h-40 mb-10 animate-pulse">
        <div className="absolute inset-0 rounded-full bg-yellow-500 blur-3xl opacity-20"></div>
        <img
          src={batmanLogo}
          alt="Batman Logo"
          className="relative w-full h-full opacity-90 drop-shadow-[0_0_35px_rgba(255,255,0,0.8)]"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-2">
        Admin Dashboard
      </h1>
      <p className="mb-10 text-gray-400">
        Gotham’s central command for oversight & control.
      </p>

      {/* Loading / Error */}
      {loading && <p className="text-yellow-400 mb-6">Loading stats...</p>}
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Users */}
        <div
          onClick={() => navigate("/admin/users")}
          className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-purple-500/40 hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-bold text-purple-400 mb-2">👥 Users</h2>
          <p className="text-3xl font-bold">{stats?.totalUsers ?? "--"}</p>
          <p className="text-gray-400 mt-1">Registered protectors & citizens</p>
          <p className="mt-3 text-sm text-purple-300 underline">
            View Users →
          </p>
        </div>

        {/* Transactions */}
        <div
          onClick={() => navigate("/admin/transactions")}
          className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-green-500/40 hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-bold text-green-400 mb-2">💰 Transactions</h2>
          <p className="text-3xl font-bold">{stats?.totalTransactions ?? "--"}</p>
          <p className="text-gray-400 mt-1">Financial activities in Gotham</p>
          <p className="mt-3 text-sm text-green-300 underline">
            View Transactions →
          </p>
        </div>

        {/* Budgets */}
        <div
          onClick={() => navigate("/admin/budgets")}
          className="p-6 bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-blue-500/40 hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-bold text-blue-400 mb-2">📊 Budgets</h2>
          <p className="text-3xl font-bold">{stats?.totalBudgets ?? "--"}</p>
          <p className="text-gray-400 mt-1">Active budgets being tracked</p>
          <p className="mt-3 text-sm text-blue-300 underline">
            View Budgets →
          </p>
        </div>
      </div>
    </div>
  );
}
