import React, { useState, useEffect } from 'react';
import createInstance from '../../helpers/AxiosInstance';
import { View, Text, Vibration } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { colors, constant, sounds } from '../themes/variables';


function Notification() {
    // const [noty, setNoty] = useState('');
    const api = createInstance();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get(`/notification/message/`)
            if(response.data?.text?.length > 0){
                console.log(response.data)
                const noty = response.data
                setTimeout( () => {
                    Vibration.vibrate(constant.vibroTimeShort)
                    sounds.beep_info.play()
                    Snackbar.show({
                        text: noty.text,
                        textColor: colors.PRIMARY,
                        backgroundColor: colors.LIGHT_PRIMARY,
                        duration: constant.notyTime,
                        action: {
                            text: 'СКРЫТЬ',
                            textColor: colors.PRIMARY,
                            onPress: () => api.get(`/notification/update/?id=${noty.id}`)
                        },
                    })
                    api.get(`/notification/send/?id=${noty.id}`)
                }, constant.notyDelay)
            }

          } catch (error) {
            console.log('Error occurred', error);
          }
        };
    
        // Установите интервал опроса (например, каждые 15 секунд)
        const interval = setInterval(fetchData, 5000);
    
        // Остановка интервала при размонтировании компонента
        return () => clearInterval(interval);
    }, []); // Пустой массив зависимостей гарантирует, что эффект будет выполнен только при монтировании и размонтировании компонента

    return (
        <View style={{ width: 0, height: 0}}></View>
    );
}

export default Notification;


