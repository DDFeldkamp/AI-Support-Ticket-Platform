import React from 'react';

type BadgeTone = 'default' | 'danger' | 'success' | 'warning' | 'muted';

export function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: BadgeTone }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
