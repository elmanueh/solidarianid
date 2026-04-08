import {
  CREATE_COMMUNITY_REQUEST_MUTATION,
  GET_COMMUNITIES_QUERY,
  JOIN_COMMUNITY_MUTATION,
  type CreateCommunityRequestVariables,
  type JoinCommunityVariables,
} from '@/features/communities/api/graphql/communities.documents';
import { Community } from '@/features/communities/model/communities.model';
import { GraphqlClient } from '@/features/graphql/apollo-client';

export const communitiesGraphqlApi = {
  async getCommunities(client: GraphqlClient): Promise<Community[]> {
    const response = await client.query({
      query: GET_COMMUNITIES_QUERY,
      fetchPolicy: 'network-only',
    });

    if (!response.data) {
      throw new Error('GetCommunities returned no data');
    }

    return response.data.communities;
  },

  async joinCommunity(client: GraphqlClient, variables: JoinCommunityVariables) {
    const response = await client.mutate({
      mutation: JOIN_COMMUNITY_MUTATION,
      variables,
    });

    return response.data?.joinCommunity ?? false;
  },

  async createCommunityRequest(client: GraphqlClient, variables: CreateCommunityRequestVariables) {
    const response = await client.mutate({
      mutation: CREATE_COMMUNITY_REQUEST_MUTATION,
      variables,
    });

    const requestId = response.data?.createCommunityRequest;

    if (!requestId) {
      throw new Error('createCommunityRequest returned an empty response');
    }

    return requestId;
  },
};
