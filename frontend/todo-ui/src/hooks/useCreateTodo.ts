import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";
import type { Todo } from "../types/todo";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,

    onMutate: async (title: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

      const optimisticTodo: Todo = {
        id: Date.now(),
        title,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Todo[]>(["todos"], (old) => [
        ...(old ?? []),
        optimisticTodo,
      ]);

      return { previousTodos };
    },

    onError: (_err, _title, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
