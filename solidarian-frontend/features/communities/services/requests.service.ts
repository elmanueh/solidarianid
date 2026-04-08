import { requestsGraphqlApi } from '@/features/communities/api/graphql/requests.api';
import { RequestStatusChangedEvent } from '@/features/communities/model/communities.model';
import { GraphqlClient } from '@/features/graphql/apollo-client';
import { SubscriptionHandlers } from '@/features/graphql/graphql-service.utils';

export const requestsService = {
  subscribeToRequestStatusChanged(
    client: GraphqlClient,
    userId: string,
    handlers: SubscriptionHandlers<RequestStatusChangedEvent>
  ): () => void {
    const subscription = requestsGraphqlApi.subscribeToRequestStatusChanged(client, { userId }).subscribe({
      next: ({ data }) => {
        const event = data?.requestStatusChanged;

        if (event) {
          handlers.onData(event);
        }
      },
      error: handlers.onError,
      complete: handlers.onComplete,
    });

    return () => {
      subscription.unsubscribe();
    };
  },
};
