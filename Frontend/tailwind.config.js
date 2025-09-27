/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // blue-600
        backgroundLight: "#F9FAFB", // gray-50
        backgroundDark: "#111827", // gray-900
      },
    },
  },
  plugins: [],
};