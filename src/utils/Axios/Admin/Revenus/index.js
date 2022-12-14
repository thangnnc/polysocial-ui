import Axios from "../../Axios";

class Revenus {
  //API get all Revenus
  static getAllRevenus = async () => Axios.get("/accessTime/statistical");
}

export default Revenus;
