import Axios from "../../Axios";

class Friends {
  // Get add friend request
  static getAllRequestAddFriend = async (userId) =>
    Axios.get("/user/get-all-request-add-friend");
  // Delete add friend request
  static deleteAllRequestAddFriend = async (data) =>
    Axios.delete("/user/delete-request-add-friend", data);

  // Delete one friend request
  static deleteOneAllRequestAddFriend = async (data) =>
    Axios.put("/user/unfriend", data);
  // Post accept friend
  static acceptFriend = async (data) => Axios.post("/user/accept-friend", data);
  // Post add friend
  static addFriend = async (data) => Axios.post("/user/add-friend", data);
  // Search user by kework
  static searchUserByKeywork = async (keyword) =>
    Axios.get(`/user/search-keyword?keyword=${keyword}`);
  // Get all friend
  static getAllFriend = async (userId) =>
    Axios.get(`/user/get-all-friend?userId=${userId}`);
  // Get one friend
  static getOneFriend = async (userId, friendId) =>
    Axios.get(`/user/get-friend?userId=${userId}&friendId=${friendId}`);
}

export default Friends;
