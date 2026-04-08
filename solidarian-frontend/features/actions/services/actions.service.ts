import { actionsGraphqlApi } from '@/features/actions/api/graphql/actions.api';
import { Action, CreateActionRequestInput } from '@/features/actions/model/actions.model';
import { GraphqlClient } from '@/features/graphql/apollo-client';
import { getErrorMessage, SubscriptionHandlers } from '@/features/graphql/graphql-service.utils';

export const actionsService = {
  async createActionRequest(client: GraphqlClient, input: CreateActionRequestInput): Promise<string> {
    try {
      return await actionsGraphqlApi.createActionRequest(client, {
        createActionRequestInput: input,
      });
    } catch (error) {
      throw new Error(`Unable to create action request: ${getErrorMessage(error)}`, {
        cause: error,
      });
    }
  },

  subscribeToActionCreated(client: GraphqlClient, causeId: string, handlers: SubscriptionHandlers<Action>): () => void {
    const subscription = actionsGraphqlApi.subscribeToActionCreated(client, { causeId }).subscribe({
      next: ({ data }) => {
        const action = data?.actionCreated;

        if (action) {
          handlers.onData(action);
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
