import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
        <p className="text-muted-foreground">
          Welcome to your profile page. Here you can manage your profile information, view your activity, and access
          your settings.
        </p>
      </div>
      <nav>
        <ul className="flex flex-col gap-3">
          <li>
            <Link href="/profile/settings/requests" className="text-chart-2 transition-colors hover:underline">
              My Requests
            </Link>
          </li>
          <li>
            <Link href="/profile/settings/personal-info" className="text-chart-2 transition-colors hover:underline">
              Personal Info
            </Link>
          </li>
          <li>
            <Link href="/profile/settings/impact" className="text-chart-2 transition-colors hover:underline">
              Impact
            </Link>
          </li>
          <li>
            <Link href="/profile/settings/privacy" className="text-chart-2 transition-colors hover:underline">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/profile/settings/help" className="text-chart-2 transition-colors hover:underline">
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
