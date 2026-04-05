import type { FetchResult, Observable } from "@apollo/client";

import { ACTIONS_QUERY_FETCH_POLICY } from "@/features/actions/constants";
import type {
  Action,
  CreateActionRequestInput,
} from "@/features/actions/model";
import type { GraphqlClient } from "@/features/graphql";

import {
  ACTION_CREATED_SUBSCRIPTION,
  CREATE_ACTION_REQUEST_MUTATION,
  GET_ACTION_QUERY,
  GET_ACTIONS_QUERY,
} from "@/features/actions/api/graphql/actions.documents";

interface GetActionsResponse {
  actions: Action[];
}

interface GetActionResponse {
  action: Action;
}

interface GetActionVariables {
  id: string;
}

interface CreateActionRequestResponse {
  createActionRequest: string;
}

interface CreateActionRequestVariables {
  createActionRequestInput: CreateActionRequestInput;
}

interface ActionCreatedSubscriptionResponse {
  actionCreated: Action;
}

interface ActionCreatedSubscriptionVariables {
  causeId: string;
}

export const actionsGraphqlApi = {
  async getActions(client: GraphqlClient): Promise<Action[]> {
    const response = await client.query<GetActionsResponse>({
      query: GET_ACTIONS_QUERY,
      fetchPolicy: ACTIONS_QUERY_FETCH_POLICY,
    });

    return response.data.actions;
  },

  async getActionById(
    client: GraphqlClient,
    variables: GetActionVariables,
  ): Promise<Action> {
    const response = await client.query<GetActionResponse, GetActionVariables>({
      query: GET_ACTION_QUERY,
      variables,
      fetchPolicy: ACTIONS_QUERY_FETCH_POLICY,
    });

    return response.data.action;
  },

  async createActionRequest(
    client: GraphqlClient,
    variables: CreateActionRequestVariables,
  ): Promise<string> {
    const response = await client.mutate<
      CreateActionRequestResponse,
      CreateActionRequestVariables
    >({
      mutation: CREATE_ACTION_REQUEST_MUTATION,
      variables,
    });

    return response.data?.createActionRequest ?? "";
  },

  subscribeToActionCreated(
    client: GraphqlClient,
    variables: ActionCreatedSubscriptionVariables,
  ): Observable<FetchResult<ActionCreatedSubscriptionResponse>> {
    return client.subscribe<
      ActionCreatedSubscriptionResponse,
      ActionCreatedSubscriptionVariables
    >({
      query: ACTION_CREATED_SUBSCRIPTION,
      variables,
    });
  },
};
