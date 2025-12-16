import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";
import type { Filter } from "../components/FilterBar";

export function useTodos(page: number, pageSize: number, filter: Filter) {
  return useQuery({
    queryKey: ["todos", page, pageSize, filter],
    queryFn: () => fetchTodos(page, pageSize, filter),
    staleTime: 30_000,
  });
}
