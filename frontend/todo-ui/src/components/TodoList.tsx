import {
  TodoItem,
  PaginationControls,
  PageSizeSelector,
  FilterBar,
} from "../components";
import { FILTERS, type Filter } from "../types/filter";
import { type Sort } from "../types/sort";
import { useTodos } from "../hooks";
import { SortControl } from "./SortControl";
import type { PageSize } from "../config/pagination";

type TodoListProps = {
  filter: Filter;
  sort: Sort;
  page: number;
  pageSize: PageSize;
  onFilterChange: (filter: Filter) => void;
  onSortChange: (sort: Sort) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: PageSize) => void;
};
export function TodoList({
  filter,
  sort,
  page,
  pageSize,
  onFilterChange,
  onSortChange,
  onPageChange,
  onPageSizeChange,
}: TodoListProps) {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useTodos(page, pageSize, filter, sort);

  const handleFilterChange = (newFilter: Filter) => {
    onFilterChange(newFilter);
  };

  const isInitialLoad = isLoading && !todos;
  const listContextKey = `${filter}:${sort}:${page}:${pageSize}`;
  let panelBody: React.ReactNode;

  if (isInitialLoad) {
    panelBody = <div>Loading todos…</div>;
  } else if (isError) {
    console.error(error);
    panelBody = (
      <div className="error">
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
          <TodoItem key={`${listContextKey}:${todo.id}`} todo={todo} />
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
            <>
              <div className="todo-meta">
                {todos.totalCount}{" "}
                {filter === FILTERS.ALL.value ? "Todo" : `${filter} Todo`}
                {todos.totalCount === 1 ? "" : "s"}
              </div>
              <SortControl value={sort} onChange={onSortChange} />
            </>
          )}
        </div>

        <div className="todo-panel-body">{panelBody}</div>

        {todos && (
          <div className="todo-panel-footer">
            <div className="todo-panel-footer-controls">
              <PaginationControls
                page={todos.page}
                totalPages={todos.totalPages}
                onPageChange={onPageChange}
              />

              <PageSizeSelector value={todos.pageSize} onChange={onPageSizeChange} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
