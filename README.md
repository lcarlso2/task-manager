# Todo App

A small, production-style full-stack Todo application built with a .NET 8 backend and a React frontend. The focus is on clean architecture, predictable data flow, and realistic production patterns, with explicit trade-offs documented where simplicity was chosen over completeness. This implementation prioritizes clarity and correctness over feature volume.

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
- Vitest + React Testing Library for component tests
- Playwright for end-to-end testing

---

## Getting Started

### Prerequisites
- Node.js 20+
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

cd frontend\todo-ui
npm install
npm run dev

Create a .env file if needed:
VITE_API_BASE_URL=https://localhost:7206

The frontend validates the API base URL at startup and will fail fast if it is missing or misconfigured.

Frontend runs at http://localhost:5173

---

## Features

- Create, read, update, and delete todos
- Inline editing of todo titles
- Immediate UI feedback when toggling completion while background refetch occurs
- Clear loading, error, and empty states
- Server-side pagination, filtering, and sorting
- Completed todos are read-only in the UI to prevent accidental changes
  - Editing and deletion are disabled while a todo is completed
  - Completed todos can be reopened, after which they become editable again

---

## Data & State Management

Server state on the frontend is managed using TanStack Query (React Query).

The todo list favors correctness and predictable behavior over aggressive caching. Because todos change frequently and support pagination, filtering, and sorting, list data is refetched on navigation and after mutations rather than relying on optimistic list updates.

Optimistic updates were intentionally avoided for paginated and filtered lists. While they work well for single-entity mutations, applying them to multi-dimensional lists introduces ambiguity around ordering, pagination boundaries, and filter membership. Instead, the backend remains the source of truth, and the UI relies on controlled refetching to stay consistent.

One intentional exception is the todo completion checkbox. Toggling completion applies a local UI override immediately to improve perceived responsiveness, while the mutation and subsequent refetch occur in the background. Because this override is scoped to a single entity and reconciled on refetch, it avoids the consistency issues optimistic updates introduce for paginated or filtered lists.

Cached data is reused for immediate rendering to prevent UI flicker, while background refetches ensure up-to-date views.

---

## API Design

The API follows RESTful conventions and uses DTOs for all requests and responses. Validation occurs at the API boundary, and error responses are centralized and consistent.

Endpoints:
- GET /todos — supports pagination, filtering, and sorting
- POST /todos
- PUT /todos/{id}
- DELETE /todos/{id}

---

## Testing

The project includes multiple layers of testing, each targeting a different concern.

### Backend Service Tests
Service tests validate core business logic in isolation from HTTP and controller concerns. Tests exercise the TodoService directly using an in-memory SQLite database to ensure real relational behavior for pagination, sorting, and filtering logic.

### Backend Integration Tests
Integration tests validate API behavior end-to-end, including request handling, persistence, and response contracts. Tests run against SQLite with real migrations applied. Critical edge cases, such as not-found resources, are covered with targeted integration tests.

Run backend tests:
cd backend\todo-api.Tests
dotnet test

### Frontend Component Tests
Component tests use Vitest and React Testing Library to validate isolated UI behavior and client-side validation logic.

Run frontend tests:
cd frontend\todo-ui
npm run test

End-to-End Tests:
End-to-end tests use Playwright to validate full user flows across the frontend and backend. Each test run starts both applications and uses an ephemeral SQLite database that is recreated and migrated at startup, then discarded at completion.

Run E2E tests:
cd frontend\todo-ui
npx playwright install
npm run test:e2e

Tests can also be run via GitHub Actions using the “Run Tests” workflow.

---

## Assumptions & Trade-offs

Authentication and authorization are out of scope to keep the focus on API design and frontend/backend interaction. Styling is intentionally minimal.

PUT is used instead of PATCH for simplicity and clarity. The todo update surface is small and stable, and PUT avoids partial-update semantics. For larger or more dynamic resources, PATCH would be more appropriate.

Completed todos are treated as immutable at the UI level only. The API does not enforce this rule to keep backend logic simple. In a production system, this would likely be enforced at the API level or replaced with an archival workflow.

Sorting is modeled as a single enum representing supported user-facing options. If additional combinations were required, this could evolve into separate sort field and direction parameters.

---

## What I’d Do Next

Improve accessibility and keyboard navigation, expand frontend test coverage for pagination and error recovery flows, replace browser confirm dialogs with inline confirmations, sync pagination and filter state to the URL, and introduce authentication with per-user todo ownership.

---

## Summary

This project is intentionally small but structured like a production MVP. It emphasizes clean backend boundaries, predictable frontend data flow, layered testing, and explicit trade-offs, with the goal of being maintainable and easy to extend rather than maximizing feature count.