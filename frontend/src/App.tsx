import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";
import CssBaseline from "@mui/material/CssBaseline";
import { TodosContextProvider } from "./context/todosContext";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodosContextProvider>
        <CssBaseline />
        <Home />
      </TodosContextProvider>
    </QueryClientProvider>
  );
};

export default App;
