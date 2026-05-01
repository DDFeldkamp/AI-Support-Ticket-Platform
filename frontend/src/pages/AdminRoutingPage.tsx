import { RoutingRulesTable } from '../components/RoutingRulesTable';
import type { UserRole } from '../hooks/useAuth';

export function AdminRoutingPage({ role }: { role: UserRole }) {
  if (role !== 'ADMIN') {
    return <div className="card"><h2>Admin only</h2><p className="muted">Switch the demo role to Admin to edit routing rules.</p></div>;
  }
  return <RoutingRulesTable />;
}
