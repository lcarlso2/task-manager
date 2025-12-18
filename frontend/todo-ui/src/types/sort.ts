export const SORTS = {
  CREATED_DESC: {
    value: "createdDesc",
    label: "Newest first",
  },
  CREATED_ASC: {
    value: "createdAsc",
    label: "Oldest first",
  },
  TITLE_ASC: {
    value: "titleAsc",
    label: "Title (A–Z)",
  },
} as const;

export type Sort = (typeof SORTS)[keyof typeof SORTS]["value"];
