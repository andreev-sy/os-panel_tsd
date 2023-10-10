import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [baseUrl, setBaseUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = (username, password, baseUrl) => {
    setIsLoading(true);

    axios
      .post(`http://${baseUrl}/api/auth/login/`, {
        username,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo)
        setUserInfo(userInfo);
        setBaseUrl(baseUrl);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('baseUrl', baseUrl);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const changeBaseUrl = (baseUrl) => {
    try {
      setSplashLoading(true);
      setBaseUrl(baseUrl);
      AsyncStorage.removeItem('baseUrl');
      AsyncStorage.setItem('baseUrl', baseUrl);
      setSplashLoading(false);

    } catch (e) {
      console.log(`is logged in error ${e}`);
      setSplashLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);

    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('baseUrl');
    setUserInfo({});
    setBaseUrl('');

    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      if (userInfo) setUserInfo(userInfo);

      let baseUrl = await AsyncStorage.getItem('baseUrl');
      if (baseUrl) setBaseUrl(baseUrl);

      setSplashLoading(false);

    } catch (e) {
      console.log(`is logged in error ${e}`);
      setSplashLoading(false);
    }
  };

  useEffect(() => { isLoggedIn(); }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isLoading, 
        splashLoading, 
        userInfo, 
        baseUrl, 
        setBaseUrl, 
        changeBaseUrl,
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
