import {
    useAddress,
    useUser,
    useLogin,
    useLogout,
    useMetamask,
    useAuth,
  } from "@thirdweb-dev/react";
import { useEffect, useState } from 'react';
import axios from 'axios';

// use interceptors to add token to local storage from login response

axios.interceptors.response.use(
    (response) => {
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
);

  
  const IndexPage = () => {
    const address = useAddress();
    const connect = useMetamask();
    const { login } = useLogin();
    const { logout } = useLogout();
    const { user, isLoggedIn } = useUser();
    const [secret, setSecret] = useState();
    const [token, setToken] = useState(null);


    const fetchSecret = async () => {
        // add the token to the request
        const token = localStorage.getItem("token");
        console.log('token', token);
        const response = await fetch("https://web3-auth-wo5n.onrender.com/api/v1/secret", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setSecret(data.message);
    };

    
        async function handleLogin() {
        try {
            const token = await login();
            console.log('token', token);
        } catch (error) {
            console.error(error);
        }
    }

  
    return (
      <div>
        {isLoggedIn ? (
          <button onClick={() => logout()}>Logout</button>
        ) : address ? (
            // on login save the token to local storage
          <button onClick={() => handleLogin()}>Login</button>
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )}
        <button onClick={fetchSecret}>Get Secret</button>
  
        <pre>Connected Wallet: {address}</pre>
        <pre>User: {JSON.stringify(user, undefined, 2) || "N/A"}</pre>
        <pre>Secret: {secret || "N/A"}</pre>
      </div>
    );
  };
  
  export default IndexPage;
  