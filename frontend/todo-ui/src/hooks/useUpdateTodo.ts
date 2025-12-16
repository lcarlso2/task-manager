import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todos";
import type { Todo } from "../types/todo";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,

    onMutate: async (updatedTodo: Todo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old?.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );

      return { previousTodos };
    },

    onError: (_err, _todo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}