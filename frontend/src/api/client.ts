const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
let token = localStorage.getItem('token') || '';
export function setToken(t:string){ token=t; localStorage.setItem('token', t); }
async function request<T>(path:string, init:RequestInit = {}):Promise<T>{
  const res = await fetch(`${BASE}${path}`, { ...init, headers: { 'Content-Type':'application/json', ...(token ? {Authorization:`Bearer ${token}`} : {}), ...(init.headers||{}) }});
  if(!res.ok) throw new Error(await res.text());
  return res.json();
}
export const api = {
  demoToken: (role='ADMIN') => request<{token:string}>(`/api/auth/demo-token?role=${role}`),
  listTickets: (q='', status='', priority='') => request<any>(`/api/tickets?q=${encodeURIComponent(q)}${status?`&status=${status}`:''}${priority?`&priority=${priority}`:''}`),
  createTicket: (body:any) => request('/api/tickets', {method:'POST', body:JSON.stringify(body)}),
  getTicket: (id:number) => request<any>(`/api/tickets/${id}`),
  summarize: (id:number) => request(`/api/tickets/${id}/summarize`, {method:'POST'}),
  analytics: () => request<any>('/api/analytics/summary')
};
