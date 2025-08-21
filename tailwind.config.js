/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bat-black': '#0a0a0a',   // Batcave base
        'bat-gray': '#1a1a1a',    // Panels, form backgrounds
        'bat-yellow': '#facc15',  // Accents, buttons
        'bat-red': '#dc2626',     // Errors, danger
        'bat-white': '#f9fafb',   // High-contrast text
      },
      boxShadow: {
        'bat-glow': '0 0 15px rgba(250, 204, 21, 0.5)', // Yellow glow
        'red-glow': '0 0 15px rgba(220, 38, 38, 0.6)',  // Red glow
      },
    },
  },
  plugins: [],
};
