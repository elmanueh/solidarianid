type CausePageProps = {
  params: Promise<{ communityId: string; causeId: string }>;
};

export default async function CausePage({ params }: Readonly<CausePageProps>) {
  const { communityId, causeId } = await params;

  return (
    <p>
      Cause detail: {communityId}/{causeId}
    </p>
  );
}
