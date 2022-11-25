import Config from "./config";
import axios from "axios";

class Axios {
  static async post(url, data, headers) {
    const response = await axios
      .post(`${Config.URL}${url}`, data, {
        headers: {
          ...headers,
          ...Config.HEADERS,
        },
      })
      .then(result => result)
      .catch(error => error.response)
    return response;
  }

  static async get(url, headers) {
    const response = await axios
      .get(`${Config.URL}${url}`, {
        headers: {
          ...headers,
          ...Config.HEADERS,
        },
      })
      .then(result => result)
      .catch(error => error.response)

    return response.data;
  }

  static async put(url, data, headers) {
    const response = await axios
      .put(`${Config.URL}${url}`, data, {
        headers: {
          ...headers,
          ...Config.HEADERS,
        },
      })
      .then(result => result)
      .catch(error => error.response)

    return response.data;
  }

  static async delete(url, headers) {
    const response = await axios
      .delete(`${Config.URL}${url}`, {
        headers: {
          ...headers,
          ...Config.HEADERS,
        },
      })
      .then(result => result)
      .catch(error => error.response)

    return response.data;
  }
}

export default Axios;
