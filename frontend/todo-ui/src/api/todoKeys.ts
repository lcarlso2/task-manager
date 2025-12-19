import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../config/pagination";
import { FILTERS, type Filter } from "../types/filter";
import { SORTS, type Sort } from "../types/sort";

export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (page: number, pageSize: number, filter: Filter, sort: Sort) =>
    [...todoKeys.lists(), page, pageSize, filter, sort] as const,
  defaultList: () =>
    todoKeys.list(DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FILTERS.ALL.value, SORTS.CREATED_DESC.value),
};
