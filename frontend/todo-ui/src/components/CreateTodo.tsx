import { useState } from "react";
import { useCreateTodo } from "../hooks";

type CreateTodoProps = {
  onCreated?: () => void;
};

export function CreateTodo({ onCreated }: CreateTodoProps) {
  const [title, setTitle] = useState("");
  const createTodo = useCreateTodo();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    createTodo.mutate(title, {
      onSuccess: () => {
        onCreated?.();
      },
    });

    setTitle("");
  }

  return (
    <form className="create-todo" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!title.trim() || createTodo.isPending}
      >
        Add
      </button>
    </form>
  );
}
