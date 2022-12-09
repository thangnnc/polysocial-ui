import Axios from "../../Axios";

class Comments {
  static createComment = async (data) => Axios.post("/api/comment", data);
}

export default Comments;
