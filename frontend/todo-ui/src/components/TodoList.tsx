import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../types/todo";

type Filter = "all" | "active" | "completed";

export function TodoList() {
  const { data: todos, isLoading, isError, error } = useTodos();
  const [filter, setFilter] = useState<Filter>("all");

  if (isLoading) {
    return <div>Loading todos…</div>;
  }

  if (isError) {
    return <div>Error loading todos: {(error as Error).message}</div>;
  }

  if (!todos || todos.length === 0) {
    return <div>No todos yet</div>;
  }

  const filteredTodos = filterTodos(todos, filter);

  return (
    <section>
      <FilterBar filter={filter} onChange={setFilter} />

      {filteredTodos.length === 0 ? (
        <div>No todos match this filter</div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </section>
  );
}

function filterTodos(todos: Todo[], filter: Filter): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((t) => !t.isCompleted);
    case "completed":
      return todos.filter((t) => t.isCompleted);
    default:
      return todos;
  }
}

type FilterBarProps = {
  filter: Filter;
  onChange: (filter: Filter) => void;
};

function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <div className="filters">
      <FilterButton
        label="All"
        active={filter === "all"}
        onClick={() => onChange("all")}
      />
      <FilterButton
        label="Active"
        active={filter === "active"}
        onClick={() => onChange("active")}
      />
      <FilterButton
        label="Completed"
        active={filter === "completed"}
        onClick={() => onChange("completed")}
      />
    </div>
  );
}

type FilterButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button onClick={onClick} disabled={active} aria-pressed={active}>
      {label}
    </button>
  );
}
