import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos, upsertTodo } from "../api";

const TODOS_QUERY = "todos";

export const useTodos = () => {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({ queryKey: [TODOS_QUERY], queryFn: getTodos });

  const invalidateTodosQuery = () =>
    queryClient.invalidateQueries({ queryKey: [TODOS_QUERY] });

  const upsertMutation = useMutation({
    mutationFn: upsertTodo,
    onSuccess: invalidateTodosQuery,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: invalidateTodosQuery,
  });

  return {
    todosQuery,
    upsertTodo: upsertMutation.mutate,
    deleteTodo: deleteMutation.mutate,
  };
};
