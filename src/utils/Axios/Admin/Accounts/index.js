import Axios from "../../Axios";

class Accounts {
  // API get all user
  static getAllUser = async () => Axios.get("/user/get-all");
  //API get one user
  static getOneUser = async (userId) =>
    Axios.get(`/user/get-one?userId=${userId}`);
  // API update user
  static updateUser = async (user) =>
    Axios.put("/user/update-user-detail", user);
  //API get one user detail
  static getOneUserDetail = async (userId) =>
    Axios.get(`/user/get-one-user-details?userId=${userId}`);
  // API update password
  static updatePassword = async (user) =>
    Axios.put("/user/update-password", user);
  // API get all user details
  static getAllUserDetails = async () =>
    Axios.get("/user/get-all-user-userdetail");
  // API update user details
  static updateUserDetails = async (user) =>
    Axios.put("/user/update-account", user);
}

export default Accounts;
