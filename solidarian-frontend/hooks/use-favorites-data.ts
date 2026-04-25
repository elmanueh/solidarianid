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
import { PexelsImageService } from '@/features/images/pexels-image.service';
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

const imageService = new PexelsImageService();

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
        const communities = await Promise.all(
          communitiesResult.value.userMemberCommunities.map(async community => {
            const banner = await imageService.getDeterministicBanner({ uuid: community.id, theme: community.name });
            return { ...community, imageUrl: banner.large };
          })
        );

        setCommunitiesState({
          items: communities,
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
        const causes = await Promise.all(
          causesResult.value.userFollowedCauses.map(async cause => {
            const banner = await imageService.getDeterministicBanner({ uuid: cause.id, theme: cause.name });
            return { ...cause, imageUrl: banner.large };
          })
        );

        setCausesState({
          items: causes,
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
