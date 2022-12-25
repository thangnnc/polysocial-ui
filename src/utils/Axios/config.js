const sessionToken = `${sessionStorage.getItem("account")}`;
const dataToken = JSON.parse(sessionToken) ? JSON.parse(sessionToken) : "";

const CONFIG = {
  URL: "https://polysocial-central-service.up.railway.app",
  HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    Authorization: dataToken.token,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export default CONFIG;
