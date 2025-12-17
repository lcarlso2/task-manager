import { useState } from "react";
import {
  TodoItem,
  PaginationControls,
  PageSizeSelector,
  FilterBar,
} from "../components";
import { FILTERS, type Filter } from "../types/filter";
import { useTodos } from "../hooks";

export function TodoList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filter, setFilter] = useState<Filter>(FILTERS.ALL);

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useTodos(page, pageSize, filter);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    setPage(1);
  };

  const isInitialLoad = isLoading && !todos;
  let panelBody: React.ReactNode;

  if (isInitialLoad) {
    panelBody = <div>Loading todos…</div>;
  } else if (isError) {
    console.error(error);
    panelBody = (
      <div className="error-state">
        Something went wrong while loading your todos.
        <br />
        Please try again.
      </div>
    );
  } else if (!todos || todos.items.length === 0) {
    panelBody = <div className="empty-state">No todos match this filter</div>;
  } else {
    panelBody = (
      <ul className="todo-list">
        {todos.items.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    );
  }

  return (
    <section className="todo-section">
      <div className="filter-bar-wrapper">
        <FilterBar filter={filter} onChange={handleFilterChange} />
      </div>

      <div className="todo-panel">
        <div className="todo-panel-header">
          {todos && (
            <div className="todo-meta">
              {todos.totalCount}{" "}
              {filter === FILTERS.ALL ? "Todo" : `${filter} Todo`}
              {todos.totalCount === 1 ? "" : "s"}
            </div>
          )}
        </div>

        <div className="todo-panel-body">{panelBody}</div>

        {todos && (
          <div className="todo-panel-footer">
            <div className="todo-panel-footer-controls">
              <PaginationControls
                page={todos.page}
                totalPages={todos.totalPages}
                onPageChange={setPage}
              />

              <PageSizeSelector
                value={pageSize}
                onChange={(size) => {
                  setPageSize(size);
                  setPage(1);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
