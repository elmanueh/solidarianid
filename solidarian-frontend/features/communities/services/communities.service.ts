import { communitiesGraphqlApi } from "@/features/communities/api";
import { COMMUNITIES_SERVICE_ERRORS } from "@/features/communities/constants";
import type {
  Community,
  CreateCommunityRequestInput,
} from "@/features/communities/model";
import type { GraphqlClient } from "@/features/graphql";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
};

export const communitiesService = {
  async getCommunities(client: GraphqlClient): Promise<Community[]> {
    try {
      return await communitiesGraphqlApi.getCommunities(client);
    } catch (error) {
      throw new Error(
        `${COMMUNITIES_SERVICE_ERRORS.GET_COMMUNITIES}: ${getErrorMessage(error)}`,
      );
    }
  },

  async getCommunityById(
    client: GraphqlClient,
    communityId: string,
  ): Promise<Community> {
    try {
      return await communitiesGraphqlApi.getCommunityById(client, {
        id: communityId,
      });
    } catch (error) {
      throw new Error(
        `${COMMUNITIES_SERVICE_ERRORS.GET_COMMUNITY}: ${getErrorMessage(error)}`,
      );
    }
  },

  async joinCommunity(
    client: GraphqlClient,
    communityId: string,
    userId: string,
  ): Promise<boolean> {
    try {
      return await communitiesGraphqlApi.joinCommunity(client, {
        communityId,
        userId,
      });
    } catch (error) {
      throw new Error(
        `${COMMUNITIES_SERVICE_ERRORS.JOIN_COMMUNITY}: ${getErrorMessage(error)}`,
      );
    }
  },

  async createCommunityRequest(
    client: GraphqlClient,
    input: CreateCommunityRequestInput,
  ): Promise<string> {
    try {
      return await communitiesGraphqlApi.createCommunityRequest(client, {
        createCommunityRequestInput: input,
      });
    } catch (error) {
      throw new Error(
        `${COMMUNITIES_SERVICE_ERRORS.CREATE_COMMUNITY_REQUEST}: ${getErrorMessage(error)}`,
      );
    }
  },
};
