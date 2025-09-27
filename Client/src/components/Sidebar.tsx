import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const LinkItem: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-3 py-2 rounded-xl transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
      }`
    }
  >
    {label}
  </NavLink>
);

const Sidebar: React.FC<{ role: "admin" | "staff" }> = ({ role }) => {
  const admin = [
    { to: "/admin/staff", label: "Staff Management" },
    { to: "/admin/reports", label: "Reports" },
    { to: "/admin/analytics", label: "Analytics" },
    { to: "/admin/map", label: "Map View" }
  ];
  const staff = [
    { to: "/staff/reports", label: "Reports" },
    { to: "/staff/analytics", label: "Analytics" },
    { to: "/staff/map", label: "Map View" }
  ];

  const links = role === "admin" ? admin : staff;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 p-4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
    >
      <div className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {role === "admin" ? "Admin Panel" : "Staff Panel"}
      </div>
      <nav className="space-y-2">
        {links.map((l) => (
          <LinkItem key={l.to} to={l.to} label={l.label} />
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
