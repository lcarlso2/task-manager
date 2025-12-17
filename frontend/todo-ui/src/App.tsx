import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { TodoList } from "./components/TodoList";
import { FILTERS, type Filter } from "./types/filter";
import "./App.css";

export default function App() {
  const [filter, setFilter] = useState<Filter>(FILTERS.ALL);
  const [page, setPage] = useState(1);

  return (
    <main>
      <h1>Todos</h1>

      <div className="create-todo-wrapper">
        <CreateTodo
          onCreated={() => {
            setFilter(FILTERS.ALL);
            setPage(1);
          }}
        />
      </div>

      <TodoList
        filter={filter}
        onFilterChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
        page={page}
        onPageChange={setPage}
      />
    </main>
  );
}
