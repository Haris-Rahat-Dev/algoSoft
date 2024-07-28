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

  const createTodo = useCallback(async (formData) => {
    const { data } = await axiosInstance.post("/todos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }, []);

  const updateTodo = useCallback(
    async ({ formData, id }: { formData?: FormData; id: number }) => {
      const { data } = await axiosInstance.patch(`/todos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    []
  );

  const completeTodo = useCallback(async (id: number) => {
    const { data } = await axiosInstance.patch(`/todos/completeTodo/${id}`, {});
    return data;
  }, []);

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

  const { mutate: completeTodoMutation } = useMutation({
    mutationKey: ["completeTodo"],
    mutationFn: completeTodo,
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
    completeTodoMutation,
  };
};

export default useTodos;
