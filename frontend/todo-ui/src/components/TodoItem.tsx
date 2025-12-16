import { useEffect, useRef, useState } from "react";
import type { Todo } from "../types/todo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const isLocked =
    todo.isCompleted || updateTodo.isPending || deleteTodo.isPending;

  useEffect(() => {
    if (isEditing) {
      setError(null);
      setTitle(todo.title);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isEditing, todo.title]);

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    updateTodo.mutate(
      { ...todo, title: title.trim() },
      {
        onSuccess: () => setIsEditing(false),
        onError: () => setError("Failed to save changes"),
      }
    );
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setError(null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        disabled={updateTodo.isPending}
        onChange={() =>
          updateTodo.mutate({
            ...todo,
            isCompleted: !todo.isCompleted,
          })
        }
      />

      {isEditing ? (
        <div className="edit-row">
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={updateTodo.isPending}
            aria-invalid={!!error}
          />

          <button
            className="btn btn-secondary"
            onClick={handleSave}
            disabled={updateTodo.isPending || !title.trim()}
          >
            Save
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={updateTodo.isPending}
          >
            Cancel
          </button>

          {error && <div className="error">{error}</div>}
        </div>
      ) : (
        <>
          <span
            className="todo-title"
            onClick={() => {
              if (!isLocked) {
                setIsEditing(true);
              }
            }}
            title="Click to edit"
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
              cursor: "pointer",
              opacity: updateTodo.isPending ? 0.6 : 1,
            }}
          >
            {todo.title}
            {updateTodo.isPending && <span className="saving"> Saving…</span>}
          </span>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm("Delete this todo?")) {
                deleteTodo.mutate(todo.id);
              }
            }}
            disabled={
              deleteTodo.isPending || updateTodo.isPending || todo.isCompleted
            }
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
