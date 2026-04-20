'use client';

import type { UserSubscriptionsResponse } from '@/features/notifications/api/graphql/notifications.documents';

import { useRetrieveData } from '@/hooks/generics/retrieve-data-custom-hook';

export type ProfileImpactStats = {
  contributions: number;
  objectives: number;
  events: number;
  communities: number;
};

const DEFAULT_PROFILE_IMPACT_STATS: ProfileImpactStats = {
  contributions: 0,
  objectives: 0,
  events: 0,
  communities: 0,
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8090/api/v1';

const countUniqueIds = (ids: string[]): number => new Set(ids).size;

async function fetchProfileImpactStats(userId: string): Promise<ProfileImpactStats> {
  const queryParams = new URLSearchParams({
    includeRequestIds: 'true',
    includeFollowedCauseIds: 'false',
    includeFollowedCommunityIds: 'true',
    includeEventIds: 'true',
    includeObjectiveIds: 'true',
    requestStatus: 'approved',
  });

  const response = await fetch(`${apiBaseUrl}/subscriptions/${encodeURIComponent(userId)}?${queryParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`No se pudieron cargar los stats del perfil (${response.status}).`);
  }

  const subscriptions = (await response.json()) as UserSubscriptionsResponse;

  return {
    contributions: countUniqueIds(subscriptions.requestIds),
    objectives: countUniqueIds(subscriptions.objectiveIds),
    events: countUniqueIds(subscriptions.eventIds),
    communities: countUniqueIds(subscriptions.followedCommunityIds),
  };
}

export function useProfileImpactStats(userId?: string) {
  return useRetrieveData<ProfileImpactStats>(async () => {
    if (!userId) {
      return DEFAULT_PROFILE_IMPACT_STATS;
    }

    return fetchProfileImpactStats(userId);
  }, [userId]);
}
