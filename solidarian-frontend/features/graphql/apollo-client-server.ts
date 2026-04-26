import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { CombinedGraphQLErrors, CombinedProtocolErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { OperationTypeNode } from 'graphql';
import { headers } from 'next/headers';
import { HTTP_URL, WS_URL } from '@/features/graphql/graphql-config';

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

export const getInstanceServerApolloClient = async (): Promise<ApolloClient> => {
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get('cookie') ?? '';

  const serverHttpLink = new HttpLink({
    uri: HTTP_URL,
    credentials: 'include',
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, serverHttpLink]),
  });
};
