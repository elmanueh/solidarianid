import 'client-only';

import { JOIN_CAUSE_MUTATION, LEAVE_CAUSE_MUTATION } from '@/features/communities/graphql/mutations';
import { CLIENT_ENDPOINTS } from '@/infrastructure/config/client-endpoints';
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: CLIENT_ENDPOINTS.graphql,
  }),
  cache: new InMemoryCache(),
});

const JOIN_CAUSE_DOCUMENT = gql(JOIN_CAUSE_MUTATION);
const LEAVE_CAUSE_DOCUMENT = gql(LEAVE_CAUSE_MUTATION);

type JoinCauseResponse = {
  joinCause: boolean;
};

type CauseActionVariables = {
  causeId: string;
  userId: string;
};

export async function joinCause(causeId: string, userId: string): Promise<boolean> {
  const result = await apolloClient.mutate<JoinCauseResponse, CauseActionVariables>({
    mutation: JOIN_CAUSE_DOCUMENT,
    variables: { causeId, userId },
  });

  return Boolean(result.data?.joinCause);
}

type LeaveCauseResponse = {
  leaveCause: boolean;
};

export async function leaveCause(causeId: string, userId: string): Promise<boolean> {
  const result = await apolloClient.mutate<LeaveCauseResponse, CauseActionVariables>({
    mutation: LEAVE_CAUSE_DOCUMENT,
    variables: { causeId, userId },
  });

  return Boolean(result.data?.leaveCause);
}
