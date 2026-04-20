import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:8090/graphql';
const HTTP_URL = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ?? GRAPHQL_ENDPOINT;
const WS_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ??
  GRAPHQL_ENDPOINT.replace(/^http(s?):\/\//, (_, secure) => `ws${secure ? 's' : ''}://`);

const httpLink = new HttpLink({
  uri: HTTP_URL,
  credentials: 'include',
});

const errorLink = new ErrorLink(({ error, operation }) => {
  const operationName = operation.operationName || 'anonymous';

  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      console.error(`[GraphQL error][${operationName}] ${message}`);
    });
    return;
  }

  if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message }) => {
      console.error(`[Protocol error][${operationName}] ${message}`);
    });
    return;
  }

  if (error) {
    const endpoint = operation.operationType === OperationTypeNode.SUBSCRIPTION ? WS_URL : HTTP_URL;
    console.error(`[Network error][${operationName}] ${error.message} (${endpoint})`);
  }
});

export type GraphqlClient = ApolloClient;
export const createApolloClient = (): ApolloClient => {
  if (globalThis.window === undefined) {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from([errorLink, httpLink]),
    });
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: WS_URL,
      keepAlive: 15000,
      lazyCloseTimeout: 30000,
    })
  );

  const link = ApolloLink.split(
    ({ operationType }) => operationType === OperationTypeNode.SUBSCRIPTION,
    wsLink,
    httpLink
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, link]),
  });
};

let instanceServerApolloClient: ApolloClient | undefined = undefined;

export const getInstanceServerApolloClient = (): ApolloClient => {
  if (!instanceServerApolloClient) {
    instanceServerApolloClient = createApolloClient();
  }
  return instanceServerApolloClient;
};
