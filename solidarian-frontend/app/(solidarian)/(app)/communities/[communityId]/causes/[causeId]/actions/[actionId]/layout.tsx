type ActionLayoutProps = {
  children: React.ReactNode
  params: Promise<{ communityId: string; causeId: string; actionId: string }>
}

export default async function ActionLayout({
  children,
  params,
}: ActionLayoutProps) {
  const { communityId, causeId, actionId } = await params

  return (
    <section className="space-y-4">
      <header className="border-b pb-3">
        <h3 className="text-base font-semibold">Action {actionId}</h3>
        <p className="text-sm text-muted-foreground">
          Trace: /communities/{communityId}/causes/{causeId}/actions/{actionId}
        </p>
      </header>
      {children}
    </section>
  )
}
