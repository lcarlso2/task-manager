# Todo App

A small, production-style full-stack Todo application built with a .NET 8 backend and a React frontend.
The focus is on clean architecture, predictable data flow, and a realistic user experience rather than feature volume.

---

## Tech Stack

### Backend
- .NET 8 Web API
- Entity Framework Core
- SQLite with migrations
- DTO-based API (no EF entities exposed)
- Input validation and centralized error handling
- Swagger for API exploration

### Frontend
- React 18 (Vite)
- TypeScript
- @tanstack/react-query for server state management
- Minimal, component-driven UI

---

## Getting Started

### Prerequisites
- Node.js 18+
- .NET SDK 8+

---

## Backend Setup

cd backend\todo-api  
dotnet restore  
dotnet ef database update  
dotnet run --launch-profile https

API runs at https://localhost:7206  
Swagger UI available at https://localhost:7206/swagger  

---

## Frontend Setup

cd frontend  
npm install  
npm run dev  

Create a .env file if needed:

VITE_API_BASE_URL=https://localhost:7206  

Frontend runs at http://localhost:5173  

---

## Features

- Create, read, update, and delete todos
- Inline editing of todo titles
- Optimistic UI updates for create, update, and delete, with cache invalidation to ensure the backend remains the source of truth
- Clear loading, error, and empty states
- Completed todos are read-only in the UI to prevent accidental changes
  - Editing and deletion are disabled while a todo is completed
  - Completed todos may be reopened, after which they can be edited or deleted again
  - In a production system, this rule could be enforced at the API level or replaced with an archival workflow
- Server-side pagination, filtering, and sorting to support scalability

---

## Data & State Management

Server state on the frontend is managed using React Query.

Key decisions:
- Stable query keys aligned with backend routes
- Optimistic updates for responsive UI
- Cache invalidation after mutations to keep the backend as the source of truth
- No manual syncing of server data into local React state

---

## API Design

- RESTful endpoints
- DTOs used for all requests and responses
- Validation at the API boundary
- Centralized, consistent error responses

Endpoints:
- GET /todos supports pagination, filtering, and sorting via query parameters
- POST /todos
- PUT /todos/{id}
- DELETE /todos/{id}

---

## Testing

- Includes an integration test validating core API behavior (end-to-end request handling, persistence, and response contracts)
- SQLite with migrations is used instead of an in-memory database to ensure reproducibility

---

## Assumptions & Trade-offs

- Authentication and authorization are out of scope to keep the focus on API design, validation, and frontend/backend interaction.
- Styling is intentionally minimal to focus on behavior and architecture
- PUT is used for updates instead of PATCH for simplicity
- Completed todos are immutable by design to provide a clearer UX

---

## What I’d Do Next

- Improve accessibility and keyboard navigation
- Add frontend tests for critical user flows
- Replace browser confirm dialogs with inline confirmations or toasts
- Sync pagination and filter state to the URL to support refresh and deep linking
- Introduce authentication and per-user todo ownership when moving beyond a single-user MVP

---

## Summary

This project is intentionally small but structured like a production MVP.

- Clean backend boundaries
- Predictable frontend data flow
- Clear UX states
- Thoughtful trade-offs

The goal was to build something maintainable and easy to extend, not to maximize feature count.
