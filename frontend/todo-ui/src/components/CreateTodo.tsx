import { useState, useRef } from "react";
import { useCreateTodo } from "../hooks";
import { getApiErrorMessage } from "../utils/apiErrors";

type CreateTodoProps = {
  onCreated?: () => void;
};

export function CreateTodo({ onCreated }: CreateTodoProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const createTodo = useCreateTodo();

  const isSubmitting = createTodo.isPending;

  const reset = () => {
    setTitle("");
    setError(null);
  };

  const submit = () => {
    if (!title.trim()) {
      setError("Title cannot be empty");
      requestAnimationFrame(() => textareaRef.current?.focus());
      return;
    }

    setError(null);

    createTodo.mutate(title.trim(), {
      onSuccess: () => {
        reset();
        onCreated?.();
      },
      onError: (err: unknown) => {
        setError(getApiErrorMessage(err));
        requestAnimationFrame(() => textareaRef.current?.focus());
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      reset();
      textareaRef.current?.blur();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <form className="create-todo" onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError(null);
        }}
        onKeyDown={handleKeyDown}
        placeholder="New todo"
        maxLength={200}
        rows={4}
        cols={40}
        disabled={isSubmitting}
        aria-invalid={!!error}
        aria-describedby={error ? "create-todo-error" : undefined}
      />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={!title.trim() || isSubmitting}
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
