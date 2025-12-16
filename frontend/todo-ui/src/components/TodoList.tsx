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

  if (isLoading) {
    return <div>Loading todos…</div>;
  }

  if (isError) {
    return <div>Error loading todos: {(error as Error).message}</div>;
  }

  if (!todos || todos.items.length === 0) {
    return <div>No todos yet</div>;
  }

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <section>
      <FilterBar filter={filter} onChange={handleFilterChange} />
      <div className="todo-meta">
        {todos.totalCount}{" "}
        {filter === FILTERS.ALL ? "Todos" : `${filter} Todos`}
      </div>
      {todos.items.length === 0 ? (
        <div>No todos match this filter</div>
      ) : (
        <ul className="todo-list">
          {todos.items.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}

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
    </section>
  );
}