import React from 'react';
import type { UserRole } from '../hooks/useAuth';

const nav = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'admin', label: 'Routing Rules' },
] as const;

export type PageId = typeof nav[number]['id'];

export function AppShell({
  page,
  onPageChange,
  role,
  onRoleChange,
  children,
}: {
  page: PageId;
  onPageChange: (page: PageId) => void;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  children: React.ReactNode;
}) {
  return (
    <main>
      <header className="hero">
        <div>
          <p className="eyebrow">AI-native support operations</p>
          <h1>AI Support Ticket Intelligence</h1>
          <p>React SPA + Spring REST APIs + PostgreSQL + MongoDB + Redis-style async AI processing.</p>
        </div>
        <label className="role-picker">
          Demo role
          <select value={role} onChange={(event) => onRoleChange(event.target.value as UserRole)}>
            <option value="ADMIN">Admin</option>
            <option value="SUPPORT_AGENT">Support Agent</option>
            <option value="ENGINEER">Engineer</option>
            <option value="CUSTOMER">Customer</option>
          </select>
        </label>
      </header>
      <nav className="tabs" aria-label="Primary">
        {nav.map((item) => (
          <button key={item.id} className={page === item.id ? 'active' : ''} onClick={() => onPageChange(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
      {children}
    </main>
  );
}
