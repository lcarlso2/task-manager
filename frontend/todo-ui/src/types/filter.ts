export const FILTERS = {
  ALL: {
    value: "all",
    label: "All",
  },
  ACTIVE: {
    value: "active",
    label: "Active",
  },
  COMPLETED: {
    value: "completed",
    label: "Completed",
  },
} as const;

export type Filter = (typeof FILTERS)[keyof typeof FILTERS]["value"];
