import { APP_ROUTES } from "@/app.routes";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { IconLoader2 } from "@tabler/icons-react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex justify-center">
        <IconLoader2 className="animate-spin" />
      </div>
    );

  if (!isAuthenticated) return <Navigate to={APP_ROUTES.LOGIN} replace />;

  return children;
};
