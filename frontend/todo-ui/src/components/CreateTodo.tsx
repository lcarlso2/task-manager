import { useState, useRef } from "react";
import { useCreateTodo } from "../hooks";
import { getApiErrorMessage } from "../utils/apiErrors";

type CreateTodoProps = {
  onCreated?: () => void;
};

export function CreateTodo({ onCreated }: CreateTodoProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const createTodo = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setError(null);

    createTodo.mutate(title, {
      onSuccess: () => {
        setTitle("");
        onCreated?.();
      },
      onError: (err: unknown) => {
        setError(getApiErrorMessage(err));
        requestAnimationFrame(() => inputRef.current?.focus());
      },
    });
  };

  return (
    <form className="create-todo" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
        maxLength={200}
        aria-invalid={!!error}
        aria-describedby={error ? "create-todo-error" : undefined}
      />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={!title.trim() || createTodo.isPending}
      >
        Add
      </button>

      {error && (
        <div id="create-todo-error" className="error">
          {error}
        </div>
      )}
    </form>
  );
}
