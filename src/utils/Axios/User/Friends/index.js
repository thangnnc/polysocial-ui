import Axios from "../../Axios";

class Friends {
  // Get add friend request
  static getAllRequestAddFriend = async (userId) =>
    Axios.get("/user/get-all-request-add-friend");
  // Delete add friend request
  static deleteAllRequestAddFriend = async (data) =>
    Axios.delete("/user/delete-request-add-friend", data);
  // Post accept friend
  static acceptFriend = async (data) => Axios.post("/user/accept-friend", data);
  // Post add friend
  static addFriend = async (data) => Axios.post("/user/add-friend", data);
  // Search user by name
  static searchUserByName = async (name) =>
    Axios.get(`/user/search-by-name?name=${name}`);
  // Search user by email
  static searchUserByEmail = async (email) =>
    Axios.get(`/user/search-by-email?email=${email}`);
  // Get all friend
  static getAllFriend = async () => Axios.get("/user/get-all-friend");
  // Get one friend
  static getOneFriend = async (userId, friendId) =>
    Axios.get(`/user/get-friend?userId=${userId}&friendId=${friendId}`);
}

export default Friends;
