'use client';

import { GET_CAUSES_QUERY } from '@/features/causes/api/graphql/causes.documents';
import { GraphqlClientService } from '@/features/graphql/graphql-client.service';
import { PexelsImageService } from '@/features/images/pexels-image.service';
import { useApolloClient } from '@apollo/client/react';
import { useEffect, useMemo, useState } from 'react';

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

const imageService = new PexelsImageService();

const normalizeLimit = (limit: number): number => {
  if (!Number.isFinite(limit)) {
    return 0;
  }

  return Math.max(0, Math.floor(limit));
};

export function useRecommendedCauses(limit = 6): UseRecommendedCausesResult {
  const apolloClient = useApolloClient();
  const graphql = useMemo(() => new GraphqlClientService(apolloClient), [apolloClient]);
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

        const nextCauses = await Promise.all(
          data.causes.slice(0, normalizedLimit).map(async cause => {
            const banner = await imageService.getDeterministicBanner({ uuid: cause.id, theme: cause.name });
            return { ...cause, imageUrl: banner.large };
          })
        );

        setCauses(nextCauses);
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
  }, [graphql, normalizedLimit]);

  return {
    causes,
    loading,
    error,
  };
}
