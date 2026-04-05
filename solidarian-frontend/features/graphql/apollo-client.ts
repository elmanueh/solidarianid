import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  type NormalizedCacheObject,
} from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import type { DocumentNode } from "graphql";

const DEFAULT_GRAPHQL_HTTP_URL = "http://localhost:3002/graphql";
const DEFAULT_GRAPHQL_WS_URL = "ws://localhost:3002/graphql";

const resolveGraphqlHttpUrl = (): string => {
  const configuredHttpUrl = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL;

  if (configuredHttpUrl) {
    return configuredHttpUrl;
  }

  return DEFAULT_GRAPHQL_HTTP_URL;
};

const resolveGraphqlWsUrl = (): string => {
  const configuredWsUrl = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL;

  if (configuredWsUrl) {
    return configuredWsUrl;
  }

  return DEFAULT_GRAPHQL_WS_URL;
};

const createHttpLink = (): HttpLink =>
  new HttpLink({
    uri: resolveGraphqlHttpUrl(),
    credentials: "include",
  });

interface ErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (value: unknown): value is ErrorWithMessage => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as { message?: unknown };
  return typeof candidate.message === "string";
};

const collectErrors = (value: unknown): ErrorWithMessage[] => {
  if (Array.isArray(value)) {
    return value.filter(isErrorWithMessage);
  }

  if (isErrorWithMessage(value)) {
    return [value];
  }

  return [];
};

const isConnectivityError = (message: string): boolean => {
  const normalizedMessage = message.toLowerCase();

  return (
    normalizedMessage.includes("failed to fetch") ||
    normalizedMessage.includes("load failed") ||
    normalizedMessage.includes("networkerror")
  );
};

const errorLink = onError((errorContext: ErrorResponse) => {
  const operationName = errorContext.operation.operationName || "anonymous";
  const contextMap = errorContext as unknown as Record<string, unknown>;
  const errors = [
    ...collectErrors(contextMap["error"]),
    ...collectErrors(contextMap["graphQLErrors"]),
    ...collectErrors(contextMap["networkError"]),
    ...collectErrors(contextMap["protocolErrors"]),
  ];

  if (errors.length === 0) {
    console.error(`[GraphQL error][${operationName}] Unexpected error shape`);
    return;
  }

  errors.forEach((error) => {
    // Keep global logging centralized while UI-specific handling remains in services/hooks.
    if (isConnectivityError(error.message)) {
      console.warn(
        `[GraphQL warning][${operationName}] ${error.message}. Revisa NEXT_PUBLIC_GRAPHQL_HTTP_URL/NEXT_PUBLIC_GRAPHQL_WS_URL.`,
      );
      return;
    }

    console.error(`[GraphQL error][${operationName}] ${error.message}`);
  });
});

const isSubscriptionOperation = (query: DocumentNode): boolean => {
  const definition = getMainDefinition(query);

  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
};

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = createHttpLink();

  if (typeof window === "undefined") {
    return new ApolloClient({
      link: errorLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: resolveGraphqlWsUrl(),
      shouldRetry: () => true,
      retryAttempts: 5,
      lazy: true,
    }),
  );

  const combinedLink = split(
    ({ query }) => isSubscriptionOperation(query),
    wsLink,
    httpLink,
  );

  return new ApolloClient({
    link: errorLink.concat(combinedLink),
    cache: new InMemoryCache(),
  });
};
