// routes
import Router from "./routes";
// components
import ScrollToTop from "./components/scroll-to-top";
import { ThemeProvider } from "@mui/material/";
import theme from "./utils/Theme/theme";
import { BrowserRouter } from "react-router-dom/dist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <Router />
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
