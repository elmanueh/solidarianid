import { actionsGraphqlApi } from "@/features/actions/api";
import { ACTIONS_SERVICE_ERRORS } from "@/features/actions/constants";
import type {
  Action,
  CreateActionRequestInput,
} from "@/features/actions/model";
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

export const actionsService = {
  async getActions(client: GraphqlClient): Promise<Action[]> {
    try {
      return await actionsGraphqlApi.getActions(client);
    } catch (error) {
      throw new Error(
        `${ACTIONS_SERVICE_ERRORS.GET_ACTIONS}: ${getErrorMessage(error)}`,
      );
    }
  },

  async getActionById(client: GraphqlClient, actionId: string): Promise<Action> {
    try {
      return await actionsGraphqlApi.getActionById(client, { id: actionId });
    } catch (error) {
      throw new Error(
        `${ACTIONS_SERVICE_ERRORS.GET_ACTION}: ${getErrorMessage(error)}`,
      );
    }
  },

  async createActionRequest(
    client: GraphqlClient,
    input: CreateActionRequestInput,
  ): Promise<string> {
    try {
      return await actionsGraphqlApi.createActionRequest(client, {
        createActionRequestInput: input,
      });
    } catch (error) {
      throw new Error(
        `${ACTIONS_SERVICE_ERRORS.CREATE_ACTION_REQUEST}: ${getErrorMessage(error)}`,
      );
    }
  },

  subscribeToActionCreated(
    client: GraphqlClient,
    causeId: string,
    handlers: SubscriptionHandlers<Action>,
  ): () => void {
    try {
      const subscription = actionsGraphqlApi
        .subscribeToActionCreated(client, { causeId })
        .subscribe({
          next: (result) => {
            const action = result.data?.actionCreated;

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
    } catch (error) {
      throw new Error(
        `${ACTIONS_SERVICE_ERRORS.ACTION_CREATED}: ${getErrorMessage(error)}`,
      );
    }
  },
};
