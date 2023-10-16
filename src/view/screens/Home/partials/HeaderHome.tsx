import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../../themes/variables';
import Badge from '../../../components/Badge';
import createInstance from '../../../helpers/AxiosInstance';
import Snackbar from 'react-native-snackbar';

function HeaderHome({ navigation }) {
    const [notificationCount, setNotificationCount] = useState(0);

    const api = createInstance();

    useEffect(() => {
        api.get('/notification/count/')
            .then(res => { setNotificationCount(parseInt(res.data)) })
            .catch(e => { 
                Snackbar.show({
                    text: e.response.data.msg,
                    textColor: colors.LIGHT_DANGER,
                    backgroundColor: colors.DANGER,
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                      text: 'СКРЫТЬ',
                      textColor: colors.LIGHT_DANGER,
                      onPress: () => { /* Do something. */ },
                    },
                  });
            });
    }, []);


    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, paddingRight: 10 }}>
            <TouchableOpacity
                activeOpacity={0.8}
                accessibilityRole="button"
                onPress={() => navigation.navigate('NotificationStackRoute') }
            >
                <MaterialCommunityIcons name="bell" color={colors.BLACK} size={25} />
                { notificationCount > 0 ? <Badge color={ colors.SUCCESS } /> : '' }
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.8}
                accessibilityRole="button"
                onPress={() => navigation.navigate('ProfileStackRoute') }
            >
                <MaterialCommunityIcons name="account" color={colors.BLACK} size={25} />
            </TouchableOpacity>
        </View>
    );
}

export default HeaderHome;


