import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function createInstance() {
    const { userInfo, baseUrl, logout } = useContext(AuthContext);

    const instance = axios.create({
        baseURL: `http://${baseUrl}/api`,
        headers: { Authorization: `Bearer ${userInfo.access_token}` },
        timeout: 5000,
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response){
                if (error.response.status == '401') logout();
                const { status, data } = error.response;
                return Promise.reject({ status, ...data });
            }

            return error;
        }
    );

    return instance;
}

export default createInstance;