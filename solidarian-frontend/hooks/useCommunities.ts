'use client';

import { useState, useEffect } from 'react';
import { communityService } from '@/features/communities/services/community.service';
import type { Community } from '@/features/communities/model';
import { getErrorMessage } from '@/features/axios/errors.handler';

interface UseCommunities {
  communities: Community[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCommunities(): UseCommunities {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getAll();
      setCommunities(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return {
    communities,
    loading,
    error,
    refetch: fetchCommunities,
  };
}

/**
 * Hook para obtener comunidades destacadas
 */
export function useFeaturedCommunities(limit: number = 4): UseCommunities {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedCommunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getFeatured(limit);
      setCommunities(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedCommunities();
  }, [limit]);

  return {
    communities,
    loading,
    error,
    refetch: fetchFeaturedCommunities,
  };
}
