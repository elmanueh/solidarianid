import {
  REQUEST_STATUS_CHANGED_SUBSCRIPTION,
  type RequestStatusChangedVariables,
} from '@/features/communities/api/graphql/requests.documents';
import { GraphqlClient } from '@/features/graphql/apollo-client';

export const requestsGraphqlApi = {
  subscribeToRequestStatusChanged(client: GraphqlClient, variables: RequestStatusChangedVariables) {
    return client.subscribe({
      query: REQUEST_STATUS_CHANGED_SUBSCRIPTION,
      variables,
    });
  },
};
