import { useState } from 'react';

export default function useLogin() {

  const getAccount = () => {
    const accountString = sessionStorage.getItem('account');
    const account = JSON.parse(accountString);
    return account;
  };

  const [account, setAccount] = useState(getAccount());

  const saveAccount = account => {
    if(!account) {
      return;
    }
    sessionStorage.setItem('account', JSON.stringify(account));
    setAccount(account);
  };

  const logout = () => {
    sessionStorage.removeItem('account');
    window.location = "/login";
  };

  return {
    account,
    setAccount: saveAccount,
    logout
  }
}