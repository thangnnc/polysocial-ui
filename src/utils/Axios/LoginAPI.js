import Axios from "./Axios";

class Login {
  static loginWithAccount = ({ email, password }) =>
    Axios.post("/api/login-account", {
      email,
      password,
    });
  static loginWithEmail = ({ email }) =>
    Axios.post("/api/login-email", {
      email,
    });
    
  static registerAPI = (data) =>
  Axios.postFile("/api/register", data);
}

export default Login;
