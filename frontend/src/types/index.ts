export type Priority = 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL';
export type TicketStatus = 'OPEN'|'IN_PROGRESS'|'RESOLVED'|'CLOSED';
export interface Ticket { id:number; title:string; description:string; status:TicketStatus; priority:Priority; category:string; assignee?:string; customerEmail?:string; customerTier:string; slaRisk:boolean; createdAt:string; }
export interface AiSummary { summary:string; recommendedTeam:string; nextBestAction:string; }
export interface Analytics { totalTickets:number; slaRiskTickets:number; byPriority:Record<string,number>; byStatus:Record<string,number>; }
