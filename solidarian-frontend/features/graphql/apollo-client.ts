import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';
import { HTTP_URL, WS_URL } from '@/features/graphql/graphql-config';

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
