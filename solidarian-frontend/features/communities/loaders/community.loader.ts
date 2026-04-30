import {
  GET_COMMUNITY_BY_ID_QUERY,
  type GetCommunityByIdResult,
} from '@/features/communities/api/graphql/communities.documents';
import { getInstanceServerApolloClient } from '@/features/graphql/apollo-client-server';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { resolveOrNotFound } from '@/features/routing/not-found.utils';

type ResolveCommunityResult = GetCommunityByIdResult['community'];

interface ResolveCommunityParams {
  communityId: string;
}

export async function resolveCommunity({ communityId }: ResolveCommunityParams): Promise<ResolveCommunityResult> {
  const graphqlClient = new GraphqlClientService(await getInstanceServerApolloClient());

  return resolveOrNotFound(async () => {
    const result = await graphqlClient.query(GET_COMMUNITY_BY_ID_QUERY, { id: communityId });
    return result.community;
  });
}
