import { ROUTES } from '@/features/routes';
import Link from 'next/link';

export default function ProfileSettingsRequestsPage() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold text-foreground">My Requests</h1>
      <p className="text-sm text-muted-foreground">Trace: /profile/settings/requests</p>

      <Link href={ROUTES.favorites.requestsCreate} className="text-chart-2 transition-colors hover:underline">
        Create Request
      </Link>
    </section>
  );
}
