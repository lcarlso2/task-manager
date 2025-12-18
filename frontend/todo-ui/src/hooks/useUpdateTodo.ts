import { useMutation } from "@tanstack/react-query";
import { updateTodo } from "../api/todos";

export function useUpdateTodo() {
  return useMutation({
    mutationFn: updateTodo,
  });
}
