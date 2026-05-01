# AI Support Ticket Intelligence Platform

A full-stack support ticket platform built to showcase Java/Spring, React SPA development, REST API design, relational + NoSQL databases, async AI processing, testing, Docker, and Kubernetes.

## Tech Stack

- Frontend: React, TypeScript, Vite, CSS, Jest/Vitest, React Testing Library
- Backend: Java 17, Spring Boot, Spring Web, Spring Data JPA, Spring Security, JUnit, Mockito
- Databases: PostgreSQL for transactional data, MongoDB for AI summaries and audit metadata
- Queue/Cache: Redis-backed async AI job processing
- Deployment: Docker Compose and Kubernetes manifests

## Features

- Ticket creation, search, filtering, pagination, and status updates
- AI-assisted summarization, classification, prioritization, routing, and SLA risk detection
- Async AI pipeline using Redis queue semantics
- JWT authentication and role-based access control
- Analytics dashboard for ticket volume, priority distribution, and SLA risk
- PostgreSQL indexes for scalable search/filter workflows
- Dockerized frontend/backend/database stack
- Kubernetes deployment, service, config, and ingress manifests
- Backend and frontend test examples

## Quick Start

### Run locally with Docker Compose

```bash
docker compose up --build
```

Frontend: http://localhost:5173  
Backend: http://localhost:8080

### Backend only

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend only

```bash
cd frontend
npm install
npm run dev
```

## Demo Login

The sample JWT implementation accepts demo tokens through the `/api/auth/demo-token` endpoint.

```bash
curl http://localhost:8080/api/auth/demo-token?role=ADMIN
```

Use the returned token as:

```http
Authorization: Bearer <token>
```