import React from "react";

const classes: Record<string, string> = {
  submitted: "bg-gray-200 text-gray-800",
  acknowledged: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  return (
    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${classes[status] || "bg-gray-200"}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
