import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";
import { FILTERS, type Filter } from "./types/filter";
import { SORTS, type Sort } from "./types/sort";
import "./App.css";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./config/pagination";
if (import.meta.env.DEV) {
  (window as any).__API_BASE__ = import.meta.env.VITE_API_BASE_URL;
}
export default function App() {
  const [filter, setFilter] = useState<Filter>(FILTERS.ALL.value);
  const [sort, setSort] = useState<Sort>(SORTS.CREATED_DESC.value);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const onCreated = () => {
    const nextFilter = FILTERS.ALL.value;
    const nextSort = SORTS.CREATED_DESC.value;
    const nextPage = DEFAULT_PAGE;
    const nextPageSize = DEFAULT_PAGE_SIZE;

    setFilter(nextFilter);
    setSort(nextSort);
    setPage(nextPage);
    setPageSize(nextPageSize);
  };

  return (
    <main>
      <h1>Todos</h1>

      <div className="create-todo-wrapper">
        <CreateTodo onCreated={onCreated} />
      </div>

      <TodoList
        filter={filter}
        sort={sort}
        page={page}
        pageSize={pageSize}
        onFilterChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
        onSortChange={(s) => {
          setSort(s);
          setPage(1);
        }}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </main>
  );
}
