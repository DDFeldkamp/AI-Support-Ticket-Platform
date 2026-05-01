import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { StatCard } from '../components/StatCard';
import { TicketCard } from '../components/TicketCard';
import { TicketForm } from '../components/TicketForm';
import type { Analytics, Ticket } from '../types';

export function DashboardPage({
  analytics,
  tickets,
  onCreate,
  onSummarize,
  onOpenTicket,
}: {
  analytics: Analytics | null;
  tickets: Ticket[];
  onCreate: (input: { title: string; description: string; customerEmail: string; customerTier: string }) => Promise<void>;
  onSummarize: (id: number) => void;
  onOpenTicket: (ticket: Ticket) => void;
}) {
  const newest = tickets.slice(0, 3);
  return (
    <>
      <section className="stats-grid">
        <StatCard label="Total Tickets" value={analytics?.totalTickets ?? 0} hint="All customer requests" />
        <StatCard label="SLA Risk" value={analytics?.slaRiskTickets ?? 0} hint="Needs escalation" />
        <StatCard label="Open Queue" value={analytics?.byStatus?.OPEN ?? 0} hint="Waiting for action" />
        <StatCard label="Critical" value={analytics?.byPriority?.CRITICAL ?? 0} hint="Highest priority" />
      </section>
      <section className="grid">
        <TicketForm onCreate={onCreate} />
        <div className="card">
          <h2>Recent AI-Routed Tickets</h2>
          {newest.length === 0 && <p className="muted">Create a ticket to start the AI pipeline.</p>}
          {newest.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} onSummarize={onSummarize} onOpen={onOpenTicket} />)}
        </div>
      </section>
      <AnalyticsCharts analytics={analytics} />
    </>
  );
}
