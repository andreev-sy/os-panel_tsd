import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Snackbar from 'react-native-snackbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Badge from '../../../components/Badge';
import createInstance from '../../../helpers/AxiosInstance';
import { colors, constant } from '../../../themes/variables';

function HeaderHome({ navigation }) {
    const [notificationCount, setNotificationCount] = useState(0);

    const api = createInstance();

    useEffect(() => {
        api.get('/notification/count/')
            .then(res => { 
                setNotificationCount(parseInt(res.data)) 
            })
            .catch(e => { 
                setTimeout( () => {
                    Snackbar.show({ text: e.response.data.msg, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT });
                }, constant.snackbarDelay )
            });
    }, []);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                activeOpacity={constant.activeOpacity}
                accessibilityRole="button"
                onPress={() => navigation.navigate('NotificationStackRoute') }
            >
                <MaterialCommunityIcons name="bell" color={colors.BLACK} size={25} />
                { notificationCount > 0 ? <Badge color={ colors.SUCCESS } /> : '' }
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={constant.activeOpacity}
                accessibilityRole="button"
                onPress={() => navigation.navigate('ProfileStackRoute') }
            >
                <MaterialCommunityIcons name="account" color={colors.BLACK} size={25} />
            </TouchableOpacity>
        </View>
    );
}

export const styles = StyleSheet.create({
    wrapper: { display: 'flex', flexDirection: 'row', gap: 10, paddingRight: 10 },
});


export default HeaderHome;


