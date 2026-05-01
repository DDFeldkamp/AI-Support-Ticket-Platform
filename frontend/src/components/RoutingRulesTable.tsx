const rules = [
  { category: 'Authentication', team: 'Identity Platform', priority: 'HIGH', sla: '4h' },
  { category: 'Billing', team: 'Revenue Systems', priority: 'MEDIUM', sla: '24h' },
  { category: 'Infrastructure', team: 'Core Platform', priority: 'CRITICAL', sla: '1h' },
  { category: 'General', team: 'Customer Support', priority: 'LOW', sla: '72h' },
];

export function RoutingRulesTable() {
  return (
    <div className="card">
      <h2>Routing Rules</h2>
      <p className="muted">Static demo rules that mirror the backend AI routing strategy.</p>
      <table>
        <thead>
          <tr><th>Category</th><th>Team</th><th>Default Priority</th><th>SLA</th></tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.category}><td>{rule.category}</td><td>{rule.team}</td><td>{rule.priority}</td><td>{rule.sla}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
