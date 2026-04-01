type CommunityLayoutProps = {
  children: React.ReactNode
  params: Promise<{ communityId: string }>
}

export default async function CommunityLayout({
  children,
  params,
}: CommunityLayoutProps) {
  const { communityId } = await params

  return (
    <section className="space-y-4">
      <header className="border-b pb-3">
        <h1 className="text-xl font-semibold">Community {communityId}</h1>
        <p className="text-sm text-muted-foreground">Trace: /communities/{communityId}</p>
      </header>
      {children}
    </section>
  )
}
