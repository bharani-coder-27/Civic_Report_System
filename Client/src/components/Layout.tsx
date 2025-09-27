import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout: React.FC<{ role: "admin" | "staff" }> = ({ role }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
