import Axios from "../../Axios";

class Comments {
  //API get comment by post id
  static getCommentByPostId = async (postId) =>
    Axios.get(`/api/comment/post/${postId}`);
  //API create comment
  static createComment = async (data) => Axios.post("/api/comment", data);
  //API reply comment
  static replyComment = async (data) => Axios.post("/api/comment", data);
  //API update comment
  static updateComment = async (data) => Axios.put("/api/comment/update", data);
  //API delete comment
  static deleteComment = async (commentId) =>
    Axios.delete(`/api/comment/delete?commentId=${commentId}`);
}

export default Comments;
