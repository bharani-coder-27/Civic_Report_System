import React, { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";
import type { Report } from "../../types";
import StatusBadge from "../../components/StatusBadge";
import { motion } from "framer-motion";

const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminApi.listReports();
      setReports(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">All Reports</h2>
        <button onClick={load} className="px-3 py-1 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
          Refresh
        </button>
      </div>
      {loading ? (
        <div className="text-gray-600 dark:text-gray-300">Loading…</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Type</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Location</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="py-2">{r.type}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td>{r.location}</td>
                  <td>{r.date}</td>
                </tr>
              ))}
              {!reports.length && (
                <tr>
                  <td colSpan={4} className="py-4 text-gray-500">No reports to show.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default AdminReports;
