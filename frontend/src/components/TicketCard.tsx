import type { Ticket } from '../types';
import { Badge } from './Badge';

function priorityTone(priority: Ticket['priority']) {
  if (priority === 'CRITICAL' || priority === 'HIGH') return 'danger';
  if (priority === 'MEDIUM') return 'warning';
  return 'muted';
}

export function TicketCard({ ticket, onSummarize, onOpen }: { ticket: Ticket; onSummarize: (id: number) => void; onOpen: (ticket: Ticket) => void }) {
  return (
    <article className="ticket-card">
      <div className="ticket-header">
        <div>
          <p className="muted">#{ticket.id} · {ticket.customerEmail ?? 'customer@example.com'}</p>
          <h3>{ticket.title}</h3>
        </div>
        {ticket.slaRisk && <Badge tone="danger">SLA Risk</Badge>}
      </div>
      <p>{ticket.description}</p>
      <div className="badges">
        <Badge>{ticket.status}</Badge>
        <Badge tone={priorityTone(ticket.priority)}>{ticket.priority}</Badge>
        <Badge tone="success">{ticket.category || 'Unclassified'}</Badge>
        <Badge tone="muted">{ticket.customerTier || 'standard'}</Badge>
      </div>
      <p className="muted">Assigned to: {ticket.assignee || 'Pending AI routing'}</p>
      <div className="actions">
        <button onClick={() => onOpen(ticket)}>Open Details</button>
        <button className="secondary" onClick={() => onSummarize(ticket.id)}>Re-run AI</button>
      </div>
    </article>
  );
}
