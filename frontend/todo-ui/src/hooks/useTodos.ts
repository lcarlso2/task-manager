import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";
import { todoKeys } from "../api/todoKeys";
import type { Filter } from "../types/filter";
import type { Sort } from "../types/sort";

export function useTodos(page: number, pageSize: number, filter: Filter, sort: Sort) {
  return useQuery({
    queryKey: todoKeys.list(page, pageSize, filter, sort),
    queryFn: () => fetchTodos(page, pageSize, filter, sort),
    staleTime: 0,
    placeholderData: (previousData) => previousData,
  });
}