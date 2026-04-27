import {
  GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID_QUERY,
  type GetCauseByCommunityIdAndCauseIdResult,
} from '@/features/causes/api/graphql/causes.documents';
import { getInstanceServerApolloClient } from '@/features/graphql/apollo-client-server';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { resolveOrNotFound } from '@/features/routing/not-found.utils';

type ResolveCauseByCommunityResult = GetCauseByCommunityIdAndCauseIdResult['causeByCommunity'];

interface ResolveCauseByCommunityParams {
  communityId: string;
  causeId: string;
}

export async function resolveCauseByCommunity({
  communityId,
  causeId,
}: ResolveCauseByCommunityParams): Promise<ResolveCauseByCommunityResult> {
  const graphqlClient = new GraphqlClientService(await getInstanceServerApolloClient());

  return resolveOrNotFound(async () => {
    const result = await graphqlClient.query(GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID_QUERY, { communityId, causeId });
    return result.causeByCommunity;
  });
}
