import type { ApiError } from "../types/apiError";

export const getApiErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as ApiError).message);
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};
