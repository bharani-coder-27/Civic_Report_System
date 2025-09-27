import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const Topbar: React.FC = () => {
  const { name, role, logout } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <motion.div
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-soft"
    >
      <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">
        Civic Console
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {name ? `Hi, ${name}` : "Welcome"} • {role ?? "guest"}
        </span>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <button
          onClick={logout}
          className="px-3 py-1 rounded-xl bg-gray-900 text-white hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};

export default Topbar;
