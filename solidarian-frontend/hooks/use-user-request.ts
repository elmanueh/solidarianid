'use client';

import {
  GET_REQUESTS_BY_USER_ID_QUERY,
  type GetRequestsByUserIdResult,
} from '@/features/communities/api/graphql/requests.documents';
import { useAppSelector } from '@/features/redux/redux-hook';
import { useQuery } from '@apollo/client/react';

export type UserRequest = GetRequestsByUserIdResult['getRequestsByUserId'][number];

interface UseUserRequestResult {
  requests: UserRequest[];
  loading: boolean;
  error: string | null;
}

const EMPTY_REQUESTS: UserRequest[] = [];

export function useUserRequest(userId?: string): UseUserRequestResult {
  const currentUserId = useAppSelector(state => state.auth.currentUser?.id);
  const resolvedUserId = userId ?? currentUserId;
  const requestsQuery = useQuery(GET_REQUESTS_BY_USER_ID_QUERY, {
    variables: { userId: resolvedUserId ?? '' },
    skip: !resolvedUserId,
    fetchPolicy: 'network-only',
  });

  return {
    requests: requestsQuery.data?.getRequestsByUserId ?? EMPTY_REQUESTS,
    loading: Boolean(resolvedUserId) ? requestsQuery.loading : false,
    error: Boolean(resolvedUserId) ? (requestsQuery.error?.message ?? null) : null,
  };
}

export default useUserRequest;
