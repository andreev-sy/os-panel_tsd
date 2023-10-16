import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

function createInstance(){
    const { userInfo, baseUrl, logout } = useContext(AuthContext);

    const instance = axios.create({
        baseURL: `http://${baseUrl}/api`,
        headers: { Authorization: `Bearer ${userInfo.access_token}` },
        timeout: 5000,
    });
    
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status == '401') {
                logout();
            }
            return error;
        }
    );

    return instance;
}

export default createInstance;