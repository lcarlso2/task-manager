import type { Filter } from "../types/filter";
import type { Sort } from "../types/sort";

export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (page: number, pageSize: number, filter: Filter, sort: Sort) =>
    [...todoKeys.lists(), page, pageSize, filter, sort] as const,
};
