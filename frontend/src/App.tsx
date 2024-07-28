import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/home";
import CssBaseline from "@mui/material/CssBaseline";
import { TodosContextProvider } from "./context/todosContext";
import { createTheme, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ee5b84",
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TodosContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Home />
        </ThemeProvider>
      </TodosContextProvider>
    </QueryClientProvider>
  );
};

export default App;
