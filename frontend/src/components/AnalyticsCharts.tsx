import type { Analytics } from '../types';

function Bars({ values }: { values: Record<string, number> }) {
  const max = Math.max(1, ...Object.values(values));
  return (
    <div className="bars">
      {Object.entries(values).map(([label, value]) => (
        <div className="bar-row" key={label}>
          <span>{label}</span>
          <div><i style={{ width: `${(value / max) * 100}%` }} /></div>
          <b>{value}</b>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsCharts({ analytics }: { analytics: Analytics | null }) {
  if (!analytics) return <div className="card">No analytics yet.</div>;
  return (
    <section className="grid">
      <div className="card">
        <h2>Priority Distribution</h2>
        <Bars values={analytics.byPriority ?? {}} />
      </div>
      <div className="card">
        <h2>Status Distribution</h2>
        <Bars values={analytics.byStatus ?? {}} />
      </div>
    </section>
  );
}
