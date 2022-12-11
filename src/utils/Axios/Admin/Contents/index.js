import Axios from "../../Axios";

class Content {
  //API get all groups
  static getAllByAllPost = async () => Axios.get("/api/posts?page=0&limit=10");
  //API get all groups by id
  static getAllByAllPostGroup = async (groupId) =>
    Axios.get(`/api/get-post-by-group?groupId=${groupId}`);
  //Create new post
  static createPost = async (data) => Axios.postFile("/api/posts", data);
  //Update post
  static updatePost = async (data) => Axios.putFile("/api/update/post", data);
  //Delete post
  static deletePost = async (postId) =>
    Axios.delete(`/api/delete/post?postId=${postId}`);
}

export default Content;
