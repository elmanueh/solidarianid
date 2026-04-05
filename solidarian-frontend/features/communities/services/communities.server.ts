import { GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID } from '@/features/communities/graphql/queries';
import type { CauseByCommunityResponse, CauseByCommunityVariables } from '@/features/communities/graphql/types';
import { SERVER_ENDPOINTS } from '@/infrastructure/config/server-endpoints';
import { fetchGraphQL } from '@/infrastructure/graphql/fetch-graphql.server';

export async function getCauseByCommunityIdAndCauseId(
  communityId: string,
  causeId: string
): Promise<NonNullable<CauseByCommunityResponse['causeByCommunity']>> {
  const data = await fetchGraphQL<CauseByCommunityResponse, CauseByCommunityVariables>({
    endpoint: SERVER_ENDPOINTS.graphql,
    query: GET_CAUSE_BY_COMMUNITY_ID_AND_CAUSE_ID,
    variables: { communityId, causeId },
    operationName: 'causeByCommunity',
  });

  if (!data.causeByCommunity) {
    throw new Error('Cause not found');
  }

  return data.causeByCommunity;
}
