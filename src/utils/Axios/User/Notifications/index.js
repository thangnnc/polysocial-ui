import Axios from "../../Axios";

class Notifications {
  //API get all notifications
  static getAllNotifications = async () =>
    Axios.get("/api/notifications/get-all");
  //API get all notifications
    static updateNotifications = async (notiId) =>
    Axios.post(`/api/notifications/update-one?notiId=${notiId}`);
}

export default Notifications;
