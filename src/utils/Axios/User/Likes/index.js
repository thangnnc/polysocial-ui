import Axios from "../../Axios";

class Likes {
  static likeUnLike = async (data) => Axios.post("/api/like/", data);
}

export default Likes;
