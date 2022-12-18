import Axios from "../../Axios";

class Notifications {
  //API get all notifications
  static getAllNotifications = async () =>
    Axios.get("/api/notifications/get-all");
  //API update one notifications
    static updateNotifications = async (notiId) =>
    Axios.post(`/api/notifications/update-one?notiId=${notiId}`);

  //API get all notifications
    static updateAllNotifications = async () =>
    Axios.post(`/api/notifications/update-all`);
}

export default Notifications;
