import Axios from "./Axios";
import { useNavigate } from "react-router-dom";

class Login {


  static loginWithAccount = ({ email, password }) =>
    Axios.post("/api/login-account", { email, password });
}

export default Login;
