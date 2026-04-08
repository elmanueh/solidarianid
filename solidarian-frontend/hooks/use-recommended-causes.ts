'use client';

import { Cause } from '@/features/causes/model/causes.model';
import { causesService } from '@/features/causes/services/causes.service';
import { GraphqlClient } from '@/features/graphql/apollo-client';
import { useApolloClient } from '@apollo/client/react';
import { useEffect, useState } from 'react';

export type RecommendedCause = Cause & {
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

const withImageUrl = (cause: Cause): RecommendedCause => {
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
  const client = useApolloClient() as GraphqlClient;
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
        const data = await causesService.getCauses(client);

        if (cancelled) {
          return;
        }

        setCauses(data.slice(0, normalizedLimit).map(withImageUrl));
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
  }, [client, normalizedLimit]);

  return {
    causes,
    loading,
    error,
  };
}
