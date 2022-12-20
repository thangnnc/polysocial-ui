import Axios from "../../Axios";

class Messages {
  //API get all message
  static getMessage = async (data) => Axios.post("/api/getMessage", data);

  static createMessage = async (data) => Axios.post("/api/createMessage", data);

  static updateviewedStatus = async (data) =>
    Axios.post("/api/updateViewedStatus", data);

  static getNameGroupDESC = async (data) => Axios.post("/api/getName", data);
  static updateAllViewedStatus = async (data) => Axios.post("/api/updateAllViewedStatus", data);
}

export default Messages;
