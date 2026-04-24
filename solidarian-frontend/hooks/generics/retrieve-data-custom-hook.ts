'use client';

import { type DependencyList, useEffect, useRef, useState } from 'react';

type QueryFn<T> = () => Promise<T>;

interface UseRetrieveDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useRetrieveData<T>(queryFn: QueryFn<T>, dependencies: DependencyList = []): UseRetrieveDataResult<T> {
  const queryFnRef = useRef(queryFn);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    queryFnRef.current = queryFn;
  }, [queryFn]);

  useEffect(() => {
    let cancelled = false;

    const executeQuery = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const result = await queryFnRef.current();

        if (cancelled) {
          return;
        }

        setData(result);
      } catch (queryError) {
        if (cancelled) {
          return;
        }

        setData(null);
        setError(queryError instanceof Error ? queryError.message : 'No se pudieron cargar los datos.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void executeQuery();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return {
    data,
    loading,
    error,
  };
}
