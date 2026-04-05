import type { FetchResult, Observable } from "@apollo/client";

import { COMMUNITIES_QUERY_FETCH_POLICY } from "@/features/communities/constants";
import type {
  Request,
  RequestStatusChangedEvent,
} from "@/features/communities/model";
import type { GraphqlClient } from "@/features/graphql";

import {
  GET_REQUEST_QUERY,
  REQUEST_STATUS_CHANGED_SUBSCRIPTION,
} from "@/features/communities/api/graphql/requests.documents";

interface GetRequestResponse {
  request: Request;
}

interface GetRequestVariables {
  id: string;
}

interface RequestStatusChangedSubscriptionResponse {
  requestStatusChanged: RequestStatusChangedEvent;
}

interface RequestStatusChangedSubscriptionVariables {
  userId: string;
}

export const requestsGraphqlApi = {
  async getRequestById(
    client: GraphqlClient,
    variables: GetRequestVariables,
  ): Promise<Request> {
    const response = await client.query<GetRequestResponse, GetRequestVariables>({
      query: GET_REQUEST_QUERY,
      variables,
      fetchPolicy: COMMUNITIES_QUERY_FETCH_POLICY,
    });

    return response.data.request;
  },

  subscribeToRequestStatusChanged(
    client: GraphqlClient,
    variables: RequestStatusChangedSubscriptionVariables,
  ): Observable<FetchResult<RequestStatusChangedSubscriptionResponse>> {
    return client.subscribe<
      RequestStatusChangedSubscriptionResponse,
      RequestStatusChangedSubscriptionVariables
    >({
      query: REQUEST_STATUS_CHANGED_SUBSCRIPTION,
      variables,
    });
  },
};
