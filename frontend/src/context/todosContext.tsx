import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import useTodos from "../services/hooks/useTodos";
import { Todo } from "../@types/types";
import { UseMutateFunction } from "@tanstack/react-query";

export const TodosContext = createContext<{
  todos: Array<Todo>;
  isLoading: boolean;
  currentTodo: Todo | null;
  setCurrentTodo: Dispatch<SetStateAction<Todo | null>>;
  deleteTodoMutation: UseMutateFunction<Todo, Error, number, unknown>;
  createTodoMutation: UseMutateFunction<
    Todo,
    Error,
    { title: string; description: string },
    unknown
  >;
  updateTodoMutation: UseMutateFunction<
    Todo,
    Error,
    {
      id: number;
      title?: string;
      description?: string;
      completed?: boolean;
    },
    unknown
  >;
} | null>(null);

export const TodosContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const {
    todos,
    isLoading,
    deleteTodoMutation,
    createTodoMutation,
    updateTodoMutation,
  } = useTodos();
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        currentTodo,
        setCurrentTodo,
        deleteTodoMutation,
        createTodoMutation,
        updateTodoMutation,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
