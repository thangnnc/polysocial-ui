// routes
import Router from "./routes";
// components
import ScrollToTop from "./components/scroll-to-top";
import { ThemeProvider } from "@mui/material/";
import theme from "./utils/Theme/theme";
import { BrowserRouter } from "react-router-dom/dist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLogin from "./utils/Login/useLogin";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const { account } = useLogin();
  const [socket, setsocket] = useState();

  useEffect(()=>{
  try {
    if(account){
      const CONNECTTION_PORT = "localhost:3002";
       setsocket(io(CONNECTTION_PORT).emit("connectUser",account.email))
    }else{
      
    }
  } catch (error) {
    
  }
  },[])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop />
        <Router socket={socket}/>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
