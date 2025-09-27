import { createContext } from "react";

export interface AuthContextType {
  role: "admin" | "staff" | null;
  name: string | null;
  login: (token: string, role: "admin" | "staff", name?: string) => void;
  logout: () => void;
}

// Context only — no components exported
export const AuthContext = createContext<AuthContextType | null>(null);
