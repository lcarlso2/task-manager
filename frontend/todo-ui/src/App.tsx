import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";
import { FILTERS, type Filter } from "./types/filter";
import { SORTS, type Sort } from "./types/sort";
import { useQueryClient } from "@tanstack/react-query";
import "./App.css";
import { todoKeys } from "./api/todoKeys";

export default function App() {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<Filter>(FILTERS.ALL.value);
  const [sort, setSort] = useState<Sort>(SORTS.CREATED_DESC.value);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const onCreated = () => {
    const nextFilter = FILTERS.ALL.value;
    const nextSort = SORTS.CREATED_DESC.value;
    const nextPage = 1;

    setFilter(nextFilter);
    setSort(nextSort);
    setPage(nextPage);

    queryClient.invalidateQueries({
      queryKey: todoKeys.list(nextPage, pageSize, nextFilter, nextSort),
      exact: true,
    });
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
        onFilterChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
        onSortChange={(s) => {
          setSort(s);
          setPage(1);
        }}
        onPageChange={setPage}
      />
    </main>
  );
}
