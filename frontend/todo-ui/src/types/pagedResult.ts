import type { PageSize } from "../config/pagination";

export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: PageSize;
  totalCount: number;
  totalPages: number;
};