import { useEffect, useRef, useState } from "react";
import type { Todo } from "../types/todo";
import { useDeleteTodo, useUpdateTodo } from "../hooks";

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

  const isUpdating = updateTodo.isPending;
  const isDeleting = deleteTodo.isPending;

  const isMutating = isUpdating || isDeleting;
  const isEditingLocked = todo.isCompleted || isMutating;

  useEffect(() => {
    if (isEditing) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isEditing]);

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

  const startEditing = () => {
    if (isEditingLocked) return;

    setError(null);
    setTitle(todo.title);
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (!confirm("Delete this todo?")) return;
    deleteTodo.mutate(todo.id);
  };

  return (
    <li
      className="todo-item"
      style={{
        opacity: isMutating ? 0.85 : 1,
        transition: "opacity 120ms ease-in-out",
      }}
    >
      <input
        type="checkbox"
        checked={todo.isCompleted}
        disabled={isUpdating}
        onChange={() =>
          updateTodo.mutate({
            ...todo,
            isCompleted: !todo.isCompleted,
          })
        }
      />
      <div className="todo-content">
        {isEditing ? (
          <div className="edit-row">
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isUpdating}
              aria-invalid={!!error}
            />

            <button
              className="btn btn-secondary"
              onClick={handleSave}
              disabled={isUpdating || !title.trim()}
            >
              Save
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Cancel
            </button>

            {error && <div className="error">{error}</div>}
          </div>
        ) : (
          <>
            <span
              className="todo-title"
              onClick={startEditing}
              title="Click to edit"
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
                cursor: isEditingLocked ? "default" : "pointer",
              }}
            >
              {todo.title}
            </span>

            <button
              className="btn btn-icon"
              onClick={handleDelete}
              disabled={isEditingLocked}
              aria-label="Delete todo"
              title="Delete"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </>
        )}
      </div>
    </li>
  );
}
