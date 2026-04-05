import { requestsGraphqlApi } from "@/features/communities/api";
import { COMMUNITIES_SERVICE_ERRORS } from "@/features/communities/constants";
import type { Request, RequestStatusChangedEvent } from "@/features/communities/model";
import type { GraphqlClient } from "@/features/graphql";

interface SubscriptionHandlers<TData> {
  onData: (data: TData) => void;
  onError?: (error: unknown) => void;
  onComplete?: () => void;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
};

export const requestsService = {
  async getRequestById(client: GraphqlClient, requestId: string): Promise<Request> {
    try {
      return await requestsGraphqlApi.getRequestById(client, { id: requestId });
    } catch (error) {
      throw new Error(
        `${COMMUNITIES_SERVICE_ERRORS.GET_REQUEST}: ${getErrorMessage(error)}`,
      );
    }
  },

  subscribeToRequestStatusChanged(
    client: GraphqlClient,
    userId: string,
    handlers: SubscriptionHandlers<RequestStatusChangedEvent>,
  ): () => void {
    try {
      const subscription = requestsGraphqlApi
        .subscribeToRequestStatusChanged(client, { userId })
        .subscribe({
          next: (result) => {
            const event = result.data?.requestStatusChanged;

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
    } catch (error) {
      throw new Error(
        `${COMMUNITIES_SERVICE_ERRORS.REQUEST_STATUS_CHANGED}: ${getErrorMessage(error)}`,
      );
    }
  },
};
