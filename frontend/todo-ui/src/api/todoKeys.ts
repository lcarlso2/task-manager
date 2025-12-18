import type { Filter } from "../types/filter";
import type { Sort } from "../types/sort";

export const todoKeys = {
  list: (page: number, pageSize: number, filter: Filter, sort: Sort) =>
    ["todos", page, pageSize, filter, sort] as const,
};
