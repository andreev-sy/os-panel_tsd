import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { colors } from '../view/themes/variables';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [scanAuto, setScanAuto] = useState(true);
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
        setUserInfo(userInfo);
        setBaseUrl(baseUrl);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('baseUrl', baseUrl);

        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        setTimeout(function () {
          Snackbar.show({
            text: e.response.data.message,
            textColor: colors.DANGER,
            backgroundColor: colors.LIGHT_DANGER,
            duration: Snackbar.LENGTH_SHORT,
          });
        }, 500)
      });
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
      let baseUrl = await AsyncStorage.getItem('baseUrl');
      let userInfo = await AsyncStorage.getItem('userInfo');
      setBaseUrl(baseUrl);
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        axios.get(`http://${baseUrl}/api/auth/check/`, { headers: { Authorization: `Bearer ${userInfo.access_token}` } })
          .then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setSplashLoading(false);
          })
          .catch(e => {
            setSplashLoading(false);
            logout();
          });
      } else {
        setSplashLoading(false);
        logout();
      }

    } catch (e) {
      setSplashLoading(false);
      logout();
    }
  };

  // const setConst = async () => {
  //     let scan = await AsyncStorage.getItem('scanAuto');

  //     if(scan) setScanAuto(scan);
  //     else setScanAuto(true);
  // };

  useEffect(() => { isLoggedIn(); }, []);
  // useEffect(() => { setConst(); }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        splashLoading,
        userInfo,
        baseUrl,
        scanAuto,
        setBaseUrl,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
