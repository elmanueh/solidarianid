type CommunityCausesPageProps = {
  params: Promise<{ communityId: string }>;
};

export default async function CommunityCausesPage({ params }: Readonly<CommunityCausesPageProps>) {
  const { communityId } = await params;

  return <p>Active causes for community: {communityId}</p>;
}
