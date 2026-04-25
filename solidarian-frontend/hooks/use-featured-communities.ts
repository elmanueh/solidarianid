'use client';

import { GET_COMMUNITIES_QUERY } from '@/features/communities/api/graphql/communities.documents';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { PexelsImageService } from '@/features/images/pexels-image.service';
import { useApolloClient } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';

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

const imageService = new PexelsImageService();

const normalizeLimit = (limit: number): number => {
  if (!Number.isFinite(limit)) {
    return 0;
  }

  return Math.max(0, Math.floor(limit));
};

export function useFeaturedCommunities(limit = 3): UseFeaturedCommunitiesResult {
  const apolloClient = useApolloClient();
  const graphql = useMemo(() => new GraphqlClientService(apolloClient), [apolloClient]);
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

        const nextCommunities = await Promise.all(
          data.communities.slice(0, normalizedLimit).map(async community => {
            const banner = await imageService.getDeterministicBanner({ uuid: community.id, theme: community.name });
            return { ...community, imageUrl: banner.large };
          })
        );

        setCommunities(nextCommunities);
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
  }, [normalizedLimit, graphql]);

  return {
    communities,
    loading,
    error,
  };
}
