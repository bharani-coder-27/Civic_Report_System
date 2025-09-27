import React, { useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [role, setRole] = useState<"admin" | "staff" | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role") as "admin" | "staff" | null;
    const savedName = localStorage.getItem("name");
    if (token && savedRole) {
      setRole(savedRole);
      setName(savedName ?? null);
    }
  }, []);

  const login: AuthContextType["login"] = (token, r, n) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", r);
    if (n) localStorage.setItem("name", n);
    setRole(r);
    setName(n ?? null);
  };

  const logout: AuthContextType["logout"] = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setRole(null);
    setName(null);
  };

  return (
    <AuthContext.Provider value={{ role, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
