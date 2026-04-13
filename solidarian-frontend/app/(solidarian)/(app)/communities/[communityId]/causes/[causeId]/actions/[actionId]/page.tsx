type ActionPageProps = {
  params: Promise<{ communityId: string; causeId: string; actionId: string }>;
};

export default async function ActionPage({ params }: Readonly<ActionPageProps>) {
  const { communityId, causeId, actionId } = await params;

  return (
    <p>
      Action detail: {communityId}/{causeId}/{actionId}
    </p>
  );
}
