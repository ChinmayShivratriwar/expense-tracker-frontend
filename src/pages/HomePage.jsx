// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import batmanLogo from "../assets/batman-9.svg"

// export default function HomePage() {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };


//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-bat-black text-bat-white relative overflow-hidden">
//       {/* Rotating 3D Batman Logo */}
//       <motion.img
//         src={batmanLogo}
//         alt="Batman Logo"
//         className="w-48 h-48 drop-shadow-[0_0_25px_rgba(250,204,21,0.6)]"
//         animate={{ rotateY: 360 }}
//         transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
//       />

//       {/* Welcome Card */}
//       <div className="bg-yellow-500 text-black font-bold p-4 rounded-xl shadow-lg shadow-yellow-500/40 mb-6 text-center w-full max-w-2xl">
//         🦇 Welcome to Gotham's Expense Tracker
//       </div>
//       <div className="mt-10 p-6 bg-bat-gray shadow-bat-glow rounded-xl w-96 text-center">
//         <h1 className="text-2xl font-bold mb-4">
//           Welcome, {user?.name || "User"} 👋
//         </h1>
//         <p className="mb-6">You are logged in to the Batcomputer.</p>
//         <button
//           onClick={handleLogout}
//           className="w-full bg-bat-red text-white py-2 rounded shadow-red-glow hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Subtle background grid effect */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
//     </div>
//   );
// }


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import batmanLogo from "../assets/batman-9.svg"

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden">
      {/* Rotating hologram logo */}
      <div className="relative w-48 h-48 mb-12 animate-spin-slow">
            {/* Glow background */}
            <div className="absolute inset-0 rounded-full bg-yellow-500 blur-3xl opacity-30 animate-pulse"></div>

                {/* Logo */}
                <img
                    src={batmanLogo}
                    alt="Batman Logo"
                    className="relative w-full h-full opacity-90 drop-shadow-[0_0_35px_rgba(255,255,0,0.8)]"
                />
      </div>
      

      {/* Welcome text */}
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {user?.name || "Dark Knight"}
      </h1>
      <p className="mb-12 text-yellow-400">
        Gotham’s Watchful Protector of Finances
      </p>

      {/* Batcomputer style dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-6">
        <div className="p-6 bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-yellow-500/30 hover:scale-105 transition">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">💰 Expenses</h2>
          <p>View and track your daily expenses like a true detective.</p>
        </div>
        <div className="p-6 bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-yellow-500/30 hover:scale-105 transition">
          <h2 className="text-xl font-bold text-yellow-400 mb-2">➕ Add Expense</h2>
          <p>Log a new expense directly into Gotham’s Batcomputer.</p>
        </div>
        <div
          onClick={handleLogout}
          className="p-6 bg-red-700/70 backdrop-blur-md rounded-xl shadow-lg border border-red-500/40 hover:scale-105 transition cursor-pointer"
        >
          <h2 className="text-xl font-bold text-red-300 mb-2">🚪 Logout</h2>
          <p>Exit securely and return when Gotham needs you.</p>
        </div>
      </div>
    </div>
  );
}

