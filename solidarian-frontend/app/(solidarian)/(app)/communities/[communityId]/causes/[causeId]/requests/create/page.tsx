type CauseActionRequestCreatePageProps = {
  params: Promise<{ communityId: string; causeId: string }>
}

export default async function CauseActionRequestCreatePage({
  params,
}: CauseActionRequestCreatePageProps) {
  const { communityId, causeId } = await params

  return <p>Create action request: {communityId}/{causeId}</p>
}
