'use client';

import {
  GET_FAVORITE_CAUSES_BY_USER_QUERY,
  type GetFavoriteCausesByUserResult,
} from '@/features/causes/api/graphql/causes.documents';
import {
  GET_FAVORITE_COMMUNITIES_BY_USER_QUERY,
  type GetFavoriteCommunitiesByUserResult,
} from '@/features/communities/api/graphql/communities.documents';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { useApolloClient } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';

export type FavoriteCommunity = GetFavoriteCommunitiesByUserResult['userMemberCommunities'][number] & {
  imageUrl: string;
};

export type FavoriteCause = GetFavoriteCausesByUserResult['userFollowedCauses'][number] & {
  imageUrl: string;
};

type FavoritesSectionState<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
};

type UseFavoritesDataResult = {
  communitiesState: FavoritesSectionState<FavoriteCommunity>;
  causesState: FavoritesSectionState<FavoriteCause>;
};

const COMMUNITY_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop',
] as const;

const CAUSE_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509099863731-ef4bff19e808?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop',
] as const;

const getStableImageIndex = (seed: string, poolSize: number): number => {
  const sum = seed.split('').reduce((accumulator, character) => accumulator + (character.codePointAt(0) ?? 0), 0);

  return sum % poolSize;
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    if (error.message.includes('was not found')) {
      return 'Tu usuario todavía no existe en backend. Revisá el UUID mockeado o crealo allí.';
    }

    return error.message;
  }

  return fallback;
};

/** Búsqueda y modal trabajan 100% local sobre esta carga completa inicial. */
export function useFavoritesData(currentUserId?: string): UseFavoritesDataResult {
  const apolloClient = useApolloClient();
  const graphql = useMemo(() => new GraphqlClientService(apolloClient), [apolloClient]);
  const [communitiesState, setCommunitiesState] = useState<FavoritesSectionState<FavoriteCommunity>>({
    items: [],
    loading: true,
    error: null,
  });
  const [causesState, setCausesState] = useState<FavoritesSectionState<FavoriteCause>>({
    items: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    if (!currentUserId) {
      return;
    }

    const loadFavorites = async (): Promise<void> => {
      setCommunitiesState(previous => ({ ...previous, loading: true, error: null }));
      setCausesState(previous => ({ ...previous, loading: true, error: null }));

      const [communitiesResult, causesResult] = await Promise.allSettled([
        graphql.query(GET_FAVORITE_COMMUNITIES_BY_USER_QUERY, { userId: currentUserId }),
        graphql.query(GET_FAVORITE_CAUSES_BY_USER_QUERY, { userId: currentUserId }),
      ]);

      if (cancelled) {
        return;
      }

      if (communitiesResult.status === 'fulfilled') {
        setCommunitiesState({
          items: communitiesResult.value.userMemberCommunities.map(community => ({
            ...community,
            imageUrl: COMMUNITY_IMAGE_URLS[getStableImageIndex(community.id, COMMUNITY_IMAGE_URLS.length)],
          })),
          loading: false,
          error: null,
        });
      } else {
        setCommunitiesState({
          items: [],
          loading: false,
          error: getErrorMessage(communitiesResult.reason, 'No se pudieron cargar tus comunidades favoritas.'),
        });
      }

      if (causesResult.status === 'fulfilled') {
        setCausesState({
          items: causesResult.value.userFollowedCauses.map(cause => ({
            ...cause,
            imageUrl: CAUSE_IMAGE_URLS[getStableImageIndex(cause.id, CAUSE_IMAGE_URLS.length)],
          })),
          loading: false,
          error: null,
        });
      } else {
        setCausesState({
          items: [],
          loading: false,
          error: getErrorMessage(causesResult.reason, 'No se pudieron cargar tus causas favoritas.'),
        });
      }
    };

    void loadFavorites();

    return () => {
      cancelled = true;
    };
  }, [currentUserId, graphql]);

  return {
    communitiesState,
    causesState,
  };
}
