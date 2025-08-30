import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black via-gray-900 to-black text-yellow-400">
      <form
        onSubmit={handleSubmit}
        className="p-8 w-full max-w-2xl bg-gray-900 border border-yellow-500/30 shadow-lg shadow-yellow-500/20 rounded-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">
          🦇 Register for Gotham Tracker
        </h2>

        {error && (
          <p className="text-red-500 font-semibold mb-4 text-center bg-red-900/40 p-2 rounded">
            {error}
          </p>
        )}

        {/* Grid for two-per-row fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 rounded bg-black border border-yellow-500/40 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="p-3 rounded bg-black border border-yellow-500/40 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            className="p-3 rounded bg-black border border-yellow-500/40 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="p-3 rounded bg-black border border-yellow-500/40 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Email - full width */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mt-4 p-3 rounded bg-black border border-yellow-500/40 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        {/* Password - full width */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mt-4 mb-6 p-3 rounded bg-black border border-yellow-500/40 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition shadow-md shadow-yellow-500/30 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-400 hover:underline hover:text-yellow-300"
          >
            Login
          </Link>
        </p>
      </form>

    </div>
  );
}
