import type { Todo } from "../types/todo";
import type { PagedResult } from "../types/pagedresult";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTodos(page: number, pageSize: number, filter: "all" | "active" | "completed"): Promise<PagedResult<Todo>> {
  const response = await fetch(`${API_BASE_URL}/todos?page=${page}&pageSize=${pageSize}&status=${filter}`);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) throw new Error("Failed to create todo");
  return response.json();
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (!response.ok) throw new Error("Failed to update todo");
  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
}
