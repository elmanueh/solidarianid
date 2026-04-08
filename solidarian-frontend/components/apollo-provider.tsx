'use client';

import { createApolloClient } from '@/features/graphql/apollo-client';
import { ApolloProvider } from '@apollo/client/react';
import { useMemo, type ReactNode } from 'react';

interface ApolloGraphqlProviderProps {
  children: ReactNode;
}

export function ApolloGraphqlProvider({ children }: Readonly<ApolloGraphqlProviderProps>): ReactNode {
  const client = useMemo(() => createApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
