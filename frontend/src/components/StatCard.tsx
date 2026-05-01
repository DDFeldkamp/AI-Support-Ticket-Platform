import React from 'react';

export function StatCard({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
      {hint && <small>{hint}</small>}
    </div>
  );
}
