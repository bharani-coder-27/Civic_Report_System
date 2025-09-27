import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const nav = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@city.gov");
  const [password, setPassword] = useState("admin123");
  const [role, setRole] = useState<"admin" | "staff">("admin");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with your real /auth/login API call
    const fakeToken = "FAKE.JWT.TOKEN";
    const name = role === "admin" ? "Admin" : "Staff";
    login(fakeToken, role, name);
    nav(role === "admin" ? "/admin/staff" : "/staff/reports", { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 dark:bg-gray-950">
      <motion.form
        onSubmit={onSubmit}
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Sign In</h1>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">Email</label>
          <input
            className="w-full border rounded-xl p-2 bg-white dark:bg-gray-800 dark:text-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">Password</label>
          <input
            type="password"
            className="w-full border rounded-xl p-2 bg-white dark:bg-gray-800 dark:text-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-600 dark:text-gray-300">Role</label>
          <select
            className="w-full border rounded-xl p-2 bg-white dark:bg-gray-800 dark:text-gray-100"
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "staff")}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <button className="w-full py-2 rounded-xl bg-gray-900 text-white hover:opacity-90">
          Login
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
