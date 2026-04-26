import { APP_URLS } from '@/features/config/urls';
import { isEntityNotFoundGraphQLError } from '@/features/graphql/graphql-error.utils';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { OperationTypeNode } from 'graphql';
import { headers } from 'next/headers';

const errorLink = new ErrorLink(({ error, operation }) => {
  const operationName = operation.operationName || 'anonymous';

  if (CombinedGraphQLErrors.is(error)) {
    if (isEntityNotFoundGraphQLError(error)) {
      return;
    }

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

export const getInstanceServerApolloClient = async (): Promise<ApolloClient> => {
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get('cookie') ?? '';

  const serverHttpLink = new HttpLink({
    uri: APP_URLS.graphql.http,
    credentials: 'include',
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, serverHttpLink]),
  });
};
