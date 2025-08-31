import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../features/axiosInstance"; // Axios instance with token attached
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import batmanLogo from "../assets/batman-9.svg";
import * as XLSX from "xlsx";

export default function AddExpensePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    type: "EXPENSE",
    category: "Food",
    description: "",
    transactionDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bulkError, setBulkError] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);

  const categories = [
    "Food",
    "Leisure",
    "Vehicle",
    "Subscription",
    "Shopping",
    "Bills",
    "Entertainment",
    "Travel",
    "Health",
    "Education",
    "Others",
  ];

  const categoryIcons = {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, transactionDate: date });
  };

  const handleCategorySelect = (cat) => {
    setFormData({ ...formData, category: cat });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try { 
      await axiosInstance.post("/transactions", {
        ...formData,
        transactionDate: formData.transactionDate.toISOString(),
      });
      navigate("/"); // redirect back to homepage
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  // Bulk Import Handlers
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBulkError(null);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      uploadBulkTransactions(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadBulkTransactions = async (transactions) => {
    setBulkLoading(true);
    try {
      await axiosInstance.post("/transactions/bulk", { transactions });
      alert("Bulk transactions added successfully!");
    } catch (err) {
      console.error(err);
      setBulkError(err.response?.data?.message || "Failed to add bulk transactions");
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-yellow-400 p-6 relative">
      {/* Rotating Batman Logo */}
      <div className="w-32 h-32 mb-6 animate-spin-slow relative">
        <div className="absolute inset-0 rounded-full bg-yellow-500 blur-3xl opacity-30 animate-pulse"></div>
        <img
          src={batmanLogo}
          alt="Batman Logo"
          className="relative w-full h-full opacity-90 drop-shadow-[0_0_35px_rgba(255,255,0,0,0.8)]"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">
        🦇 Add a Gotham Transaction
      </h1>

      {error && (
        <p className="text-red-500 font-semibold mb-4 text-center bg-red-900/40 p-2 rounded">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/70 backdrop-blur-md border border-yellow-500/30 rounded-xl shadow-lg p-6 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Amount */}
        <div>
          <label className="block mb-1 font-semibold">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black border border-yellow-500/40 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-semibold">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black border border-yellow-500/40 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          >
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
            <option value="TRANSFER">Transfer</option>
          </select>
        </div>

        {/* Transaction Date */}
        <div className="col-span-1 md:col-span-1 w-full">
          <label className="block mb-1 font-semibold">Transaction Date</label>
          <DatePicker
            selected={formData.transactionDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="Select date and time"
            className="w-full p-2 rounded bg-black border border-yellow-500/40 text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            wrapperClassName="w-full"
          />
        </div>

        {/* Bulk Import Panel */}
        <div className="col-span-1 md:col-span-1 p-3 rounded-xl bg-gray-900/70 border border-yellow-500/40 shadow-md flex flex-col justify-center">
        <label
            htmlFor="bulkUpload"
            className="flex items-center gap-2 cursor-pointer text-yellow-300 font-semibold text-sm hover:text-yellow-400"
        >
            📁 Bulk Import
        </label>
        <input
            type="file"
            id="bulkUpload"
            accept=".xlsx,.csv"
            onChange={handleFileUpload}
            className="mt-2 text-yellow-300"
        />
        {bulkLoading && (
            <p className="mt-2 text-yellow-400 text-sm">Uploading...</p>
        )}
        {bulkError && (
            <p className="mt-2 text-red-500 text-sm">{bulkError}</p>
        )}
        </div>

        {/* Category */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-semibold">Category</label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl font-semibold text-sm transition ${
                  formData.category === cat
                    ? "bg-yellow-500 text-black"
                    : "bg-gray-800 text-yellow-300 hover:bg-yellow-600"
                }`}
              >
                <span className="text-2xl">{categoryIcons[cat]}</span>
                <span className="mt-1">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description (full width) */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-black border border-yellow-500/40 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={3}
          ></textarea>
        </div>
        

        {/* Submit Button (full width) */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition shadow-md shadow-yellow-500/30 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}
