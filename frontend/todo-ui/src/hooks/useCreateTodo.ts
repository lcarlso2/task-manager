import { useMutation } from "@tanstack/react-query";
import { createTodo } from "../api/todos";

export function useCreateTodo() {
  return useMutation({
    mutationFn: createTodo,
  });
}
