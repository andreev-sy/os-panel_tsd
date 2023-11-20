import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Snackbar from 'react-native-snackbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import createInstance from '../../../../helpers/AxiosInstance';
import { colors, constant } from '../../../themes/variables';
import { useFocusEffect } from '@react-navigation/native';
import BadgeText from '../../../components/BadgeText';

function HeaderHome({ navigation }) {
    const [notification, setNotification] = useState(0);

    const api = createInstance();

    const notificationCount = () => {
        console.log('notificationCount')
        api.get(`/notification/count/`)
            .then(res => { 
                setNotification(parseInt(res.data)) 
            })
            .catch(e => { 
                setTimeout( () => {
                    Snackbar.show({ text: e.message, textColor: colors.DANGER, backgroundColor: colors.LIGHT_DANGER, duration: Snackbar.LENGTH_SHORT });
                }, constant.snackbarDelay )
            });
    }

    useFocusEffect( useCallback(() => { notificationCount() }, []) );

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                activeOpacity={constant.activeOpacity}
                accessibilityRole="button"
                onPress={() => navigation.navigate('NotificationStackRoute') }
            >
                <MaterialCommunityIcons name="bell" color={colors.BLACK} size={25} />
                { notification > 0 ? <BadgeText text={notification} color={ colors.SUCCESS } /> : '' }
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


