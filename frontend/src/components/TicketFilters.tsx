import type { TicketFilters as Filters } from '../hooks/useTickets';

export function TicketFilters({ filters, onChange, onSearch }: { filters: Filters; onChange: (next: Filters) => void; onSearch: () => void }) {
  return (
    <div className="toolbar">
      <input placeholder="Search tickets" value={filters.q} onChange={(e) => onChange({ ...filters, q: e.target.value })} />
      <select value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value as Filters['status'] })}>
        <option value="">All statuses</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In progress</option>
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>
      <select value={filters.priority} onChange={(e) => onChange({ ...filters, priority: e.target.value as Filters['priority'] })}>
        <option value="">All priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="CRITICAL">Critical</option>
      </select>
      <select value={filters.sort} onChange={(e) => onChange({ ...filters, sort: e.target.value as Filters['sort'] })}>
        <option value="sla">SLA risk first</option>
        <option value="priority">Priority first</option>
        <option value="newest">Newest first</option>
      </select>
      <button onClick={onSearch}>Search</button>
    </div>
  );
}
