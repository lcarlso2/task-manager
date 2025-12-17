import { useEffect, useRef, useState } from "react";
import type { Todo } from "../types/todo";
import { useDeleteTodo, useUpdateTodo } from "../hooks";
import { getApiErrorMessage } from "../utils/apiErrors";

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const isUpdating = updateTodo.isPending;
  const isDeleting = deleteTodo.isPending;
  const isMutating = isUpdating || isDeleting;

  const isEditingLocked = todo.isCompleted || isMutating;

  useEffect(() => {
    if (isEditing) {
      requestAnimationFrame(() => textareaRef.current?.focus());
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
        onError: (err: unknown) => {
          setError(getApiErrorMessage(err));
          requestAnimationFrame(() => textareaRef.current?.focus());
        },
      }
    );
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setError(null);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
      return;
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

      <div className="todo-body">
        <div className="todo-content">
          <div className="todo-main">
            {isEditing ? (
              <textarea
                ref={textareaRef}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={handleKeyDown}
                disabled={isUpdating}
                rows={4}
                maxLength={200}
                aria-invalid={!!error}
                aria-describedby={error ? "todo-item-error" : undefined}
              />
            ) : (
              <span
                className="todo-title"
                onClick={startEditing}
                title={todo.title}
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  cursor: isEditingLocked ? "default" : "pointer",
                }}
              >
                {todo.title}
              </span>
            )}
          </div>

          {!isEditing && (
            <div className="todo-actions">
              <button
                className="btn btn-icon"
                onClick={handleDelete}
                disabled={isEditingLocked}
                aria-label="Delete todo"
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
            </div>
          )}
        </div>

        {isEditing && (
          <div className="todo-edit-footer">
            {error && (
              <div id="todo-item-error" className="error">
                {error}
              </div>
            )}

            <div className="todo-edit-actions">
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
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
