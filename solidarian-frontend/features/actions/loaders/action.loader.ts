import { GET_ACTION_QUERY, type GetActionResult } from '@/features/actions/api/graphql/actions.documents';
import { getInstanceServerApolloClient } from '@/features/graphql/apollo-client-server';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { resolveOrNotFound } from '@/features/routing/not-found.utils';

type ResolveActionResult = GetActionResult['action'];

interface ResolveActionParams {
  actionId: string;
}

export async function resolveAction({ actionId }: ResolveActionParams): Promise<ResolveActionResult> {
  const graphqlClient = new GraphqlClientService(await getInstanceServerApolloClient());

  return resolveOrNotFound(async () => {
    const result = await graphqlClient.query(GET_ACTION_QUERY, { id: actionId });
    return result.action;
  });
}
