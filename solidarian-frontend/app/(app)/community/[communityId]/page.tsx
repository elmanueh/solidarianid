type CommunityPageProps = {
  params: Promise<{ communityId: string }>
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { communityId } = await params

  return <p>Community page for {communityId}</p>
}
