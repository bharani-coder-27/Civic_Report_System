import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";

import StaffManagement from "./pages/admin/staffManagement";
import AdminReports from "./pages/admin/Reports";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminMapView from "./pages/admin/MapView";

import StaffReports from "./pages/staff/Reports";
import StaffAnalytics from "./pages/staff/Analytics";
import StaffMapView from "./pages/staff/MapView";

import { useAuth } from "./hooks/useAuth";

const RequireRole: React.FC<
  React.PropsWithChildren<{ allowed: ("admin" | "staff")[] }>
> = ({ allowed, children }) => {
  const { role } = useAuth();
  if (!role) return <Navigate to="/login" replace />;
  if (!allowed.includes(role)) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <RequireRole allowed={["admin"]}>
            <Layout role="admin" />
          </RequireRole>
        }
      >
        <Route path="staff" element={<StaffManagement />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="map" element={<AdminMapView />} />
        <Route index element={<Navigate to="staff" replace />} />
      </Route>

      {/* Staff */}
      <Route
        path="/staff/*"
        element={
          <RequireRole allowed={["staff"]}>
            <Layout role="staff" />
          </RequireRole>
        }
      >
        <Route path="reports" element={<StaffReports />} />
        <Route path="analytics" element={<StaffAnalytics />} />
        <Route path="map" element={<StaffMapView />} />
        <Route index element={<Navigate to="reports" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
