import { FormEvent, useState } from 'react';

export function TicketForm({ onCreate }: { onCreate: (input: { title: string; description: string; customerEmail: string; customerTier: string }) => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [customerEmail, setCustomerEmail] = useState('customer@example.com');
  const [customerTier, setCustomerTier] = useState('enterprise');
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSaving(true);
    await onCreate({ title, description, customerEmail, customerTier });
    setTitle('');
    setDescription('');
    setSaving(false);
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <h2>Create Ticket</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="two-col">
        <input placeholder="Customer email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
        <select value={customerTier} onChange={(e) => setCustomerTier(e.target.value)}>
          <option value="standard">Standard</option>
          <option value="business">Business</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>
      <button disabled={saving}>{saving ? 'Creating…' : 'Create ticket'}</button>
    </form>
  );
}
