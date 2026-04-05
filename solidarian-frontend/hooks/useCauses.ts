'use client';

import { useState, useEffect } from 'react';
import { causeService } from '@/features/causes/services/cause.service';
import type { Cause } from '@/features/causes/model';
import { getErrorMessage } from '@/features/axios/errors.handler';

interface UseCauses {
  causes: Cause[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCauses(): UseCauses {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCauses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await causeService.getAll();
      setCauses(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCauses();
  }, []);

  return {
    causes,
    loading,
    error,
    refetch: fetchCauses,
  };
}

/**
 * Hook para obtener causas recomendadas
 */
export function useRecommendedCauses(limit: number = 6): UseCauses {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendedCauses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await causeService.getRecommended(limit);
      setCauses(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedCauses();
  }, [limit]);

  return {
    causes,
    loading,
    error,
    refetch: fetchRecommendedCauses,
  };
}
