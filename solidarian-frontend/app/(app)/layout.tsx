import Link from "next/link"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <nav className="mx-auto flex max-w-6xl gap-4 p-4 text-sm">
          <Link href="/home">Home</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/favorites">Favorites</Link>
          <Link href="/notifications">Notifications</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  )
}
