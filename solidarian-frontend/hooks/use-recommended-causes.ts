'use client';

import { GET_CAUSES_QUERY, type GetCausesResult } from '@/features/causes/api/graphql/causes.documents';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { useApolloClient } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export type RecommendedCause = {
  id: string;
  name: string;
  description: string;
  durationDays: number;
  communityId: string;
  imageUrl: string;
};

interface UseRecommendedCausesResult {
  causes: RecommendedCause[];
  loading: boolean;
  error: string | null;
}

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

const withImageUrl = (cause: GetCausesResult['causes'][number]): RecommendedCause => {
  const imageIndex = getStableImageIndex(cause.id, CAUSE_IMAGE_URLS.length);

  return {
    ...cause,
    imageUrl: CAUSE_IMAGE_URLS[imageIndex],
  };
};

const normalizeLimit = (limit: number): number => {
  if (!Number.isFinite(limit)) {
    return 0;
  }

  return Math.max(0, Math.floor(limit));
};

export function useRecommendedCauses(limit = 6): UseRecommendedCausesResult {
  const graphql = new GraphqlClientService(useApolloClient());
  const [causes, setCauses] = useState<RecommendedCause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const normalizedLimit = normalizeLimit(limit);

  useEffect(() => {
    let cancelled = false;

    const loadCauses = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const data = await graphql.query(GET_CAUSES_QUERY, {});

        if (cancelled) {
          return;
        }

        setCauses(data.causes.slice(0, normalizedLimit).map(withImageUrl));
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar las causas recomendadas.');
        setCauses([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadCauses();

    return () => {
      cancelled = true;
    };
  }, [normalizedLimit]);

  return {
    causes,
    loading,
    error,
  };
}
