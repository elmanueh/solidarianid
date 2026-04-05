import type { FetchResult, Observable } from "@apollo/client";

import { CAUSES_QUERY_FETCH_POLICY } from "@/features/causes/constants";
import type {
  Cause,
  CreateCauseRequestInput,
} from "@/features/causes/model";
import type { GraphqlClient } from "@/features/graphql";

import {
  CAUSE_CREATED_SUBSCRIPTION,
  CREATE_CAUSE_REQUEST_MUTATION,
  GET_CAUSE_BY_COMMUNITY_QUERY,
  GET_CAUSE_QUERY,
  GET_CAUSES_BY_COMMUNITY_QUERY,
  GET_CAUSES_QUERY,
  JOIN_CAUSE_MUTATION,
} from "@/features/causes/api/graphql/causes.documents";

interface GetCausesResponse {
  causes: Cause[];
}

interface GetCauseResponse {
  cause: Cause;
}

interface GetCauseVariables {
  id: string;
}

interface GetCausesByCommunityResponse {
  causesByCommunity: Cause[];
}

interface GetCausesByCommunityVariables {
  communityId: string;
}

interface GetCauseByCommunityResponse {
  causeByCommunity: Cause;
}

interface GetCauseByCommunityVariables {
  communityId: string;
  causeId: string;
}

interface JoinCauseResponse {
  joinCause: boolean;
}

interface JoinCauseVariables {
  causeId: string;
  userId: string;
}

interface CreateCauseRequestResponse {
  createCauseRequest: string;
}

interface CreateCauseRequestVariables {
  createCauseRequestInput: CreateCauseRequestInput;
}

interface CauseCreatedSubscriptionResponse {
  causeCreated: Cause;
}

interface CauseCreatedSubscriptionVariables {
  communityId: string;
}

export const causesGraphqlApi = {
  async getCauses(client: GraphqlClient): Promise<Cause[]> {
    const response = await client.query<GetCausesResponse>({
      query: GET_CAUSES_QUERY,
      fetchPolicy: CAUSES_QUERY_FETCH_POLICY,
    });

    return response.data.causes;
  },

  async getCauseById(
    client: GraphqlClient,
    variables: GetCauseVariables,
  ): Promise<Cause> {
    const response = await client.query<GetCauseResponse, GetCauseVariables>({
      query: GET_CAUSE_QUERY,
      variables,
      fetchPolicy: CAUSES_QUERY_FETCH_POLICY,
    });

    return response.data.cause;
  },

  async getCausesByCommunity(
    client: GraphqlClient,
    variables: GetCausesByCommunityVariables,
  ): Promise<Cause[]> {
    const response = await client.query<
      GetCausesByCommunityResponse,
      GetCausesByCommunityVariables
    >({
      query: GET_CAUSES_BY_COMMUNITY_QUERY,
      variables,
      fetchPolicy: CAUSES_QUERY_FETCH_POLICY,
    });

    return response.data.causesByCommunity;
  },

  async getCauseByCommunity(
    client: GraphqlClient,
    variables: GetCauseByCommunityVariables,
  ): Promise<Cause> {
    const response = await client.query<
      GetCauseByCommunityResponse,
      GetCauseByCommunityVariables
    >({
      query: GET_CAUSE_BY_COMMUNITY_QUERY,
      variables,
      fetchPolicy: CAUSES_QUERY_FETCH_POLICY,
    });

    return response.data.causeByCommunity;
  },

  async joinCause(
    client: GraphqlClient,
    variables: JoinCauseVariables,
  ): Promise<boolean> {
    const response = await client.mutate<JoinCauseResponse, JoinCauseVariables>({
      mutation: JOIN_CAUSE_MUTATION,
      variables,
    });

    return response.data?.joinCause ?? false;
  },

  async createCauseRequest(
    client: GraphqlClient,
    variables: CreateCauseRequestVariables,
  ): Promise<string> {
    const response = await client.mutate<
      CreateCauseRequestResponse,
      CreateCauseRequestVariables
    >({
      mutation: CREATE_CAUSE_REQUEST_MUTATION,
      variables,
    });

    return response.data?.createCauseRequest ?? "";
  },

  subscribeToCauseCreated(
    client: GraphqlClient,
    variables: CauseCreatedSubscriptionVariables,
  ): Observable<FetchResult<CauseCreatedSubscriptionResponse>> {
    return client.subscribe<
      CauseCreatedSubscriptionResponse,
      CauseCreatedSubscriptionVariables
    >({
      query: CAUSE_CREATED_SUBSCRIPTION,
      variables,
    });
  },
};
