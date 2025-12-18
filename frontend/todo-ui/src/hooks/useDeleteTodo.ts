import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../api/todos";

export function useDeleteTodo() {
  return useMutation({
    mutationFn: deleteTodo,
  });
}
