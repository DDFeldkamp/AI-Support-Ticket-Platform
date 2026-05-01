import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../api/client';
import type { Priority, Ticket, TicketStatus } from '../types';

export interface TicketFilters {
  q: string;
  status: '' | TicketStatus;
  priority: '' | Priority;
  sort: 'newest' | 'sla' | 'priority';
}

const priorityRank: Record<Priority, number> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
};

export function useTickets(autoLoad = true) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filters, setFilters] = useState<TicketFilters>({ q: '', status: '', priority: '', sort: 'sla' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.listTickets(filters.q, filters.status, filters.priority);
      setTickets(response.content ?? response ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load tickets');
    } finally {
      setLoading(false);
    }
  }, [filters.q, filters.status, filters.priority]);

  async function createTicket(input: { title: string; description: string; customerEmail: string; customerTier: string }) {
    await api.createTicket(input);
    await loadTickets();
  }

  async function summarizeTicket(id: number) {
    await api.summarize(id);
    await loadTickets();
  }

  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => {
      if (filters.sort === 'sla') return Number(b.slaRisk) - Number(a.slaRisk) || +new Date(b.createdAt) - +new Date(a.createdAt);
      if (filters.sort === 'priority') return priorityRank[b.priority] - priorityRank[a.priority];
      return +new Date(b.createdAt) - +new Date(a.createdAt);
    });
  }, [tickets, filters.sort]);

  useEffect(() => {
    if (autoLoad) loadTickets();
  }, [autoLoad, loadTickets]);

  return { tickets: sortedTickets, filters, setFilters, loading, error, loadTickets, createTicket, summarizeTicket };
}
