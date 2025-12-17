import type { ApiError } from "../types/apiError";

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return response.json();
  }

  let message = "Something went wrong. Please try again.";

  try {
    const data = await response.json();

    if (data?.errors && typeof data.errors === "object") {
      const firstKey = Object.keys(data.errors)[0];
      const firstError = data.errors[firstKey]?.[0];

      if (typeof firstError === "string") {
        message = firstError;
      }
    } else if (typeof data?.message === "string") {
      message = data.message;
    } else if (typeof data?.title === "string") {
      message = data.title;
    }
  } catch {
    // non-JSON error response
  }

  const error: ApiError = {
    message,
    status: response.status,
  };

  throw error;
}
