import { causesGraphqlApi } from "@/features/causes/api";
import { CAUSES_SERVICE_ERRORS } from "@/features/causes/constants";
import type { Cause, CreateCauseRequestInput } from "@/features/causes/model";
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

export const causesService = {
  async getCauses(client: GraphqlClient): Promise<Cause[]> {
    try {
      return await causesGraphqlApi.getCauses(client);
    } catch (error) {
      throw new Error(
        `${CAUSES_SERVICE_ERRORS.GET_CAUSES}: ${getErrorMessage(error)}`,
      );
    }
  },

  async getCauseById(client: GraphqlClient, causeId: string): Promise<Cause> {
    try {
      return await causesGraphqlApi.getCauseById(client, { id: causeId });
    } catch (error) {
      throw new Error(
        `${CAUSES_SERVICE_ERRORS.GET_CAUSE}: ${getErrorMessage(error)}`,
      );
    }
  },

  async getCausesByCommunity(
    client: GraphqlClient,
    communityId: string,
  ): Promise<Cause[]> {
    try {
      return await causesGraphqlApi.getCausesByCommunity(client, { communityId });
    } catch (error) {
      throw new Error(
        `${CAUSES_SERVICE_ERRORS.GET_CAUSES_BY_COMMUNITY}: ${getErrorMessage(error)}`,
      );
    }
  },

  async getCauseByCommunity(
    client: GraphqlClient,
    communityId: string,
    causeId: string,
  ): Promise<Cause> {
    try {
      return await causesGraphqlApi.getCauseByCommunity(client, {
        communityId,
        causeId,
      });
    } catch (error) {
      throw new Error(
        `${CAUSES_SERVICE_ERRORS.GET_CAUSE_BY_COMMUNITY}: ${getErrorMessage(error)}`,
      );
    }
  },

  async joinCause(
    client: GraphqlClient,
    causeId: string,
    userId: string,
  ): Promise<boolean> {
    try {
      return await causesGraphqlApi.joinCause(client, { causeId, userId });
    } catch (error) {
      throw new Error(
        `${CAUSES_SERVICE_ERRORS.JOIN_CAUSE}: ${getErrorMessage(error)}`,
      );
    }
  },

  async createCauseRequest(
    client: GraphqlClient,
    input: CreateCauseRequestInput,
  ): Promise<string> {
    try {
      return await causesGraphqlApi.createCauseRequest(client, {
        createCauseRequestInput: input,
      });
    } catch (error) {
      throw new Error(
        `${CAUSES_SERVICE_ERRORS.CREATE_CAUSE_REQUEST}: ${getErrorMessage(error)}`,
      );
    }
  },

  subscribeToCauseCreated(
    client: GraphqlClient,
    communityId: string,
    handlers: SubscriptionHandlers<Cause>,
  ): () => void {
    try {
      const subscription = causesGraphqlApi
        .subscribeToCauseCreated(client, { communityId })
        .subscribe({
          next: (result) => {
            const cause = result.data?.causeCreated;

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
    } catch (error) {
      throw new Error(
        `${CAUSES_SERVICE_ERRORS.CAUSE_CREATED}: ${getErrorMessage(error)}`,
      );
    }
  },
};
