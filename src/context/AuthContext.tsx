import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import { colors, constant } from '../view/themes/variables';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({})
  const [baseUrl, setBaseUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [splashLoading, setSplashLoading] = useState(false)

  const login = (username, password, baseUrl) => {
    setIsLoading(true)

    axios
      .post(`http://${baseUrl}/api/auth/login/`, { username, password }, { timeout: constant.axiosTimeout })
      .then(res => {
        let userInfo = res.data
        setUserInfo(userInfo)
        setBaseUrl(baseUrl)
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        AsyncStorage.setItem('baseUrl', baseUrl)

        setIsLoading(false)
      })
      .catch(e => {
        setIsLoading(false)
        setTimeout(() => {
          Snackbar.show({ text: 'Неверные данные, или нет подключения к сети', textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT });
        }, constant.snackbarDelay)
      });
  };


  const logout = () => {
    setIsLoading(true)

    AsyncStorage.removeItem('userInfo')
    AsyncStorage.removeItem('baseUrl')
    setUserInfo({})
    setBaseUrl('')

    setIsLoading(false);
    setTimeout(() => {
      Snackbar.show({ text: 'Необходимо авторизоваться', textColor: colors.PRIMARY, backgroundColor: colors.LIGHT_PRIMARY, duration: Snackbar.LENGTH_SHORT })
    }, constant.snackbarDelay)
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let baseUrl = await AsyncStorage.getItem('baseUrl')
      let userInfo = await AsyncStorage.getItem('userInfo')
      setBaseUrl(baseUrl)
      userInfo = JSON.parse(userInfo)

      if (userInfo) {
        axios.get(`http://${baseUrl}/api/auth/check/`, { timeout: constant.axiosTimeout, headers: { Authorization: `Bearer ${userInfo.access_token}` } })
          .then(res => {
            let userInfo = res.data
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setUserInfo(userInfo)
            setSplashLoading(false)
          })
          .catch(e => {
            setSplashLoading(false)
            logout()
          });
      } else {
        setSplashLoading(false)
        logout()
      }

    } catch (e) {
      setSplashLoading(false)
      logout()
    }
  };

  useEffect(() => { 
    isLoggedIn()
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        splashLoading,
        userInfo,
        baseUrl,
        setBaseUrl,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
