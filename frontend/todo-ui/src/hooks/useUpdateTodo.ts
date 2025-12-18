import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoKeys } from "../api/todoKeys";
import { updateTodo } from "../api/todos";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todoKeys.lists(),
      });
    },
  });
}
