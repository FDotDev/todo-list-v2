import { CssBaseline } from "@mui/material";
import { Home } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Home />
    </QueryClientProvider>
  );
}

export default App;
