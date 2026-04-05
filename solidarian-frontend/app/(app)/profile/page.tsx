import Link from 'next/link';

export default function ProfilePage() {
  return (
    <>
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="mt-2 text-gray-600">
        Welcome to your profile page. Here you can manage your profile information, view your activity, and access your
        settings.
      </p>
      <nav>
        <ul>
          <li>
            <Link href="/profile/settings/requests" className="text-blue-500 hover:underline">
              My Requests
            </Link>
          </li>
          <li>
            <Link href="/profile/settings/personal-info" className="text-blue-500 hover:underline">
              Personal Info
            </Link>
          </li>
          <li>
            <Link href="/profile/settings/impact" className="text-blue-500 hover:underline">
              Impact
            </Link>
          </li>
          <li>
            <Link href="/profile/settings/privacy" className="text-blue-500 hover:underline">
              Impact
            </Link>
          </li>
          <li>
            <Link href="/profile/settings/help" className="text-blue-500 hover:underline">
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
