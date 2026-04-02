import Link from 'next/link';

export default function ProfileSettingsRequestsPage() {
  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">My Requests</h1>
      <p className="text-sm text-muted-foreground">Trace: /profile/settings/requests</p>

      <Link href="/favorites/requests/create" className="text-blue-500 hover:underline">
        Create Request
      </Link>
    </section>
  );
}
