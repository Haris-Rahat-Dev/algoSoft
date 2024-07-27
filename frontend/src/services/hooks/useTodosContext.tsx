import { useContext } from "react";
import { TodosContext } from "../../context/todosContext";

const useTodosContext = () => {
  const todosContext = useContext(TodosContext);

  if (!todosContext) {
    throw new Error(
      "useTodosContext must be used within a TodosContextProvider"
    );
  }

  return todosContext;
};

export default useTodosContext;
