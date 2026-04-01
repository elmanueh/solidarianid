type CreateActionRequestPageProps = {
  params: Promise<{ communityId: string; causeId: string }>
}

export default async function CreateActionRequestPage({
  params,
}: CreateActionRequestPageProps) {
  const { causeId } = await params

  return <p>Create action request for cause {causeId}</p>
}
