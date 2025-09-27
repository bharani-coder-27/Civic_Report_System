import React from "react";
import { motion } from "framer-motion";

const Metric: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <motion.div
    initial={{ y: 12, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="card"
  >
    <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
  </motion.div>
);

const StaffAnalytics: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Metric title="Resolved (30d)" value="128" />
        <Metric title="Avg Resolution Time" value="11h 10m" />
        <Metric title="Active Reports" value="42" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card h-64 grid place-items-center text-gray-500"
      >
        Personal charts go here…
      </motion.div>
    </div>
  );
};

export default StaffAnalytics;
