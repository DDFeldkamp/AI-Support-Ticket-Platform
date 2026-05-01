import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Analytics } from '../types';

export function useAnalytics(autoLoad = true) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setAnalytics(await api.analytics());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) loadAnalytics();
  }, [autoLoad, loadAnalytics]);

  return { analytics, loading, error, loadAnalytics };
}
