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

cd backend  
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
- Optimistic UI updates for create, update, and delete
- Clear loading, error, and empty states
- Completed todos are treated as final:
  - Editing and deletion are disabled once a todo is completed

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
- GET /todos
- POST /todos
- PUT /todos/{id}
- DELETE /todos/{id}

---

## Testing

- Includes an integration test covering core API behavior
- SQLite with migrations is used instead of an in-memory database to ensure reproducibility

---

## Assumptions & Trade-offs

- Authentication and authorization are out of scope
- Styling is intentionally minimal to focus on behavior and architecture
- PUT is used for updates instead of PATCH for simplicity
- Completed todos are immutable by design to provide a clearer UX

---

## What I’d Do Next

- Improve accessibility and keyboard navigation
- Add frontend tests for critical user flows
- Replace browser confirm dialogs with inline confirmations or toasts

---

## Summary

This project is intentionally small but structured like a production MVP.

- Clean backend boundaries
- Predictable frontend data flow
- Clear UX states
- Thoughtful trade-offs

The goal was to build something maintainable and easy to extend, not to maximize feature count.
