import Axios from "../../Axios";

class Accounts {
  static getAll = async () => Axios.get("https://reqres.in/api/users?page=2");
}

export default Accounts;
