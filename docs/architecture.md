# Architecture

The platform uses a React SPA that talks to a stateless Spring Boot API. PostgreSQL stores transactional ticket data. MongoDB stores flexible AI-generated artifacts such as summaries, recommendations, and audit metadata. Redis supports an async processing pattern so API requests do not block on AI calls.

## Request Flow

1. User creates a ticket in the React SPA.
2. Spring Boot persists the ticket in PostgreSQL.
3. Backend queues/starts async AI processing.
4. AI service classifies category, priority, SLA risk, and recommended team.
5. Ticket fields are updated in PostgreSQL; AI summary is stored in MongoDB.
6. Dashboard fetches ticket and analytics views through REST APIs.

## Design Tradeoffs

- PostgreSQL is used for structured, relational, queryable ticket data.
- MongoDB is used for variable AI output and audit/event documents.
- Stateless backend design allows horizontal scaling behind a load balancer.
- Async AI processing improves latency and protects user-facing endpoints from slow model calls.
