import { APP_URLS } from '@/features/config/urls';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: APP_URLS.graphql.http,
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
    const endpoint =
      operation.operationType === OperationTypeNode.SUBSCRIPTION ? APP_URLS.graphql.ws : APP_URLS.graphql.http;
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
      url: APP_URLS.graphql.ws,
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
