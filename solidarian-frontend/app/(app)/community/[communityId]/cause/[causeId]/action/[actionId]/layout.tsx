type ActionLayoutProps = {
  children: React.ReactNode
  params: Promise<{ actionId: string }>
}

export default async function ActionLayout({
  children,
  params,
}: ActionLayoutProps) {
  const { actionId } = await params

  return (
    <section className="space-y-4">
      <header className="border-b pb-3">
        <h3 className="text-base font-semibold">Action {actionId}</h3>
      </header>
      {children}
    </section>
  )
}
