import { TicketCard } from '../components/TicketCard';
import { TicketFilters } from '../components/TicketFilters';
import type { TicketFilters as Filters } from '../hooks/useTickets';
import type { Ticket } from '../types';

export function TicketsPage({
  tickets,
  filters,
  onFiltersChange,
  onSearch,
  onSummarize,
  onOpenTicket,
  loading,
}: {
  tickets: Ticket[];
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onSearch: () => void;
  onSummarize: (id: number) => void;
  onOpenTicket: (ticket: Ticket) => void;
  loading: boolean;
}) {
  return (
    <section className="card">
      <div className="section-header">
        <div>
          <h2>Ticket Queue</h2>
          <p className="muted">Search, filter, sort by SLA risk, and trigger AI reprocessing.</p>
        </div>
      </div>
      <TicketFilters filters={filters} onChange={onFiltersChange} onSearch={onSearch} />
      {loading && <p className="muted">Loading tickets…</p>}
      {tickets.length === 0 && !loading && <p className="muted">No tickets match the current filters.</p>}
      {tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} onSummarize={onSummarize} onOpen={onOpenTicket} />)}
    </section>
  );
}
