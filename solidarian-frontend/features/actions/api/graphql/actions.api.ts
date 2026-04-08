import {
  ACTION_CREATED_SUBSCRIPTION,
  CREATE_ACTION_REQUEST_MUTATION,
  type ActionCreatedVariables,
  type CreateActionRequestVariables,
} from '@/features/actions/api/graphql/actions.documents';
import { GraphqlClient } from '@/features/graphql/apollo-client';

export const actionsGraphqlApi = {
  async createActionRequest(client: GraphqlClient, variables: CreateActionRequestVariables) {
    const response = await client.mutate({
      mutation: CREATE_ACTION_REQUEST_MUTATION,
      variables,
    });

    const requestId = response.data?.createActionRequest;

    if (!requestId) {
      throw new Error('createActionRequest returned an empty response');
    }

    return requestId;
  },

  subscribeToActionCreated(client: GraphqlClient, variables: ActionCreatedVariables) {
    return client.subscribe({
      query: ACTION_CREATED_SUBSCRIPTION,
      variables,
    });
  },
};
