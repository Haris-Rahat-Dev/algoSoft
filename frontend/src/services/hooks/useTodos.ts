import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import axiosInstance from "../../config/axios-config";
import { Todo } from "../../@types/types";

const useTodos = () => {
  const queryClient = useQueryClient();

  const getTodos = useCallback(async () => {
    const { data } = await axiosInstance("/todos");
    return data;
  }, []);

  const deleteTodo = useCallback(async (id: number) => {
    const { data } = await axiosInstance.delete(`/todos/${id}`);
    return data;
  }, []);

  const createTodo = useCallback(
    async ({ title, description }: { title: string; description: string }) => {
      const { data } = await axiosInstance.post("/todos", {
        title,
        description,
      });
      return data;
    },
    []
  );

  const updateTodo = useCallback(
    async ({
      id,
      title,
      description,
      completed,
    }: {
      id: number;
      title?: string;
      description?: string;
      completed?: boolean;
    }) => {
      let payLoad = {};
      if (completed) {
        payLoad = { completed };
      } else {
        payLoad = {
          title,
          description,
        };
      }

      const { data } = await axiosInstance.patch(`/todos/${id}`, payLoad);
      return data;
    },
    []
  );

  // Queries
  const { isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { mutate: deleteTodoMutation } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: deleteTodo,
    onSuccess: (data: Todo) => {
      queryClient.setQueryData(["todos"], (oldData: Array<Todo>) => {
        if (!oldData) return [];

        return oldData.filter((todo) => todo.id !== data.id);
      });
    },
  });

  const { mutate: createTodoMutation } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: createTodo,
    onSuccess: (data: Todo) => {
      queryClient.setQueryData(["todos"], (oldData: Array<Todo>) => {
        if (!oldData) return [data];

        return [...oldData, data];
      });
    },
  });

  const { mutate: updateTodoMutation } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: updateTodo,
    onSuccess: (updatedTodo: Todo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos = []) => {
        return oldTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      });
    },
  });

  return {
    isLoading,
    error,
    todos: data || [],
    deleteTodoMutation,
    createTodoMutation,
    updateTodoMutation,
  };
};

export default useTodos;
