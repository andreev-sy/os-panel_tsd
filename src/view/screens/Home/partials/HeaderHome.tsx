import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Snackbar from 'react-native-snackbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Badge from '../../../components/Badge';
import createInstance from '../../../../helpers/AxiosInstance';
import { colors, constant } from '../../../themes/variables';
import { useFocusEffect } from '@react-navigation/native';

function HeaderHome({ navigation }) {
    const [notification, setNotification] = useState(1);

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

    // useFocusEffect( useCallback(() => { notificationCount() }, []) );
    // useEffect(() => { notificationCount() });


    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                activeOpacity={constant.activeOpacity}
                accessibilityRole="button"
                onPress={() => navigation.navigate('NotificationStackRoute') }
            >
                <MaterialCommunityIcons name="bell" color={colors.BLACK} size={25} />
                { notification > 0 ? <Badge color={ colors.SUCCESS } /> : '' }
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


