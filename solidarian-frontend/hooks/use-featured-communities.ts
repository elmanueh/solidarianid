'use client';

import {
  GET_COMMUNITIES_QUERY,
  type GetCommunitiesResult,
} from '@/features/communities/api/graphql/communities.documents';
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

const COMMUNITY_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469571486292-b53601020a0b?w=1200&auto=format&fit=crop',
] as const;

const getStableImageIndex = (seed: string, poolSize: number): number => {
  const sum = seed.split('').reduce((accumulator, character) => accumulator + (character.codePointAt(0) ?? 0), 0);

  return sum % poolSize;
};

const withImageUrl = (community: GetCommunitiesResult['communities'][number]): FeaturedCommunity => {
  const imageIndex = getStableImageIndex(community.id, COMMUNITY_IMAGE_URLS.length);

  return {
    ...community,
    imageUrl: COMMUNITY_IMAGE_URLS[imageIndex],
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
