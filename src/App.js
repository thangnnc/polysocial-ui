// routes
import Router from './routes';
// components
import ScrollToTop from './components/scroll-to-top';
import { ThemeProvider } from '@mui/material/';
import theme from './utils/Theme/theme';
import { BrowserRouter } from 'react-router-dom/dist';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop/>
          <Router/>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
