import { AnalyticsCharts } from '../components/AnalyticsCharts';
import { StatCard } from '../components/StatCard';
import type { Analytics } from '../types';

export function AnalyticsPage({ analytics }: { analytics: Analytics | null }) {
  return (
    <>
      <section className="stats-grid">
        <StatCard label="Total Tickets" value={analytics?.totalTickets ?? 0} />
        <StatCard label="SLA Risk" value={analytics?.slaRiskTickets ?? 0} />
        <StatCard label="Resolved" value={analytics?.byStatus?.RESOLVED ?? 0} />
        <StatCard label="Critical" value={analytics?.byPriority?.CRITICAL ?? 0} />
      </section>
      <AnalyticsCharts analytics={analytics} />
    </>
  );
}
