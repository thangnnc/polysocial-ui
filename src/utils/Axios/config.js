const sessionToken = `${sessionStorage.getItem("account")}`;
const dataToken = JSON.parse(sessionToken) ? JSON.parse(sessionToken) : "";

const CONFIG = {
  URL: "http://localhost:8080",
  HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: dataToken.token,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export default CONFIG;
