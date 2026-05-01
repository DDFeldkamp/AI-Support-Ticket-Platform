# Scalability, Sustainability, Performance, and Security

## Scalability

- Spring Boot API is stateless and can run multiple replicas.
- AI classification runs asynchronously so user-facing request latency is decoupled from model latency.
- PostgreSQL indexes support common filters: status, priority, assignee, createdAt.
- Pagination prevents large unbounded result sets.

## Sustainability

- Layered architecture separates controllers, services, repositories, DTOs, security, and AI integration.
- Mock AI client allows local development without external API cost.
- Docker Compose supports reproducible local environments.

## Performance

- Indexed queries for ticket search/filter.
- Analytics endpoint can be cached in future with Redis.
- API limits page size to avoid expensive queries.

## Security

- JWT authentication and RBAC-ready endpoint restrictions.
- Input validation via Jakarta Validation.
- Environment variables for secrets.
- CORS constrained to local frontend origin in development.
