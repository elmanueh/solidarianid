import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

export type GraphqlClient = ApolloClient;
const HTTP_URL = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL ?? 'http://localhost:3002/graphql';
const WS_URL = process.env.NEXT_PUBLIC_GRAPHQL_WS_URL ?? 'ws://localhost:3002/graphql';

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
    console.error(`[Network error][${operationName}] ${error.message}`);
  }
});

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
