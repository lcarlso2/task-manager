import { useState } from "react";
import { useCreateTodo } from "../hooks";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const createTodo = useCreateTodo();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    createTodo.mutate(title);
    setTitle("");
  }

  const isValid = title.trim().length > 0;

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
        disabled={!isValid || createTodo.isPending}
      >
        Add
      </button>
    </form>
  );
}