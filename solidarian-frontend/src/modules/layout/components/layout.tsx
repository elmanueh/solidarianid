import logoSolidarian from "@/assets/solidarian-logo.png";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useTheme } from "@/modules/layout/components/theme-provider";
import { NAVBAR_ROUTES } from "@/modules/layout/constants/navbar.routes";
import { IconLogout, IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const { handleLogout } = useAuth();

  return (
    <div className="flex flex-col">
      <header className="flex justify-between items-center py-2 px-4 border-b">
        <div className="flex gap-2 items-center">
          <img src={logoSolidarian} alt="SOLIDARIAN" className="h-13 w-13" />
          <h1 className="text-2xl font-bold">SolidarianID</h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline">
                <IconMenu2 />
              </Button>
            }
          />
          <DropdownMenuContent className={"w-50"}>
            {NAVBAR_ROUTES.map((item) => (
              <DropdownMenuItem>
                <Link
                  key={item.url}
                  to={item.url}
                  className="flex items-center gap-1"
                >
                  <item.icon />
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <IconSun /> : <IconMoon />} Cambiar tema
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <IconLogout />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
