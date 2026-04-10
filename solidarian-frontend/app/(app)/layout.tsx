import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { ROUTES } from '@/features/routes';
import Link from 'next/link';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <nav className="flex gap-6 py-4 text-sm font-medium">
            <Link href={ROUTES.app.home} className="text-foreground transition-colors hover:text-chart-2">
              Home
            </Link>
            <Link href={ROUTES.app.explore} className="text-foreground transition-colors hover:text-chart-2">
              Explore
            </Link>
            <Link href={ROUTES.app.favorites} className="text-foreground transition-colors hover:text-chart-5">
              Favorites
            </Link>
            <Link href={ROUTES.app.notifications} className="text-foreground transition-colors hover:text-chart-1">
              Notifications
            </Link>
            <Link href={ROUTES.app.profile} className="text-foreground transition-colors hover:text-chart-4">
              Mi SolidarianID
            </Link>
          </nav>
          <ThemeToggleButton />
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  );
}
