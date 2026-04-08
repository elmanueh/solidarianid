type CommunityCauseRequestCreatePageProps = {
  params: Promise<{ communityId: string }>;
};

export default async function CommunityCauseRequestCreatePage({
  params,
}: Readonly<CommunityCauseRequestCreatePageProps>) {
  const { communityId } = await params;

  return <p>Create cause request in community: {communityId}</p>;
}
