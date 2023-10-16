import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors, sizes } from '../../../themes/variables';

const NotificationRow = ({ notification, onPressEvent }) => {
    console.log('render notification' + notification.id);
    return (
        <TouchableOpacity
            style={styles.wrapper}
            activeOpacity={0.8}
            disabled={!notification.viewed}
            accessibilityRole="button"
            onPress={() => onPressEvent(notification)}
        >
            <Text style={styles.notificationDate}>{notification.date}</Text>
            <Text style={styles.notificationText}>{notification.text}</Text>
            { 
                notification.viewed ? 
                <View style={[ styles.notificationViewed, styles.notificationViewedTrue ]} /> 
                : 
                <View style={[ styles.notificationViewed, styles.notificationViewedFalse ]} /> 
            }
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    wrapper: {
        padding: sizes.padding,
        width: '100%',
        backgroundColor: colors.WHITE,
        borderRadius: sizes.radius,
        borderWidth: 1,
        borderColor: colors.GRAY_500,
        marginBottom: 8
    },
    notificationText: {
        fontSize: sizes.body3,
        color: colors.GRAY_700
    },
    notificationDate: {
        fontSize: sizes.body4,
        color: colors.GRAY_600,
        fontWeight: '400',
        marginBottom: 4,
    },
    notificationViewed: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    notificationViewedTrue: { backgroundColor: colors.SUCCESS },
    notificationViewedFalse: { backgroundColor: colors.GRAY_400 },

});


export default memo(NotificationRow)
