import Axios from "../../Axios";

class Accounts {
  static getAll = async () => Axios.get("https://reqres.in/api/users?page=2");

  static getOneUser = async (userId) =>
    Axios.get(`/user/get-one?userId=${userId}`);
}

export default Accounts;
