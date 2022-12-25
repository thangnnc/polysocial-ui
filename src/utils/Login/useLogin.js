import { useState } from "react";

export default function useLogin() {
  const getAccount = () => {
    const accountString = localStorage.getItem("account");
    const account = JSON.parse(accountString);
    return account;
  };

  const [account, setAccount] = useState(getAccount());

  const saveAccount = async (account) => {
    if (!account) {
      return;
    }
    localStorage.setItem("account", JSON.stringify(account));
    setAccount(account);
    return;
  };

  const logout = () => {
    localStorage.removeItem("account");
    window.location = "/login";
  };

  return {
    account,
    setAccount: saveAccount,
    logout,
  };
}
