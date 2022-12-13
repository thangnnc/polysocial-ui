import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const CONNECTTION_PORT = "localhost:3002";
let socket  = io(CONNECTTION_PORT);

export default function useLogin() {

  const getAccount = () => {
    
    const accountString = sessionStorage.getItem("account");
    const account = JSON.parse(accountString);
    return account;
  };

  const [account, setAccount] = useState(getAccount());

  const saveAccount = async (account) => {
    if (!account) {
      return;
    }
    sessionStorage.setItem("account", JSON.stringify(account));
    setAccount(account);
    return;
  };

  const logout = () => {
    socket.emit("logout",account);
    sessionStorage.removeItem("account");
    window.location = "/login";
  };

  // console.log("socket",sockets);

  return {
    account,
    setAccount: saveAccount,
    logout,
    socket,
  };
}
