import { CssBaseline } from "@mui/material";
import { Home } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertProvider } from "./providers";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <CssBaseline />
        <Home />
      </AlertProvider>
    </QueryClientProvider>
  );
}

export default App;
