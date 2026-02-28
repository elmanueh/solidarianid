import { APP_ROUTES } from "@/app.routes";
import { AuthContext } from "@/modules/auth/context/auth.context";
import type { User } from "@/modules/auth/model/user";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const USER_STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    navigate(APP_ROUTES.COMMUNITIES);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    navigate(APP_ROUTES.LOGIN);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
