import { useEffect, useState } from 'react';
import { api, setToken } from '../api/client';

export type UserRole = 'ADMIN' | 'SUPPORT_AGENT' | 'ENGINEER' | 'CUSTOMER';

export function useAuth(defaultRole: UserRole = 'ADMIN') {
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loginAs(nextRole: UserRole) {
    setReady(false);
    setError(null);
    try {
      const response = await api.demoToken(nextRole);
      setToken(response.token);
      setRole(nextRole);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create demo token');
    } finally {
      setReady(true);
    }
  }

  useEffect(() => {
    loginAs(defaultRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { role, ready, error, loginAs };
}
