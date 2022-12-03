import Axios from "./Axios";

class Login {
  static loginWithAccount = ({
      email,
      password
    }) =>
    Axios.post("/api/login-account", {
      email,
      password
    });
}

export default Login;