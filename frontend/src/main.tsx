import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppShell, PageId } from './components/AppShell';
import { useAnalytics } from './hooks/useAnalytics';
import { useAuth } from './hooks/useAuth';
import { useTickets } from './hooks/useTickets';
import { AdminRoutingPage, AnalyticsPage, DashboardPage, TicketDetailPage, TicketsPage } from './pages';
import type { Ticket } from './types';
import './style.css';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { role, ready, error: authError, loginAs } = useAuth('ADMIN');
  const ticketsState = useTickets(ready);
  const analyticsState = useAnalytics(ready);

  async function refreshAll() {
    await Promise.all([ticketsState.loadTickets(), analyticsState.loadAnalytics()]);
  }

  async function createTicket(input: { title: string; description: string; customerEmail: string; customerTier: string }) {
    await ticketsState.createTicket(input);
    await refreshAll();
  }

  async function summarizeTicket(id: number) {
    await ticketsState.summarizeTicket(id);
    await refreshAll();
  }

  function openTicket(ticket: Ticket) {
    setSelectedTicket(ticket);
    setPage('tickets');
  }

  const activePage = selectedTicket ? 'ticket-detail' : page;

  return (
    <AppShell page={page} onPageChange={(next) => { setSelectedTicket(null); setPage(next); }} role={role} onRoleChange={loginAs}>
      {authError && <div className="error">{authError}</div>}
      {ticketsState.error && <div className="error">{ticketsState.error}</div>}
      {analyticsState.error && <div className="error">{analyticsState.error}</div>}
      {activePage === 'dashboard' && (
        <DashboardPage
          analytics={analyticsState.analytics}
          tickets={ticketsState.tickets}
          onCreate={createTicket}
          onSummarize={summarizeTicket}
          onOpenTicket={openTicket}
        />
      )}
      {activePage === 'tickets' && (
        <TicketsPage
          tickets={ticketsState.tickets}
          filters={ticketsState.filters}
          onFiltersChange={ticketsState.setFilters}
          onSearch={ticketsState.loadTickets}
          onSummarize={summarizeTicket}
          onOpenTicket={openTicket}
          loading={ticketsState.loading}
        />
      )}
      {activePage === 'ticket-detail' && <TicketDetailPage ticket={selectedTicket} onBack={() => setSelectedTicket(null)} onSummarize={summarizeTicket} />}
      {activePage === 'analytics' && <AnalyticsPage analytics={analyticsState.analytics} />}
      {activePage === 'admin' && <AdminRoutingPage role={role} />}
    </AppShell>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
