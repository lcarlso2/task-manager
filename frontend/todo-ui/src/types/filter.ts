export const FILTERS = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed",
} as const;

export type Filter = (typeof FILTERS)[keyof typeof FILTERS];