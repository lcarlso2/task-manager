# Todo App

A small, production-style full-stack Todo application built with a .NET 8 backend and a React frontend. The focus is on clean architecture, predictable data flow, realistic UX patterns, and explicit trade-offs rather than feature volume. This implementation prioritizes clarity, correctness, and realistic production patterns over feature breadth. Some decisions, such as layered testing and explicitly documented trade-offs, are included to demonstrate approach rather than scale.

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

Frontend runs at http://localhost:5173  

---

## Features

- Create, read, update, and delete todos
- Inline editing of todo titles
- Immediate UI feedback when toggling completion while background refetch occurs
- Clear loading, error, and empty states
- Server-side pagination, filtering, and sorting for scalability
- Completed todos are read-only in the UI to prevent accidental changes
  - Editing and deletion are disabled while a todo is completed
  - Completed todos can be reopened, after which they become editable again

---

## Data & State Management

Server state on the frontend is managed using TanStack Query (React Query).

The todo list favors correctness and predictable behavior over aggressive caching. Because todos change frequently and support pagination, filtering, and sorting, list data is refetched on navigation and after mutations rather than relying on optimistic list updates.

Optimistic updates were intentionally avoided for paginated and filtered lists. While optimistic updates work well for single-entity mutations, applying them to multi-dimensional lists introduces ambiguity around ordering, pagination boundaries, and filter membership. Instead, the backend remains the source of truth, and the UI relies on controlled refetching to stay consistent.

One intentional exception is the todo completion checkbox. Toggling completion applies a local UI override immediately to improve perceived responsiveness, while the mutation and subsequent refetch occur in the background. This improves UX without mutating cached server data or assuming mutation success. Because the override is scoped to a single entity and reconciled on refetch, it avoids the consistency issues optimistic updates introduce for paginated or filtered lists.

Cached data is still reused for immediate rendering to prevent UI flicker, while background refetches ensure up-to-date views.

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

Service tests validate core business logic in isolation from HTTP and controller concerns. These tests exercise the TodoService directly using an in-memory SQLite database to ensure real relational behavior for pagination, sorting, and filtering logic, including correct Skip and Take semantics.

This layer provides fast feedback for business rules while still using a real database provider, avoiding the pitfalls of EF Core’s in-memory database.

### Backend Integration Tests

Integration tests validate API behavior end-to-end, including request handling, persistence, and response contracts. Tests run against SQLite using a real relational provider and applied EF Core migrations rather than EF Core’s in-memory database. An in-memory SQLite connection is used to keep tests fast while still exercising real SQL generation and schema constraints.

Run backend tests:

cd backend\todo-api.Tests
dotnet test

### Frontend Component Tests

Component tests use Vitest and React Testing Library to validate isolated UI behavior and client-side validation logic without involving the backend. Data hooks are mocked to ensure tests remain focused and deterministic.

Run component tests:

cd frontend\todo-ui  
npm run test  

### End-to-End Tests

End-to-end tests use Playwright to validate full user flows across the frontend and backend.

Each test run starts the frontend and backend and uses an **ephemeral SQLite database** for persistence.
The database is recreated and migrated automatically at startup and discarded when the
test run completes, ensuring full isolation and repeatability both locally and in CI.

E2E tests create and interact with todos exclusively through the UI and API,
mirroring real user behavior.

Before running E2E tests, ensure no conflicting frontend or backend servers are running.

Run E2E tests:

cd frontend\todo-ui  
npx playwright install  
npm run test:e2e  

Tests can also be run via GitHub Actions using the “Run Tests” workflow in the repository’s Actions tab.

---

## Assumptions & Trade-offs

Authentication and authorization are out of scope to keep the focus on API design, validation, and frontend/backend interaction. Styling is intentionally minimal to emphasize behavior and architecture.

PUT is used for updates instead of PATCH for simplicity and clarity. The todo update surface is small and stable, and PUT allows the client to send a complete representation without introducing partial-update semantics. For larger or more dynamic resources, PATCH would be more appropriate.

Completed todos are treated as immutable only at the UI level. The API does not currently block updates or deletes for completed todos. This is a deliberate trade-off to keep backend rules simple while still demonstrating UX-level safeguards. In a production system, this rule would likely be enforced at the API level or replaced with an archival workflow.

Sorting is modeled as a single enum representing supported user-facing sort options. If additional sort combinations were needed, this could evolve into separate sort field and direction parameters.

---

## What I’d Do Next

Improve accessibility and keyboard navigation by adding ARIA attributes, focus management, and keyboard shortcuts. Expand frontend test coverage for pagination, filtering, and error recovery flows. Replace browser confirm dialogs with inline confirmations or toasts. Sync pagination, filter, and sort state to the URL to support deep linking and refresh-safe navigation. Introduce authentication and per-user todo ownership to enforce realistic data boundaries. Finally, move certain UX rules, such as completed todo immutability, into the API once business constraints become non-negotiable.

---

## Summary

This project is intentionally small but structured like a production MVP, with clean backend boundaries, predictable frontend data flow, layered testing at the service, integration, component, and end-to-end levels, and explicit trade-offs. The goal was to build something maintainable and easy to extend rather than to maximize feature count.
