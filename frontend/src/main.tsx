import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {api, setToken} from './api/client';
import {Ticket, Analytics} from './types';
import './style.css';

function App(){
  const [tickets,setTickets]=useState<Ticket[]>([]); const [analytics,setAnalytics]=useState<Analytics|null>(null);
  const [q,setQ]=useState(''); const [title,setTitle]=useState(''); const [description,setDescription]=useState('');
  async function load(){ const t=await api.listTickets(q); setTickets(t.content||[]); setAnalytics(await api.analytics()); }
  useEffect(()=>{ api.demoToken().then(r=>{setToken(r.token); load();}); },[]);
  async function create(){ await api.createTicket({title,description,customerEmail:'customer@example.com',customerTier:'enterprise'}); setTitle(''); setDescription(''); await load(); }
  async function summarize(id:number){ await api.summarize(id); await load(); }
  return <main>
    <header><h1>AI Support Ticket Intelligence</h1><p>React SPA + Spring REST + PostgreSQL + MongoDB + async AI pipeline</p></header>
    <section className="grid">
      <div className="card"><h2>Analytics</h2><p>Total: {analytics?.totalTickets ?? 0}</p><p>SLA Risk: {analytics?.slaRiskTickets ?? 0}</p><pre>{JSON.stringify(analytics?.byPriority ?? {}, null, 2)}</pre></div>
      <div className="card"><h2>Create Ticket</h2><input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/><textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}/><button onClick={create}>Create</button></div>
    </section>
    <section className="card"><h2>Tickets</h2><div className="row"><input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)}/><button onClick={load}>Search</button></div>{tickets.map(t=><article className="ticket" key={t.id}><h3>#{t.id} {t.title}</h3><p>{t.description}</p><div className="badges"><span>{t.status}</span><span>{t.priority}</span><span>{t.category}</span>{t.slaRisk && <b>SLA RISK</b>}</div><p>Assigned: {t.assignee || 'Pending AI routing'}</p><button onClick={()=>summarize(t.id)}>Re-run AI</button></article>)}</section>
  </main>
}
createRoot(document.getElementById('root')!).render(<App/>);
