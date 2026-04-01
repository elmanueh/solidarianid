type ActionPageProps = {
  params: Promise<{ communityId: string; causeId: string; actionId: string }>
}

export default async function ActionPage({ params }: ActionPageProps) {
  const { communityId, causeId, actionId } = await params

  return (
    <p>
      Action {actionId} in cause {causeId} from community {communityId}
    </p>
  )
}
