import type { Todo } from "../types/todo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_BASE_URL}/todos`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}
