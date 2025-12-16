import { useTodos } from "../hooks/useTodos";

export function TodoList() {
  const { data, isLoading, error } = useTodos();

  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Failed to load todos</p>;
  if (!data || data.length === 0) return <p>No todos yet</p>;

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.isCompleted} readOnly />
          <span style={{ marginLeft: 8 }}>{todo.title}</span>
        </li>
      ))}
    </ul>
  );
}
