import Axios from "../../Axios";

class Notifications {
  //API get all notifications
  static getAllNotifications = async () =>
    Axios.get("/api/notifications/get-all");
}

export default Notifications;
