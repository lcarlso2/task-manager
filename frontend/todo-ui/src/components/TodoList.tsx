import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { data, isLoading, error } = useTodos();
  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Failed to load todos</p>;
  if (!data || data.length === 0) return <p>No todos yet</p>;

  return (
    <ul>
      {data.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
