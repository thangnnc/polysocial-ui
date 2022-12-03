import Axios from "../../Axios";

class Content {
  //API get all groups
  static getAllByAllPost = async () => Axios.get("/api/posts?page=0&limit=10");
}

export default Content;
