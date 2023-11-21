import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { constant } from '../view/themes/variables';

function createInstance() {
    const { userInfo, baseUrl, logout } = useContext(AuthContext);

    const instance = axios.create({
        baseURL: `http://${baseUrl}/api`,
        headers: { Authorization: `Bearer ${userInfo.access_token}` },
        timeout: constant.axiosTimeout,
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response){
                if (error.response.status == '401'){
                    logout();
                    return false;
                }
                const { status, data } = error.response;
                return Promise.reject({ status, ...data });
            }

            return error;
        }
    );

    return instance;
}

export default createInstance;