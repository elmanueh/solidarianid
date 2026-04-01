type CreateCommunityCauseRequestPageProps = {
  params: Promise<{ communityId: string }>
}

export default async function CreateCommunityCauseRequestPage({
  params,
}: CreateCommunityCauseRequestPageProps) {
  const { communityId } = await params

  return <p>Create cause request in community {communityId}</p>
}
