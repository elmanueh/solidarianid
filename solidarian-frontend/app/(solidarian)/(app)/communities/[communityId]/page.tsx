type CommunityPageProps = {
  params: Promise<{ communityId: string }>;
};

export default async function CommunityPage({ params }: Readonly<CommunityPageProps>) {
  const { communityId } = await params;

  return <p>About community: {communityId}</p>;
}
