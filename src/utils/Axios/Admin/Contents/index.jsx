import Axios from "../../Axios";

class Content {
  //API get all groups
  static getAllByAllPost = async () => Axios.get("/api/posts?page=0&limit=10");

  static createPost = async (data) => Axios.postFile("/api/posts", data);

  static getAllByAllPostGroup = async (groupId) =>
    Axios.get(`/api/get-post-by-group?groupId=${groupId}`);
}

export default Content;
