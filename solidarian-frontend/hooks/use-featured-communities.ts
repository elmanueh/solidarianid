'use client';

import {
  GET_COMMUNITIES_QUERY,
  type GetCommunitiesResult,
} from '@/features/communities/api/graphql/communities.documents';
import { getCommunityImageUrl } from '@/features/communities/constants/community-images.constants';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { useApolloClient } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export type FeaturedCommunity = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

interface UseFeaturedCommunitiesResult {
  communities: FeaturedCommunity[];
  loading: boolean;
  error: string | null;
}

const withImageUrl = (community: GetCommunitiesResult['communities'][number]): FeaturedCommunity => {
  return {
    ...community,
    imageUrl: getCommunityImageUrl(community.id),
  };
};

const normalizeLimit = (limit: number): number => {
  if (!Number.isFinite(limit)) {
    return 0;
  }

  return Math.max(0, Math.floor(limit));
};

export function useFeaturedCommunities(limit = 3): UseFeaturedCommunitiesResult {
  const graphql = new GraphqlClientService(useApolloClient());
  const [communities, setCommunities] = useState<FeaturedCommunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const normalizedLimit = normalizeLimit(limit);

  useEffect(() => {
    let cancelled = false;

    const loadCommunities = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const data = await graphql.query(GET_COMMUNITIES_QUERY, {});

        if (cancelled) {
          return;
        }

        setCommunities(data.communities.slice(0, normalizedLimit).map(withImageUrl));
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar las comunidades destacadas.');
        setCommunities([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadCommunities();

    return () => {
      cancelled = true;
    };
  }, [normalizedLimit]);

  return {
    communities,
    loading,
    error,
  };
}
