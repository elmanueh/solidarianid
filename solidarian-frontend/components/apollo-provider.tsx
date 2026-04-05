'use client';

import { ApolloProvider } from '@apollo/client';
import { useMemo, type ReactNode } from 'react';

import { createApolloClient } from '@/features/graphql/apollo-client';

interface ApolloGraphqlProviderProps {
  children: ReactNode;
}

export function ApolloGraphqlProvider({ children }: ApolloGraphqlProviderProps): ReactNode {
  const client = useMemo(() => createApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
