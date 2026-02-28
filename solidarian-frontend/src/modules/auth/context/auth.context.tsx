import type { User } from "@/modules/auth/model/user";
import { createContext } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  handleLogin: (user: User) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
