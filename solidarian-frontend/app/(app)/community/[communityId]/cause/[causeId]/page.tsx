type CausePageProps = {
  params: Promise<{ communityId: string; causeId: string }>
}

export default async function CausePage({ params }: CausePageProps) {
  const { communityId, causeId } = await params

  return (
    <p>
      Cause page for {causeId} in community {communityId}
    </p>
  )
}
