# API Spec

## Tickets

- `POST /api/tickets` create ticket
- `GET /api/tickets?q=&status=&priority=&page=&size=` search/filter tickets
- `GET /api/tickets/{id}` read ticket and latest AI summary
- `PATCH /api/tickets/{id}/status` update status
- `POST /api/tickets/{id}/summarize` re-run AI analysis

## Analytics

- `GET /api/analytics/summary` returns total tickets, SLA-risk tickets, by-priority counts, and by-status counts

## Auth

- `GET /api/auth/demo-token?role=ADMIN` returns a demo JWT
