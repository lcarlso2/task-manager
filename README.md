# Todo App

A small, production-style full-stack Todo application built with a .NET 8 backend and a React frontend. The focus is on clean architecture, predictable data flow, and realistic UX patterns rather than feature volume.

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
- Clear loading, error, and empty states
- Server-side pagination, filtering, and sorting for scalability
- Completed todos are read-only in the UI to prevent accidental changes
  - Editing and deletion are disabled while a todo is completed
  - Completed todos can be reopened, after which they become editable again

---

## Data & State Management

Server state on the frontend is managed using TanStack Query (React Query).

The todo list uses a short cache lifetime to favor correctness and predictable behavior over aggressive caching. Because todos change frequently and support pagination, filtering, and sorting, list data is refetched on navigation and after mutations rather than relying on optimistic list updates.

Optimistic updates were intentionally avoided for paginated and filtered lists. While optimistic updates work well for single-entity mutations, applying them to multi-dimensional lists introduces ambiguity around ordering, pagination boundaries, and filter membership. Instead, the backend remains the source of truth, and the UI relies on controlled refetching to stay consistent.

Cached data is still reused for immediate rendering to prevent UI flicker, while background refetches ensure up-to-date views. This approach prioritizes clarity, correctness, and maintainability, and reflects how similar CRUD lists are commonly handled in production applications.

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

The project includes an integration test validating core API behavior through end-to-end request handling, persistence, and core response contracts.

Tests run against SQLite using a real relational provider and applied EF Core migrations, rather than EF Core’s in-memory database. An in-memory SQLite connection is used to keep tests fast while still exercising real SQL generation, schema constraints, and execution paths that more closely match production behavior.

---

## Assumptions & Trade-offs

Authentication and authorization are out of scope to keep the focus on API design, validation, and frontend/backend interaction. Styling is intentionally minimal to emphasize behavior and architecture.

PUT is used for updates instead of PATCH for simplicity and clarity. The todo update surface is small and stable (primarily title and completion state), and PUT allows the client to send a complete, explicit representation of a todo without introducing partial-update semantics or merge ambiguity. For larger or more frequently changing resources, PATCH would be more appropriate.

Completed todos are treated as immutable only at the UI level. The API does not currently block updates or deletes for completed todos. This is a deliberate trade-off to keep backend rules simple while still demonstrating UX-level safeguards. In a production system, this rule would likely be enforced at the API level or replaced with an archival workflow and explicit state transitions.

For simplicity, sorting is modeled as a single enum representing supported user-facing sort options. If additional sort combinations were needed, this could evolve into separate SortField and SortDirection parameters.

---

## What I’d Do Next

Improve accessibility and keyboard navigation by adding ARIA attributes for all inputs, focus management, and keyboard shortcuts for editing and saving todos. Add frontend tests for critical user flows such as creating, editing, completing/uncompleting, deleting, and paginating todos, with particular focus on validating cache behavior and error recovery. Replace browser confirm dialogs with inline confirmations or toasts to improve perceived polish and avoid blocking UI flows. Sync pagination, filter, and sort state to the URL to enable refresh-safe navigation, deep linking, and shareable views as the app scales. Introduce authentication and per-user todo ownership to add realistic data boundaries, enable meaningful authorization rules, and support API-level enforcement of ownership and immutability. Finally, harden API invariants by moving certain UX rules (such as completed todo immutability) into the API once business rules become non-negotiable, ensuring consistency across clients and preventing rule bypassing.

---

## Summary

This project is intentionally small but structured like a production MVP, with clean backend boundaries, predictable frontend data flow, clear UX states, and explicit, documented trade-offs. The goal was to build something maintainable and easy to extend, not to maximize feature count.
