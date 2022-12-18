import Axios from "../../Axios";

class Revenus {
  //API get all Revenus access time
  static getAllRevenuAccseeTime = async () =>
    Axios.get("/accessTime/statistical");
  //API get all Revenus access time
  static getAllRevenus = async () => Axios.get("/api/statistical");
}

export default Revenus;
