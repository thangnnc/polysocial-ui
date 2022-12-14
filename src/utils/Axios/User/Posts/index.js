import Axios from "../../Axios";

class Posts {
  //API get all groups
  static getAllByAllPost = async (currPage, limit) =>
    Axios.get("/api/posts?page=" + currPage + "&limit=" + limit);

  static createPost = async (data) => Axios.postFile("/api/posts", data);

  static getAllByAllPostGroup = async (groupId) =>
    Axios.get(`/api/get-post-by-group?groupId=${groupId}`);
}

export default Posts;
