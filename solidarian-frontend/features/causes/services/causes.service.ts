import { causesGraphqlApi } from '@/features/causes/api/graphql/causes.api';
import { Cause, CreateCauseRequestInput } from '@/features/causes/model/causes.model';
import { GraphqlClient } from '@/features/graphql/apollo-client';
import { getErrorMessage, SubscriptionHandlers } from '@/features/graphql/graphql-service.utils';

export const causesService = {
  async getCauses(client: GraphqlClient): Promise<Cause[]> {
    try {
      return await causesGraphqlApi.getCauses(client);
    } catch (error) {
      throw new Error(`Unable to fetch causes: ${getErrorMessage(error)}`, {
        cause: error,
      });
    }
  },

  async joinCause(client: GraphqlClient, causeId: string, userId: string): Promise<boolean> {
    try {
      return await causesGraphqlApi.joinCause(client, { causeId, userId });
    } catch (error) {
      throw new Error(`Unable to join cause: ${getErrorMessage(error)}`, {
        cause: error,
      });
    }
  },

  async createCauseRequest(client: GraphqlClient, input: CreateCauseRequestInput): Promise<string> {
    try {
      return await causesGraphqlApi.createCauseRequest(client, {
        createCauseRequestInput: input,
      });
    } catch (error) {
      throw new Error(`Unable to create cause request: ${getErrorMessage(error)}`, {
        cause: error,
      });
    }
  },

  subscribeToCauseCreated(
    client: GraphqlClient,
    communityId: string,
    handlers: SubscriptionHandlers<Cause>
  ): () => void {
    const subscription = causesGraphqlApi.subscribeToCauseCreated(client, { communityId }).subscribe({
      next: ({ data }) => {
        const cause = data?.causeCreated;

        if (cause) {
          handlers.onData(cause);
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
