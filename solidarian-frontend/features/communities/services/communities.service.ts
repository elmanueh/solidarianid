import { communitiesGraphqlApi } from '@/features/communities/api/graphql/communities.api';
import { Community, CreateCommunityRequestInput } from '@/features/communities/model/communities.model';
import { GraphqlClient } from '@/features/graphql/apollo-client';
import { getErrorMessage } from '@/features/graphql/graphql-service.utils';

export const communitiesService = {
  async getCommunities(client: GraphqlClient): Promise<Community[]> {
    try {
      return await communitiesGraphqlApi.getCommunities(client);
    } catch (error) {
      throw new Error(`Unable to fetch communities: ${getErrorMessage(error)}`, {
        cause: error,
      });
    }
  },

  async joinCommunity(client: GraphqlClient, communityId: string, userId: string): Promise<boolean> {
    try {
      return await communitiesGraphqlApi.joinCommunity(client, {
        communityId,
        userId,
      });
    } catch (error) {
      throw new Error(`Unable to join community: ${getErrorMessage(error)}`, {
        cause: error,
      });
    }
  },

  async createCommunityRequest(client: GraphqlClient, input: CreateCommunityRequestInput): Promise<string> {
    try {
      return await communitiesGraphqlApi.createCommunityRequest(client, {
        createCommunityRequestInput: input,
      });
    } catch (error) {
      throw new Error(`Unable to create community request: ${getErrorMessage(error)}`, {
        cause: error,
      });
    }
  },
};
