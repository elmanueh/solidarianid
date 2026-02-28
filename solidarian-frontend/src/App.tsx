import { APP_ROUTES } from "@/app.routes";
import LoginPage from "@/modules/auth/pages/login.page";
import RegisterPage from "@/modules/auth/pages/register.page";
import CommunitiesPage from "@/modules/communities/pages/communities.page";
import Layout from "@/modules/layout/components/layout";
import { Navigate, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <Routes>
      <Route
        path={APP_ROUTES.BASE}
        element={<Navigate to={APP_ROUTES.LOGIN} replace />}
      />
      <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={APP_ROUTES.REGISTER} element={<RegisterPage />} />

      <Route element={<Layout />}>
        <Route path={APP_ROUTES.COMMUNITIES} element={<CommunitiesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
