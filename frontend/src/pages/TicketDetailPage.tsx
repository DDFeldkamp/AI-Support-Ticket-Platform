import type { Ticket } from '../types';
import { Badge } from '../components/Badge';

export function TicketDetailPage({ ticket, onBack, onSummarize }: { ticket: Ticket | null; onBack: () => void; onSummarize: (id: number) => void }) {
  if (!ticket) return null;
  return (
    <section className="card detail">
      <button className="secondary narrow" onClick={onBack}>← Back</button>
      <div className="ticket-header">
        <div>
          <p className="muted">Ticket #{ticket.id}</p>
          <h2>{ticket.title}</h2>
        </div>
        {ticket.slaRisk && <Badge tone="danger">SLA Risk</Badge>}
      </div>
      <p>{ticket.description}</p>
      <div className="badges">
        <Badge>{ticket.status}</Badge>
        <Badge tone="warning">{ticket.priority}</Badge>
        <Badge tone="success">{ticket.category || 'Unclassified'}</Badge>
      </div>
      <div className="detail-grid">
        <div><strong>Customer</strong><p>{ticket.customerEmail}</p></div>
        <div><strong>Tier</strong><p>{ticket.customerTier}</p></div>
        <div><strong>Assignee</strong><p>{ticket.assignee || 'Pending routing'}</p></div>
        <div><strong>Created</strong><p>{new Date(ticket.createdAt).toLocaleString()}</p></div>
      </div>
      <button onClick={() => onSummarize(ticket.id)}>Re-run AI classification</button>
    </section>
  );
}
