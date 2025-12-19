import type { Todo } from "../types/todo";
import type { PagedResult } from "../types/pagedResult";
import type { Filter } from "../types/filter";
import { handleApiResponse } from "./handleApiResponse";
import type { Sort } from "../types/sort";
import type { PageSize } from "../config/pagination";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export async function fetchTodos(
  page: number,
  pageSize: PageSize,
  filter: Filter,
  sort: Sort
): Promise<PagedResult<Todo>> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    status: filter,
    sort,
  });

  const response = await fetch(`${API_BASE_URL}/todos?${params.toString()}`);

  return handleApiResponse(response);
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  return handleApiResponse(response);
}

export async function updateTodo(todo: Todo): Promise<Todo> {
  const payload = {
    title: todo.title,
    isCompleted: todo.isCompleted,
  };

  const response = await fetch(`${API_BASE_URL}/todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleApiResponse(response);
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await handleApiResponse(response);
  }
}
