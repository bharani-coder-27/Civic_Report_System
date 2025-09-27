import React from "react";
import { motion } from "framer-motion";

const Metric: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <motion.div
    initial={{ y: 12, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 110 }}
    className="card"
  >
    <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
  </motion.div>
);

const AdminAnalytics: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Metric title="Total Reports" value="1,248" />
        <Metric title="Resolved (30d)" value="864" />
        <Metric title="Avg Resolution Time" value="18h 22m" />
      </div>

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card h-64 grid place-items-center text-gray-500"
      >
        Charts go here (Recharts/Chart.js)
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
