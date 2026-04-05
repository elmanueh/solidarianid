import type { ApolloQueryResult } from "@apollo/client";

import { COMMUNITIES_QUERY_FETCH_POLICY } from "@/features/communities/constants";
import type {
  Community,
  CreateCommunityRequestInput,
} from "@/features/communities/model";
import type { GraphqlClient } from "@/features/graphql";

import {
  CREATE_COMMUNITY_REQUEST_MUTATION,
  GET_COMMUNITIES_QUERY,
  GET_COMMUNITY_QUERY,
  JOIN_COMMUNITY_MUTATION,
} from "@/features/communities/api/graphql/communities.documents";

interface GetCommunitiesResponse {
  communities: Community[];
}

interface GetCommunityResponse {
  community: Community;
}

interface GetCommunityVariables {
  id: string;
}

interface JoinCommunityResponse {
  joinCommunity: boolean;
}

interface JoinCommunityVariables {
  communityId: string;
  userId: string;
}

interface CreateCommunityRequestResponse {
  createCommunityRequest: string;
}

interface CreateCommunityRequestVariables {
  createCommunityRequestInput: CreateCommunityRequestInput;
}

const extractData = <T>(response: ApolloQueryResult<T>): T => response.data;

export const communitiesGraphqlApi = {
  async getCommunities(client: GraphqlClient): Promise<Community[]> {
    const response = await client.query<GetCommunitiesResponse>({
      query: GET_COMMUNITIES_QUERY,
      fetchPolicy: COMMUNITIES_QUERY_FETCH_POLICY,
    });

    return extractData(response).communities;
  },

  async getCommunityById(
    client: GraphqlClient,
    variables: GetCommunityVariables,
  ): Promise<Community> {
    const response = await client.query<GetCommunityResponse, GetCommunityVariables>({
      query: GET_COMMUNITY_QUERY,
      variables,
      fetchPolicy: COMMUNITIES_QUERY_FETCH_POLICY,
    });

    return extractData(response).community;
  },

  async joinCommunity(
    client: GraphqlClient,
    variables: JoinCommunityVariables,
  ): Promise<boolean> {
    const response = await client.mutate<
      JoinCommunityResponse,
      JoinCommunityVariables
    >({
      mutation: JOIN_COMMUNITY_MUTATION,
      variables,
    });

    return response.data?.joinCommunity ?? false;
  },

  async createCommunityRequest(
    client: GraphqlClient,
    variables: CreateCommunityRequestVariables,
  ): Promise<string> {
    const response = await client.mutate<
      CreateCommunityRequestResponse,
      CreateCommunityRequestVariables
    >({
      mutation: CREATE_COMMUNITY_REQUEST_MUTATION,
      variables,
    });

    const requestId = response.data?.createCommunityRequest;

    if (!requestId) {
      throw new Error("createCommunityRequest returned an empty response");
    }

    return requestId;
  },
};
