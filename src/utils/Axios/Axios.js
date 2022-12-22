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
      .then((result) => result)
      .catch((error) => error.response);
    return response;
  }

  static async postLogin(url, data, headers) {
    const response = await axios
      .post(url, data, {
        headers: {
          ...headers,
          ...Config.HEADERS,
        },
      })
      .then((result) => result)
      .catch((error) => error.response);
    return response;
  }

  static async postFile(url, data, headers) {
    const response = await axios
      .post(`${Config.URL}${url}`, data, {
        headers: {
          ...headers,
          ...Config.HEADERS,
          ...{ "Content-Type": " multipart/form-data" },
        },
      })
      .catch((e) => {
        throw Error(e.response.data.message);
      });
    return response.data;
  }

  static async get(url, headers) {
    const response = await axios
      .get(`${Config.URL}${url}`, {
        data: null,
        headers: {
          ...headers,
          ...Config.HEADERS,
        },
      })
      .then((result) => result)
      .catch((error) => error.response);
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
      .then((result) => result)
      .catch((error) => error.response);
    return response.data;
  }

  static async putFile(url, data, headers) {
    const response = await axios
      .put(`${Config.URL}${url}`, data, {
        headers: {
          ...headers,
          ...Config.HEADERS,
          ...{ "Content-Type": "multipart/form-data" },
        },
      })
      .catch((error) => error.response);
    return response.data;
  }

  static async delete(url, data,headers) {
    const response = await axios
      .delete(`${Config.URL}${url}`,{
        data,
        headers: {
          ...headers,
          ...Config.HEADERS,
        },
      })
      .then((result) => result)
      .catch((error) => error.response);
    return response;
  }
}

export default Axios;
