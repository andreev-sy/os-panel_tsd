import React, { useContext } from 'react';
import axios from 'axios';
import { Vibration } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { colors, constant, sounds } from '../view/themes/variables';
import Snackbar from 'react-native-snackbar';

function createInstance() {
    const { userInfo, baseUrl, logout } = useContext(AuthContext);

    const instance = axios.create({
        baseURL: `http://${baseUrl}/api`,
        headers: { Authorization: `Bearer ${userInfo.access_token}` },
        timeout: constant.axiosTimeout,
    });

    instance.interceptors.response.use(
        // (response) => response,
        (response) => {
            // response.data.notification = {
            //     'id': 1,
            //     'text': 'text',
            // }
            if (response.data.notification) {
                let noty = response.data.notification
                delete response.data.notification;
                setTimeout(() => {
                    Vibration.vibrate(constant.vibroTimeShort)
                    sounds.beep_info.play()
                    Snackbar.show({
                        text: noty.text,
                        textColor: colors.PRIMARY,
                        backgroundColor: colors.LIGHT_PRIMARY,
                        duration: Snackbar.LENGTH_INDEFINITE,
                        action: {
                          text: 'СКРЫТЬ',
                          textColor: colors.PRIMARY,
                          onPress: () => {
                            console.log(noty.id)
                          },
                        },
                    });
                }, constant.snackbarDelay+2000)
            }

            return response;
        },
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