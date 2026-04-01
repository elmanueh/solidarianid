type CauseLayoutProps = {
  children: React.ReactNode
  params: Promise<{ communityId: string; causeId: string }>
}

export default async function CauseLayout({
  children,
  params,
}: CauseLayoutProps) {
  const { communityId, causeId } = await params

  return (
    <section className="space-y-4">
      <header className="border-b pb-3">
        <h2 className="text-lg font-semibold">Cause {causeId}</h2>
        <p className="text-sm text-muted-foreground">
          Trace: /communities/{communityId}/causes/{causeId}
        </p>
      </header>
      {children}
    </section>
  )
}
